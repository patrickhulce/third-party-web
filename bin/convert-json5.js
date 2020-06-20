const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')

const DIST_DIR = path.join(__dirname, '../dist')
const DATA_DIR = path.join(__dirname, '../data')

const sourceEntities = JSON5.parse(fs.readFileSync(`${DATA_DIR}/entities.json5`, 'utf8'))
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR)
fs.writeFileSync(`${DIST_DIR}/entities.json`, JSON.stringify(sourceEntities))
