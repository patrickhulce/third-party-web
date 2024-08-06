const fs = require('fs')
const prompts = require('prompts')
const childProcess = require('child_process')
const util = require('util')
const {Transform, finished} = require('stream')
const {BigQuery} = require('@google-cloud/bigquery')

const {getEntity} = require('../lib/')

const HA_REQUESTS_TABLE_REGEX = /`httparchive\.requests\.\w+`/g
const HA_LH_TABLE_REGEX = /`httparchive\.lighthouse\.\w+`/g
const LH_3P_TABLE_REGEX = /`lighthouse-infrastructure\.third_party_web\.\w+`/g
const DATE_UNDERSCORE_REGEX = /\d{4}_\d{2}_\d{2}/g
const LH_REGEX = /lighthouse-infrastructure/g

const TABLE_REPLACEMENTS = process.env.USE_SAMPLE_DATA
  ? [
      ['`httparchive.sample_data_2020.requests_mobile_10k`', HA_REQUESTS_TABLE_REGEX],
      ['`httparchive.sample_data_2020.lighthouse_mobile_10k`', HA_LH_TABLE_REGEX],
      ['`lighthouse-infrastructure.third_party_web.2021_07_01`', LH_3P_TABLE_REGEX],
    ]
  : [
      [process.env.OVERRIDE_HA_LH_TABLE, HA_LH_TABLE_REGEX],
      [process.env.OVERRIDE_HA_REQUESTS_TABLE, HA_REQUESTS_TABLE_REGEX],
      [process.env.OVERRIDE_LH_3P_TABLE, LH_3P_TABLE_REGEX],
      [process.env.OVERRIDE_LH_PROJECT, LH_REGEX],
    ].filter(([override]) => override)

function getQueryForTable(filename, dateUnderscore) {
  const text = fs.readFileSync(filename, 'utf-8')
  let query = text.replace(DATE_UNDERSCORE_REGEX, dateUnderscore)
  for (const [override, regex] of TABLE_REPLACEMENTS) {
    query = query.replace(regex, override)
  }

  return query
}

async function withExistenceCheck(name, {checkExistenceFn, actionFn, deleteFn, exitFn}) {
  const alreadyExists = await checkExistenceFn()
  if (alreadyExists) {
    const response = await prompts({
      type: 'toggle',
      name: 'value',
      initial: false,
      message: `${name} already exists. Do you want to overwrite?`,
      active: 'yes',
      inactive: 'no',
    })

    if (!response.value) return exitFn()
    await deleteFn()
  }

  await actionFn()
}

async function getTargetDatasetDate() {
  const msInDay = 24 * 60 * 60 * 1000
  const daysIntoCurrentMonth = new Date().getDate()
  const timeSinceLastMonthInMs = daysIntoCurrentMonth * msInDay
  const lastMonthDate = new Date(Date.now() - (timeSinceLastMonthInMs + msInDay))
  const lastMonthPadded = (lastMonthDate.getMonth() + 1).toString().padStart(2, '0')
  const currentMonthDate = new Date(Date.now())
  const currentMonthPadded = (currentMonthDate.getMonth() + 1).toString().padStart(2, '0')

  const predictedDate =
    daysIntoCurrentMonth < 10
      ? `${lastMonthDate.getFullYear()}_${lastMonthPadded}_01`
      : `${currentMonthDate.getFullYear()}_${currentMonthPadded}_01`
  const {value: dateStringUnderscore} = await prompts({
    type: 'text',
    name: 'value',
    initial: predictedDate,
    message: `Which HTTPArchive table do you want to use?`,
  })
  const dateStringHypens = dateStringUnderscore.replace(/_/g, '-')
  console.log('Determined', dateStringUnderscore, 'data is needed')

  return {dateStringUnderscore, dateStringHypens}
}

const getQueryResultStream = async query => {
  const [job] = await new BigQuery().createQueryJob({
    query,
    location: 'US',
    useQueryCache: false,
  })
  return job.getQueryResultsStream()
}
const resolveOnFinished = streams => {
  const toFinishedPromise = util.promisify(finished)
  return Promise.all(streams.map(s => toFinishedPromise(s)))
}
const getJSONStringTransformer = rowCounter => {
  return new Transform({
    objectMode: true,
    transform(row, _, callback) {
      const prefix = rowCounter === undefined ? '' : !rowCounter++ ? '[\n' : ',\n'
      callback(null, prefix + JSON.stringify(row))
    },
  })
}
const EntityCanonicalDomainTransformer = new Transform({
  objectMode: true,
  transform(row, _, callback) {
    const entity = getEntity(row.domain)
    const thirdPartyWebRow = {
      domain: row.domain,
      canonicalDomain: entity && entity.domains[0],
      category: (entity && entity.categories[0]) || 'unknown',
    }
    callback(null, thirdPartyWebRow)
  },
})

