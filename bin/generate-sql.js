const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const SQL_DIR = path.join(__dirname, '../sql')

const FROM_PARTIAL = fs.readFileSync(`${SQL_DIR}/bootup-time-scripting.partial.sql`, 'utf8')

function createFromStatement(where = '') {
  const template = _.template(FROM_PARTIAL)
  const substatements = []
  for (let i = 0; i < 35; i++) {
    const stmt = `(${template({i, where})})`
    substatements.push(stmt)
  }
  return `(${substatements.join(' UNION ALL\n')})`
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

for (const file of fs.readdirSync(SQL_DIR)) {
  if (!/^(library-query|url-query).sql$/.test(file)) continue
  const fullPath = path.join(SQL_DIR, file)
  const outPath = fullPath.replace('.sql', '.generated.sql')
  const template = fs.readFileSync(fullPath, 'utf8')
  const where = file.includes('-cdn') ? whereIsCDN : ''
  fs.writeFileSync(outPath, fillInTemplate(template, where))
}
