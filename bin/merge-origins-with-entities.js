const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const thirdPartyLib = require('../lib')

const DATA_FOLDER = path.join(__dirname, '../data')

// from total-time-query.generated.sql
const GLOBAL_EXECUTION_TIME = 4.518238367405001e9

const datasetFiles = fs
  .readdirSync(DATA_FOLDER)
  .filter(f => f.includes('origin-scripting'))
  .sort()
  .reverse()

const CURRENT_DATASET = importDataset(datasetFiles[0])
const LAST_DATASET = importDataset(datasetFiles[1])

const THIRD_PARTY_EXECUTION_TIME = _.sumBy(CURRENT_DATASET, 'totalExecutionTime')

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
  const totalExecutionTime = _.sumBy(entries, 'totalExecutionTime')
  const totalOccurrences = _.sumBy(entries, 'totalOccurrences')
  const averageExecutionTime = totalExecutionTime / totalOccurrences
  const shareOfExecutionTime = totalExecutionTime / GLOBAL_EXECUTION_TIME
  return {
    domain,
    domains,
    totalExecutionTime,
    totalOccurrences,
    averageExecutionTime,
    shareOfExecutionTime,
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

  let totalEntityExecutionTime = 0
  for (const entity of entityData) {
    if (!entity.entries.length) continue
    Object.assign(entity, combineGroup(entity.entries))
    totalEntityExecutionTime += entity.totalExecutionTime
  }

  const homelessGrouped = _(homelessEntries)
    .groupBy(entry => thirdPartyLib.getRootDomain(entry.domain))
    .values()
    .map(combineGroup)
    .sortBy('totalExecutionTime')
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
    .sortBy('averageExecutionTime')
    .sortBy('totalExecutionTime')
    .filter('totalExecutionTime')
    .reverse()
    .value()

  const top100ExecutionTime = _.sumBy(
    sortedEntityData.filter(e => e !== homelessMegaEntity).slice(0, 100),
    'totalExecutionTime',
  )

  return {sortedEntityData, top100ExecutionTime, homelessGrouped, totalEntityExecutionTime}
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
  top100ExecutionTime,
  homelessGrouped,
  totalEntityExecutionTime,
} = currentDatasetStats

const changesSinceLast = computeChangesSinceLast(currentDatasetStats, lastDatasetStats)

console.log(homelessGrouped.length, 'domains without attribution')
console.log(
  homelessGrouped
    .slice(0, 15)
    .map(item => [
      item.domain,
      item.domains.join(','),
      Math.round(item.totalExecutionTime / 1000).toLocaleString(),
    ]),
)

console.log('Top 5 Improvements')
console.log(
  _(changesSinceLast)
    .sortBy('averageExecutionTime')
    .slice(0, 5)
    .map(item => [item.name, item.homepage, Math.round(item.averageExecutionTime).toLocaleString()])
    .value(),
)

console.log('Top 5 Disappearing')
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

console.log('Top 5 Increasing')
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

console.log(
  'Top 100 Entities representing',
  ((top100ExecutionTime / GLOBAL_EXECUTION_TIME) * 100).toFixed(2),
  '% of total script execution',
)

console.log(
  'Entities representing',
  ((totalEntityExecutionTime / THIRD_PARTY_EXECUTION_TIME) * 100).toFixed(2),
  '% of 3rd parties',
)
console.log(
  '3rd parties representing',
  ((THIRD_PARTY_EXECUTION_TIME / GLOBAL_EXECUTION_TIME) * 100).toFixed(2),
  '% of total script execution',
)

fs.writeFileSync(
  path.join(__dirname, '../.tmp/combined-data.json'),
  JSON.stringify(sortedEntityData, null, 2),
)

console.log('Finished processing', datasetFiles[0])