async function main() {
  const {dateStringUnderscore, dateStringHypens} = await getTargetDatasetDate()

  const observedDomainsFilename = `${__dirname}/../data/${dateStringHypens}-observed-domains.json`
  const entityScriptingFilename = `${__dirname}/../data/${dateStringHypens}-entity-scripting.json`
  const allObservedDomainsFilename = `${__dirname}/../sql/all-observed-domains-query.sql`
  const entityPerPageFilename = `${__dirname}/../sql/entity-per-page.sql`

  // Check if we should overwrite anything.
  await withExistenceCheck(`Data for ${dateStringUnderscore}`, {
    checkExistenceFn: () => fs.existsSync(entityScriptingFilename),
    actionFn: () => {},
    deleteFn: () => {},
    exitFn: () => process.exit(1),
  })

  const allObservedDomainsQuery = getQueryForTable(allObservedDomainsFilename, dateStringUnderscore)
  const entityPerPageQuery = getQueryForTable(entityPerPageFilename, dateStringUnderscore)

  // Create all domains table.
  await withExistenceCheck(observedDomainsFilename, {
    checkExistenceFn: () => fs.existsSync(observedDomainsFilename),
    actionFn: async () => {
      console.log(`Start observed domains query`)

      const start = Date.now()

      const resultsStream = await getQueryResultStream(allObservedDomainsQuery)

      // Observed domain json file pipe
      let observedDomainsNbRows = 0
      const observedDomainsFileWriterStream = fs.createWriteStream(observedDomainsFilename)
      resultsStream
        // stringify observed domain json (with json array prefix based on row index)
        .pipe(getJSONStringTransformer(observedDomainsNbRows))
        // write to observed-domains json file
        .pipe(observedDomainsFileWriterStream)

      // Observed domain entity mapping table pipe
      const thirdPartyWebTableWriterStream = new BigQuery()
        .dataset('third_party_web')
        .table(dateStringUnderscore)
        .createWriteStream({
          schema: [
            {name: 'domain', type: 'STRING'},
            {name: 'canonicalDomain', type: 'STRING'},
            {name: 'category', type: 'STRING'},
          ],
        })
      resultsStream
        // map observed domain to entity
        .pipe(EntityCanonicalDomainTransformer)
        // stringify json
        .pipe(getJSONStringTransformer())
        // write to thrid_party_web table
        .pipe(thirdPartyWebTableWriterStream)

      // Wait both streams to finish
      await resolveOnFinished([observedDomainsFileWriterStream, thirdPartyWebTableWriterStream])

      // Close observed domains json array in file
      fs.appendFileSync(observedDomainsFilename, '\n]')

      console.log(
        `Finish query in ${(Date.now() - start) / 1000}s. Wrote ${observedDomainsNbRows} rows.`
      )
    },
    deleteFn: async () => {
      const bqClient = new BigQuery()
      await bqClient
        .dataset('third_party_web')
        .table(dateStringUnderscore)
        .delete()
        .catch(() => {})
    },
    exitFn: () => {},
  })

  // Run entity scripting query.
  await withExistenceCheck(entityScriptingFilename, {
    checkExistenceFn: () => fs.existsSync(entityScriptingFilename),
    actionFn: async () => {
      console.log(`Start entity scripting query`)

      const start = Date.now()

      const resultsStream = await getQueryResultStream(entityPerPageQuery)

      // Entity scripting json file pipe
      let entityScriptingNbRows = 0
      const entityScriptingFileWriterStream = fs.createWriteStream(entityScriptingFilename)
      resultsStream
        // stringify entity scripting json (with json array prefix based on row index)
        .pipe(getJSONStringTransformer(entityScriptingNbRows))
        // write to entity-scripting json file
        .pipe(entityScriptingFileWriterStream)

      // Wait stream to finish
      await resolveOnFinished([entityScriptingFileWriterStream])

      console.log(
        `Finish query in ${(Date.now() - start) / 1000}s. Wrote ${entityScriptingNbRows} rows.`
      )

      // Close observed domains json array in file
      fs.appendFileSync(entityScriptingFilename, ']')
    },
    deleteFn: () => {},
    exitFn: () => {},
  })

  childProcess.spawnSync('yarn', ['build'], {stdio: 'inherit'})
  childProcess.spawnSync('yarn', ['start'], {stdio: 'inherit'})
  childProcess.spawnSync('yarn', ['test:unit', '-u'], {stdio: 'inherit'})
}

main()
