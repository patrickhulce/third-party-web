const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const DIST_FOLDER = path.join(__dirname, '../../dist')
const DATA_FOLDER = path.join(__dirname, '../../data')

function importDataset(filename) {
  return require(path.resolve(DATA_FOLDER, filename))
    .map(entry => {
      return _.omit({..._.mapValues(entry, x => Number(x)), domain: entry.origin}, 'origin')
    })
    .filter(entry => entry.domain)
}

module.exports = {
  importMergedData(entityFilename) {
    const originFilename = entityFilename.replace('entity-scripting', 'origin-scripting')

    const entityData = importDataset(entityFilename)
    const originData = importDataset(originFilename)

    const domainMapEntries = fs
      .readFileSync(path.join(DIST_FOLDER, 'domain-map.csv'), 'utf8')
      .split('\n')
      .map(line => line.split(','))
      .filter(l => l.length === 2)
    const domainMap = new Map(domainMapEntries)

    for (const originEntry of originData) {
      if (
        !domainMap.has(originEntry.domain) &&
        !entityData.find(entry => entry.domain === originEntry.domain)
      ) {
        entityData.push(originEntry)
      }
    }

    return entityData
  },
}
