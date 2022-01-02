const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const DATA_FOLDER = path.join(__dirname, '../../data')

function importDataset(filename) {
  return require(path.resolve(DATA_FOLDER, filename))
    .map(entry => {
      return _.omit(
        {..._.mapValues(entry, x => Number(x)), domain: entry.origin || entry.canonicalDomain},
        'origin'
      )
    })
    .filter(entry => entry.domain)
}

module.exports = {
  importDataset,
  getEntityDatasetsMostRecentFirst() {
    return fs
      .readdirSync(DATA_FOLDER)
      .filter(f => f.includes('entity-scripting'))
      .sort()
      .reverse()
  },
  importMergedData(entityFilename) {
    const entityData = importDataset(entityFilename)
    return entityData
  },
}
