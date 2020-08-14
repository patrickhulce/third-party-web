const fs = require('fs')
const path = require('path')
const {stringifyEntities} = require('./shared/utils')

const DIST_DIR = path.join(__dirname, '../dist')
const DATA_DIR = path.join(__dirname, '../data')

const sourceEntities = require(`${DATA_DIR}/entities.js`)
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR)
fs.writeFileSync(`${DIST_DIR}/entities.json`, stringifyEntities(sourceEntities))
