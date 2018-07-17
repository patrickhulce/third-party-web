const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const SQL_DIR = path.join(__dirname, '../sql')

const FROM_PARTIAL = fs.readFileSync(`${SQL_DIR}/bootup-time-scripting.partial.sql`, 'utf8')
const TOTAL_TIME_QUERY = fs.readFileSync(`${SQL_DIR}/total-time-query.sql`)
const ORIGIN_QUERY = fs.readFileSync(`${SQL_DIR}/origin-query.sql`)
const URL_QUERY = fs.readFileSync(`${SQL_DIR}/url-query.sql`)
const LIBRARY_QUERY = fs.readFileSync(`${SQL_DIR}/library-query.sql`)

function createFromStatement(where = '') {
  const template = _.template(FROM_PARTIAL)
  const substatements = []
  for (let i = 0; i < 100; i++) {
    substatements.push(`(${template({i, where})})`)
  }
  return substatements.join(',\n')
}

function fillInTemplate(content, where) {
  const template = _.template(content)
  return template({from_statement: createFromStatement(where), where})
}

const whereIsCDN =
  'WHERE ' +
  [
    'ajax.googleapis.com',
    'code.jquery.com',
    'cdnjs.cloudflare.com',
    'cdn.jsdelivr.net',
    'yandex.st',
    'use.fontawesome.com',
    'code.createjs.com',
  ]
    .map(origin => `url CONTAINS '${origin}'`)
    .join(' OR ')

fs.writeFileSync(`${SQL_DIR}/total-time-query.generated.sql`, fillInTemplate(TOTAL_TIME_QUERY))
fs.writeFileSync(`${SQL_DIR}/origin-query.generated.sql`, fillInTemplate(ORIGIN_QUERY))
fs.writeFileSync(`${SQL_DIR}/url-query.generated.sql`, fillInTemplate(URL_QUERY))
fs.writeFileSync(`${SQL_DIR}/url-query-cdn.generated.sql`, fillInTemplate(URL_QUERY, whereIsCDN))
fs.writeFileSync(`${SQL_DIR}/library-query.generated.sql`, fillInTemplate(LIBRARY_QUERY))
