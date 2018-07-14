const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const GLOBAL_EXECUTION_TIME = 9.064855180369991e8

const entityData = require('../data/entities.json')
const originData = require('../data/2018-07-01-origin-scripting.json')
  .map(entry => {
    return {..._.mapValues(entry, x => Number(x)), origin: entry.origin}
  })
  .filter(entry => entry.origin)

const THIRD_PARTY_EXECUTION_TIME = _.sumBy(originData, 'totalExecutionTime')

function getRootDomain(origin) {
  return origin
    .split('.')
    .slice(-2)
    .join('.')
}

function combineGroup(entries) {
  const domain = getRootDomain(entries[0].origin)
  const origins = _.map(entries, 'origin')
  const totalExecutionTime = _.sumBy(entries, 'totalExecutionTime')
  const totalOccurrences = _.sumBy(entries, 'totalOccurrences')
  const averageExecutionTime = totalExecutionTime / totalOccurrences
  const shareOfExecutionTime = totalExecutionTime / GLOBAL_EXECUTION_TIME
  return {
    domain,
    origins,
    totalExecutionTime,
    totalOccurrences,
    averageExecutionTime,
    shareOfExecutionTime,
    entries,
  }
}

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
    console.log('deleting', key)
    entityByRootDomain.delete(key)
  }
}

const homelessEntries = []
for (const entry of originData) {
  const entity =
    entityByOrigin.get(entry.origin) || entityByRootDomain.get(getRootDomain(entry.origin))
  if (entity) {
    entity.entries.push(entry)
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
  .groupBy(entry => getRootDomain(entry.origin))
  .values()
  .map(combineGroup)
  .sortBy('totalExecutionTime')
  .reverse()
  .slice(0, 10)
  .value()

const sortedEntityData = _(entityData)
  .sortBy('averageExecutionTime')
  .sortBy('totalExecutionTime')
  .reverse()
  .value()
console.log(sortedEntityData)

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
