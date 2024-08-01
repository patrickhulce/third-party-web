const fs = require('fs')
const prompts = require('prompts')
const childProcess = require('child_process')
const {getEntity} = require('../lib/')

const {BigQuery} = require('@google-cloud/bigquery')

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

function runQueryStream(query, onData, onEnd) {
  return new Promise((resolve, reject) => {
    new BigQuery()
      .createQueryStream({
        query,
        location: 'US',
      })
      .on('data', onData)
      .on('end', onEnd)
      .on('finish', resolve)
      .on('error', (...params) => {
        console.error('error in query stream', ...params)
        reject(...params)
      })
  })
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

      const fileWriterStream = fs.createWriteStream(observedDomainsFilename)
      const tableWriterStream = new BigQuery()
        .dataset('third_party_web')
        .table(dateStringUnderscore)
      const start = Date.now()
      let nbRows = 0
      const schema = {
        schema: [
          {name: 'domain', type: 'STRING'},
          {name: 'canonicalDomain', type: 'STRING'},
          {name: 'category', type: 'STRING'},
        ],
        location: 'US',
      }

      await runQueryStream(
        allObservedDomainsQuery,
        row => {
          const prefix = !nbRows++ ? '[' : ','
          fileWriterStream.write(prefix + JSON.stringify(row))
          const entity = getEntity(row.domain)
          tableWriterStream.insert(
            {
              domain: row.domain,
              canonicalDomain: entity && entity.domains[0],
              category: (entity && entity.categories[0]) || 'unknown',
            },
            schema
          )
        },
        () => {
          fileWriterStream.write(']')
        }
      )
        .then(() => {
          console.log(`Finish query in ${(Date.now() - start) / 1000}s. Wrote ${nbRows} rows.`)
        })
        .catch(() => {
          process.exit(1)
        })
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

      const fileWriterStream = fs.createWriteStream(entityScriptingFilename)
      const start = Date.now()
      const nbRows = 0

      await runQueryStream(
        entityPerPageQuery,
        row => {
          const prefix = !nbRows++ ? '[' : ','
          fileWriterStream.write(prefix + JSON.stringify(row))
        },
        () => {
          fileWriterStream.write(']')
        }
      )
        .then(() => {
          console.log(`Finish query in ${(Date.now() - start) / 1000}s. Wrote ${nbRows} rows.`)
        })
        .catch(() => {
          process.exit(1)
        })
    },
    deleteFn: () => {},
    exitFn: () => {},
  })

  childProcess.spawnSync('yarn', ['build'], {stdio: 'inherit'})
  childProcess.spawnSync('yarn', ['start'], {stdio: 'inherit'})
  childProcess.spawnSync('yarn', ['test:unit', '-u'], {stdio: 'inherit'})
}

main()
