const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')
const {
  importMergedData,
  getEntityDatasetsMostRecentFirst,
} = require('./shared/merge-entity-origin-data')

const DIST_DIR = path.join(__dirname, '../dist')
const DATA_DIR = path.join(__dirname, '../data')

if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR)

function cleanStatsFromEntity(entity) {
  return _.omit(entity, ['totalExecutionTime', 'totalOccurrences'])
}

const sourceEntities = JSON5.parse(fs.readFileSync(`${DATA_DIR}/entities.json5`, 'utf8'))
fs.writeFileSync(`${DIST_DIR}/entities.json`, JSON.stringify(sourceEntities))

const httpArchiveData = importMergedData(getEntityDatasetsMostRecentFirst()[0])
const {getEntity} = require('../lib/index.js') // IMPORTANT: require this after entities have been written
const entityExecutionStats = _(httpArchiveData)
  .groupBy(({domain}) => {
    const entity = getEntity(domain)
    return entity && entity.name
  })
  .mapValues(dataset => {
    return {
      totalExecutionTime: Math.round(_.sum(dataset.map(x => Number(x.totalExecutionTime)))),
      totalOccurrences: Math.round(_.sum(dataset.map(x => Number(x.totalOccurrences)))),
    }
  })
  .value()

const entitiesInHTTPArchive = _(httpArchiveData)
  // Find all the unique entities for our domains found in HTTPArchive
  .map(({domain}) => getEntity(domain))
  .filter(Boolean)
  .uniqBy(e => e.name)
  // Use the original entity which has the minimal form
  .map(e => sourceEntities.find(candidate => candidate.name === e.name))
  .value()

for (const entity of entitiesInHTTPArchive) {
  Object.assign(entity, entityExecutionStats[entity.name])
}

fs.writeFileSync(`${DIST_DIR}/entities.json`, JSON.stringify(sourceEntities))
fs.writeFileSync(`${DIST_DIR}/entities-httparchive.json`, JSON.stringify(entitiesInHTTPArchive))
fs.writeFileSync(
  `${DIST_DIR}/entities-httparchive-nostats.json`,
  JSON.stringify(entitiesInHTTPArchive.map(e => cleanStatsFromEntity(e)))
)
