const fs = require('fs')
const prompts = require('prompts')
const childProcess = require('child_process')
const util = require('util')
const {Transform, finished} = require('stream')
const {BigQuery} = require('@google-cloud/bigquery')
const {pipeline} = require('node:stream/promises')

const {getEntity, entities} = require('../lib/')

const bigQuery = new BigQuery()

const HA_REQUESTS_TABLE_REGEX = /`httparchive\.requests\.\w+`/g
const HA_LH_TABLE_REGEX = /`httparchive\.lighthouse\.\w+`/g
const LH_3P_TABLE_REGEX = /`lighthouse-infrastructure\.third_party_web\.\w+`/g
const DATE_UNDERSCORE_REGEX = /\d{4}_\d{2}_\d{2}/g
const LH_PROJECT_REGEX = /lighthouse-infrastructure/g

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
      [process.env.OVERRIDE_LH_PROJECT, LH_PROJECT_REGEX],
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

const getQueryResultStream = async (query, params) => {
  const [job] = await bigQuery.createQueryJob({
    query,
    location: 'US',
    useQueryCache: false,
    params,
  })

  return job.getQueryResultsStream()
}
const resolveOnFinished = streams => {
  const toFinishedPromise = util.promisify(finished)
  return Promise.all(streams.map(s => toFinishedPromise(s)))
}
const getJSONStringTransformer = (toJSONArrayString = false) => {
  let rowCounter = 0
  return new Transform({
    objectMode: true,
    transform(row, _, callback) {
      const prefix = toJSONArrayString ? (!rowCounter++ ? '[\n' : ',\n') : ''
      const suffix = toJSONArrayString ? '' : '\n'
      callback(null, prefix + JSON.stringify(row) + suffix)
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

const getThirdPartyWebTable = async tableName => {
  const thirdPartyWebDataset = bigQuery.dataset('third_party_web', {
    projectId: process.env.OVERRIDE_LH_PROJECT,
  })
  const thirdPartyWebTable = thirdPartyWebDataset.table(tableName)
  const [thirdPartyWebTableExits] = await thirdPartyWebTable.exists()
  if (thirdPartyWebTableExits) return thirdPartyWebTable
  const [table] = await thirdPartyWebDataset.createTable(tableName, {
    schema: [
      {name: 'domain', type: 'STRING'},
      {name: 'canonicalDomain', type: 'STRING'},
      {name: 'category', type: 'STRING'},
    ],
  })
  return table
}

async function main() {
  const {dateStringUnderscore, dateStringHypens} = await getTargetDatasetDate()

  const observedDomainsFilename = `${__dirname}/../data/${dateStringHypens}-observed-domains.json`
  const entityScriptingFilename = `${__dirname}/../data/${dateStringHypens}-entity-scripting.json`
  const mostObservedDomainsFilename = `${__dirname}/../sql/most-observed-domains-query.sql`
  const allObservedDomainsFilename = `${__dirname}/../sql/all-observed-domains-query.sql`
  const entityPerPageFilename = `${__dirname}/../sql/entity-per-page.sql`

  // Check if we should overwrite anything.
  await withExistenceCheck(`Data for ${dateStringUnderscore}`, {
    checkExistenceFn: () => fs.existsSync(entityScriptingFilename),
    actionFn: () => {},
    deleteFn: () => {},
    exitFn: () => process.exit(1),
  })

  const mostObservedDomainsQuery = getQueryForTable(
    mostObservedDomainsFilename,
    dateStringUnderscore
  )
  const allObservedDomainsQuery = getQueryForTable(allObservedDomainsFilename, dateStringUnderscore)
  const entityPerPageQuery = getQueryForTable(entityPerPageFilename, dateStringUnderscore)

  // 1. Get and write in 'observed-domains' json file domains observed more than 50 times
  await withExistenceCheck(observedDomainsFilename, {
    checkExistenceFn: () => fs.existsSync(observedDomainsFilename),
    actionFn: async () => {
      console.log(`1️⃣ Start "most observed domains" query`)

      const start = Date.now()

      const observedDomainsFileWriterStream = fs.createWriteStream(observedDomainsFilename)
      const queryResultStream = await getQueryResultStream(mostObservedDomainsQuery)

      await pipeline(
        queryResultStream,
        // stringify observed domain json (with json array prefix based on row index)
        getJSONStringTransformer(true),
        // write to observed-domains json file
        observedDomainsFileWriterStream
      )

      // Close observed domains json array in file
      fs.appendFileSync(observedDomainsFilename, '\n]')

      console.log(`✅ Finish "most observed domains" query in ${(Date.now() - start) / 1000}s.`)
    },
    deleteFn: () => fs.rmSync(observedDomainsFilename),
    exitFn: () => {},
  })

  //2. Get and write in 'third_party_web' table all observed domains mapped to entity observed at least 50 times
  await withExistenceCheck(`third_party_web/${dateStringUnderscore}`, {
    checkExistenceFn: () =>
      bigQuery
        .dataset('third_party_web')
        .table(dateStringUnderscore)
        .exists()
        .then(([exists]) => exists),
    actionFn: async () => {
      console.log(`2️⃣ Start "all observed domains" query`)

      const start = Date.now()

      const domainEntityMapping = entities.reduce((array, {name, domains}) => {
        return array.concat(domains.map(domain => ({name, domain})))
      }, [])
      const thirdPartyWebTableWriterStream = await getThirdPartyWebTable(dateStringUnderscore).then(
        table =>
          table.createWriteStream({
            sourceFormat: 'NEWLINE_DELIMITED_JSON',
          })
      )

      const queryResultStream = await getQueryResultStream(allObservedDomainsQuery, {
        entities_string: JSON.stringify(domainEntityMapping),
      })

      await pipeline(
        queryResultStream,
        // map observed domain to entity
        EntityCanonicalDomainTransformer,
        // stringify json with new line delimiter
        getJSONStringTransformer(),
        // write to thrid_party_web table
        thirdPartyWebTableWriterStream
      )

      console.log(`✅ Finish query in ${(Date.now() - start) / 1000}s.`)
    },
    deleteFn: () =>
      bigQuery
        .dataset('third_party_web')
        .table(dateStringUnderscore)
        .delete()
        .catch(err => {
          console.error('could not delete third_party_web table', err)
        }),
    exitFn: () => {},
  })

  //3. Run entity scripting query.
  await withExistenceCheck(entityScriptingFilename, {
    checkExistenceFn: () => fs.existsSync(entityScriptingFilename),
    actionFn: async () => {
      console.log(`3️⃣ Start entity scripting query`)

      const start = Date.now()

      const entityScriptingFileWriterStream = fs.createWriteStream(entityScriptingFilename)
      const queryResultsStream = await getQueryResultStream(entityPerPageQuery)

      await pipeline(
        queryResultsStream,
        // stringify entity scripting json (with json array prefix based on row index)
        getJSONStringTransformer(true),
        // write to entity-scripting json file
        entityScriptingFileWriterStream
      )

      console.log(`✅ Finish query in ${(Date.now() - start) / 1000}s.`)

      // Close observed domains json array in file
      fs.appendFileSync(entityScriptingFilename, ']')
    },
    deleteFn: () => fs.rmSync(entityScriptingFilename),
    exitFn: () => {},
  })

  childProcess.spawnSync('yarn', ['build'], {stdio: 'inherit'})
  childProcess.spawnSync('yarn', ['start'], {stdio: 'inherit'})
  childProcess.spawnSync('yarn', ['test:unit', '-u'], {stdio: 'inherit'})
}

main()
