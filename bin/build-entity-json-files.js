const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')

const DIST_DIR = path.join(__dirname, '../dist')
const DATA_DIR = path.join(__dirname, '../data')

if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR)

const sourceEntities = JSON5.parse(fs.readFileSync(`${DATA_DIR}/entities.json5`, 'utf8'))
fs.writeFileSync(`${DIST_DIR}/entities.json`, JSON.stringify(sourceEntities))

const originsInHTTPArchive = require('../data/2019-03-01-origin-scripting.json')
const {getEntity} = require('../lib/index.js') // IMPORTANT: require this after entities have been written
const entitiesInHTTPArchive = _(originsInHTTPArchive)
  // Find all the unique entities for our origins found in HTTPArchive
  .map(({origin}) => getEntity(origin))
  .filter(Boolean)
  .uniq()
  // Use the original entity which has the minimal form
  .map(e => sourceEntities.find(candidate => candidate.name === e.name))
  .value()

fs.writeFileSync(`${DIST_DIR}/entities-httparchive.json`, JSON.stringify(entitiesInHTTPArchive))
