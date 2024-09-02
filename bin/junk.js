const {BigQuery} = require('@google-cloud/bigquery')
const util = require('util')
const {finished, Transform} = require('stream')

const bq = new BigQuery()

const query = `
SELECT domain, canonicalDomain, category
FROM lighthouse-infrastructure.third_party_web.2023_04_01
LIMIT 10
`

const options = {
  location: 'US',
  schema: [
    {name: 'domain', type: 'STRING'},
    {name: 'canonicalDomain', type: 'STRING'},
    {name: 'category', type: 'STRING'},
  ],
}

;(async () => {
  const dataset = await bq.dataset('third_party_web', {projectId: 'third-party-web'})
  const [datasetExists] = await dataset.exists()
  let table = dataset.table('1234')
  const [tableExists] = await table.exists()

  console.log('dataset third_party_web', {datasetExists, tableExists})

  if (!tableExists) {
    console.log('create table')
    const response = await dataset.createTable('1234', options)
    table = response[0]
    console.log('table created')
  }

  const writeStream = table.createWriteStream({sourceFormat: 'NEWLINE_DELIMITED_JSON'})

  const [job] = await bq.createQueryJob({
    query,
    location: options.location,
    // useQueryCache: false,
  })

  job
    .getQueryResultsStream()
    .pipe(
      new Transform({
        objectMode: true,
        transform(row, _, callback) {
          const csv = JSON.stringify(row) + '\n'
          console.log('data', csv)
          // callback(null, Object.values(row).join(';'))
          callback(null, csv)
        },
      })
    )
    // .pipe(process.stdout)
    .pipe(writeStream)

  await util.promisify(finished)(writeStream)
})()
