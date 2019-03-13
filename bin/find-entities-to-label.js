const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const DATA_FOLDER = path.join(__dirname, '../data')

const GLOBAL_OCCURRENCES = 367984856
const datasetFiles = fs
  .readdirSync(DATA_FOLDER)
  .filter(f => f.includes('origin-requests'))
  .sort()
  .reverse()

const CURRENT_DATASET = importDataset(datasetFiles[0])
const LAST_DATASET = importDataset(datasetFiles[1] || datasetFiles[0])

const ENTITY_DATA = require('../data/entities.json')
const CURRENT_ORIGIN_DATA = CURRENT_DATASET

const THIRD_PARTY_REQUESTS = _.sumBy(CURRENT_ORIGIN_DATA, 'totalOccurrences')

function importDataset(datasetName) {
  return require(path.join(DATA_FOLDER, datasetName))
    .map(entry => {
      return {..._.mapValues(entry, x => Number(x)), origin: entry.origin}
    })
    .filter(entry => entry.origin)
}

function getRootDomain(origin) {
  return origin
    .split('.')
    .slice(-2)
    .join('.')
}

function combineGroup(entries) {
  const domain = getRootDomain(entries[0].origin)
  const origins = _.map(entries, 'origin')
  const totalOccurrences = _.sumBy(entries, 'totalOccurrences')

  return {
    domain,
    origins,
    totalOccurrences,
    entries,
  }
}

function computeAllStats(dataset) {
  const entityData = _.cloneDeep(ENTITY_DATA)
  const entityByOrigin = new Map()
  const entityByRootDomain = new Map()
  for (const entity of entityData) {
    entity.entries = []
    for (const origin of entity.origins) {
      const rootDomain = getRootDomain(origin)
      entityByOrigin.set(origin, entity)
      if (entityByRootDomain.has(rootDomain) && entityByRootDomain.get(rootDomain) !== entity)
        entityByRootDomain.set(rootDomain, false)
      else entityByRootDomain.set(rootDomain, entity)
    }
  }

  for (const [key, value] of entityByRootDomain) {
    if (!value) {
      entityByRootDomain.delete(key)
    }
  }

  const homelessEntries = []
  for (const entry of dataset) {
    const entity =
      entityByOrigin.get(entry.origin) || entityByRootDomain.get(getRootDomain(entry.origin))
    if (entity) {
      entity.entries.push(entry)
    } else {
      homelessEntries.push(entry)
    }
  }

  let totalEntityOccurrences = 0
  for (const entity of entityData) {
    if (!entity.entries.length) continue
    Object.assign(entity, combineGroup(entity.entries))
    totalEntityOccurrences += entity.totalOccurrences
  }

  const homelessGrouped = _(homelessEntries)
    .groupBy(entry => getRootDomain(entry.origin))
    .values()
    .map(combineGroup)
    .sortBy('totalOccurrences')
    .reverse()
    .value()

  const homelessMegaEntity = {
    ...combineGroup(homelessEntries),
    name: 'All Other 3rd Parties',
    homepage: '#by-category',
    domain: '<all others>',
    categories: ['other'],
  }

  const sortedEntityData = _(entityData.concat(homelessMegaEntity))
    .sortBy('totalOccurrences')
    .filter('totalOccurrences')
    .reverse()
    .value()

  const top100Occurrences = _.sumBy(
    sortedEntityData.filter(e => e !== homelessMegaEntity).slice(0, 100),
    'totalOccurrences',
  )

  return {
    sortedEntityData,
    top100Occurrences,
    homelessGrouped,
    totalEntityOccurrences,
  }
}

function computeChangesSinceLast(currentDataset, lastDataset) {
  return currentDataset.sortedEntityData.map(current => {
    const last = lastDataset.sortedEntityData.find(last => last.name === current.name)
    if (!last || !last.name) return current

    return {
      ..._.mapValues(current, (cValue, key) => {
        if (typeof cValue !== 'number') return cValue
        return cValue - last[key]
      }),
      _current: current,
      _last: last,
    }
  })
}

const currentDatasetStats = computeAllStats(CURRENT_DATASET)
const lastDatasetStats = computeAllStats(LAST_DATASET)

const {
  sortedEntityData,
  top100Occurrences,
  homelessGrouped,
  totalEntityOccurrences,
} = currentDatasetStats

const changesSinceLast = computeChangesSinceLast(currentDatasetStats, lastDatasetStats)

console.log(homelessGrouped.length, 'domains without attribution')
console.log(
  homelessGrouped
    .slice(0, 15)
    .map(item => [item.domain, item.origins.join(','), item.totalOccurrences.toLocaleString()]),
)

console.log('Top 5 Winners')
console.log(
  _(changesSinceLast)
    .sortBy(item => item.totalOccurrences / item._last.totalOccurrences)
    .reverse()
    .slice(0, 5)
    .map(item => [
      item.name,
      item.homepage,
      '+' +
        Math.round((100 * item.totalOccurrences) / item._last.totalOccurrences).toLocaleString() +
        '%',
    ])
    .value(),
)

console.log('Top 5 Losers')
console.log(
  _(changesSinceLast)
    .sortBy(item => item.totalOccurrences / item._last.totalOccurrences)
    .slice(0, 5)
    .map(item => [
      item.name,
      item.homepage,
      Math.round((100 * item.totalOccurrences) / item._last.totalOccurrences).toLocaleString() +
        '%',
    ])
    .value(),
)

console.log(
  'Top 100 Entities representing',
  ((top100Occurrences / GLOBAL_OCCURRENCES) * 100).toFixed(2),
  '% of total requests',
)

console.log(
  'Entities representing',
  ((totalEntityOccurrences / THIRD_PARTY_REQUESTS) * 100).toFixed(2),
  '% of 3rd parties',
)
console.log(
  '3rd parties representing',
  ((THIRD_PARTY_REQUESTS / GLOBAL_OCCURRENCES) * 100).toFixed(2),
  '% of total requests',
)

console.log('Finished processing', datasetFiles[0])
