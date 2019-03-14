const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const thirdPartyLib = require('../lib')

const DATA_FOLDER = path.join(__dirname, '../data')

const GLOBAL_OCCURRENCES = 367984856

const datasetFiles = fs
  .readdirSync(DATA_FOLDER)
  .filter(f => f.includes('origin-requests'))
  .sort()
  .reverse()

const CURRENT_DATASET = importDataset(datasetFiles[0])
const LAST_DATASET = importDataset(datasetFiles[1] || datasetFiles[0])

const THIRD_PARTY_REQUESTS = _.sumBy(CURRENT_DATASET, 'totalOccurrences')

function importDataset(datasetName) {
  return require(path.join(DATA_FOLDER, datasetName))
    .map(entry => {
      return {..._.mapValues(entry, x => Number(x)), domain: entry.origin}
    })
    .filter(entry => entry.domain)
}

function combineGroup(entries) {
  const domain = thirdPartyLib.getRootDomain(entries[0].domain)
  const domains = _.map(entries, 'domain')
  const totalOccurrences = _.sumBy(entries, 'totalOccurrences')

  return {
    domain,
    domains,
    totalOccurrences,
    entries,
  }
}

function computeAllStats(dataset) {
  const entityData = _.cloneDeep(thirdPartyLib.entities)
  const refs = new Map()
  for (const [entity, orig] of _.zip(entityData, thirdPartyLib.entities)) {
    refs.set(orig, entity)
    entity.entries = []
  }

  const homelessEntries = []
  for (const entry of dataset) {
    const entity = thirdPartyLib.getEntity(entry.domain)
    if (entity) {
      refs.get(entity).entries.push(entry)
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
    .groupBy(entry => thirdPartyLib.getRootDomain(entry.domain))
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

  const top50Occurrences = _.sumBy(
    sortedEntityData.filter(e => e !== homelessMegaEntity).slice(0, 50),
    'totalOccurrences',
  )

  return {
    sortedEntityData,
    top50Occurrences,
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
  top50Occurrences,
  homelessGrouped,
  totalEntityOccurrences,
} = currentDatasetStats

const changesSinceLast = computeChangesSinceLast(currentDatasetStats, lastDatasetStats)

console.log(homelessGrouped.length, 'domains without attribution')
console.log(
  homelessGrouped
    .slice(0, 15)
    .map(item => [item.domain, item.domains.join(','), item.totalOccurrences.toLocaleString()]),
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
  '3rd parties representing',
  ((THIRD_PARTY_REQUESTS / GLOBAL_OCCURRENCES) * 100).toFixed(2),
  '% of total requests',
)
console.log(
  `${sortedEntityData.length} Entities representing`,
  ((totalEntityOccurrences / THIRD_PARTY_REQUESTS) * 100).toFixed(2),
  '% of 3rd party requests',
)
console.log(
  'Top 50 Entities representing',
  ((top50Occurrences / THIRD_PARTY_REQUESTS) * 100).toFixed(2),
  '% of 3rd party requests',
)

console.log('Finished processing', datasetFiles[0])
