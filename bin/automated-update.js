const fs = require('fs')
const prompts = require('prompts')
const childProcess = require('child_process')
const {getEntity} = require('../lib/')

const {BigQuery} = require('@google-cloud/bigquery')

const HA_REQUESTS_TABLE_REGEX = /`httparchive\.requests\.\w+`/g
const HA_LH_TABLE_REGEX = /`httparchive\.lighthouse\.\w+`/g
const LH_3P_TABLE_REGEX = /`lighthouse-infrastructure\.third_party_web\.\w+`/g
const DATE_UNDERSCORE_REGEX = /\d{4}_\d{2}_\d{2}/g

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

async function main() {
  const msInDay = 24 * 60 * 60 * 1000
  const daysIntoCurrentMonth = new Date().getDate()
  const timeSinceLastMonthInMs = daysIntoCurrentMonth * msInDay
  const lastMonthDate = new Date(Date.now() - (timeSinceLastMonthInMs + msInDay))
  const lastMonthPadded = (lastMonthDate.getMonth() + 1).toString().padStart(2, '0')

  const dateStringUnderscore = `${lastMonthDate.getFullYear()}_${lastMonthPadded}_01`
  const dateStringHypens = dateStringUnderscore.replace(/_/g, '-')
  console.log('Determined', dateStringUnderscore, 'data is needed')

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
      const bqClient = new BigQuery()

      const queryOptions = {
        query: allObservedDomainsQuery,
        location: 'US',
      }

      const [job] = await bqClient.createQueryJob(queryOptions)
      console.log(`Job ${job.id} started.`)

      // Wait for the query to finish
      const [rows] = await job.getQueryResults()

      console.log('Wrote', rows.length, 'rows to', observedDomainsFilename)
      fs.writeFileSync(observedDomainsFilename, JSON.stringify(rows))

      const rowsForNewTable = rows.map(row => {
        const entity = getEntity(row.domain)

        return {
          domain: row.domain,
          canonicalDomain: entity && entity.domains[0],
          category: (entity && entity.categories[0]) || 'unknown',
        }
      })

      const schema = [
        {name: 'domain', type: 'STRING'},
        {name: 'canonicalDomain', type: 'STRING'},
        {name: 'category', type: 'STRING'},
      ]

      console.log('Creating', dateStringUnderscore, 'table. This may take a while...')
      await bqClient
        .dataset('third_party_web')
        .table(dateStringUnderscore)
        .insert(rowsForNewTable, {schema, location: 'US'})
      console.log('Inserted', rowsForNewTable.length, 'rows')
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
      const bqClient = new BigQuery()

      const queryOptions = {
        query: entityPerPageQuery,
        location: 'US',
      }

      console.log('Querying execution per entity...')
      const [job] = await bqClient.createQueryJob(queryOptions)
      console.log(`Job ${job.id} started.`)

      // Wait for the query to finish
      const [rows] = await job.getQueryResults()

      console.log('Wrote', rows.length, 'rows to', entityScriptingFilename)
      fs.writeFileSync(entityScriptingFilename, JSON.stringify(rows, null, 2))
    },
    deleteFn: () => {},
    exitFn: () => {},
  })

  childProcess.spawnSync('yarn', ['build'], {stdio: 'inherit'})
  childProcess.spawnSync('yarn', ['start'], {stdio: 'inherit'})
}

main()
