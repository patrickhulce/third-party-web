const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const {getEntity, getRootDomain} = require('../lib/index.js')

// This file converts the SQL data from this script: https://gist.github.com/patrickhulce/46ab17b48799715b303f9144de8444e1
// Into the entities.json format

const RESULTS_FILE_PATH = path.join(__dirname, '../results.csv')
const ENTITIES = _.cloneDeep(require('../data/entities.json'))

const results = fs
  .readFileSync(RESULTS_FILE_PATH, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(line => line.split('|'))
  .map(parts => ({
    product: parts[0],
    company: parts[1],
    domains: _.uniq(parts[2].split(',').filter(d => d.includes('.'))),
    subcategory: parts[3],
    category: parts[4],
  }))

const matchingResults = []
const newResults = []

for (const result of results) {
  let entity
  let ignoreThisResult = false

  for (const domain of result.domains) {
    const existingEntity = getEntity(domain)
    // Check if we have a matching entity already
    if (existingEntity) {
      // If we do, check that it's consistent
      if (entity && entity !== existingEntity) {
        // If it's not we decided to split this out into two, ignore the result
        ignoreThisResult = true
        break
      }

      entity = existingEntity
    } else {
      newResults.push(result)
    }
  }

  if (ignoreThisResult) continue

  if (entity) matchingResults.push(result)
  else newResults.push(result)
}

let newDomainsForMatchingEntities = 0
for (const result of matchingResults) {
  const entity = ENTITIES.find(e => e.name === getEntity(result.domains.find(getEntity)).name)

  for (const domain of result.domains) {
    const rootDomain = getRootDomain(domain)
    if (entity.domains.includes(domain)) continue
    if (entity.domains.some(domain => getRootDomain(domain) === rootDomain)) continue
    if (entity.name.toLowerCase() !== result.product.toLowerCase())
      console.log('new domain!', colors.bold(entity.name), 'vs', colors.bold(result.product))
    newDomainsForMatchingEntities++
  }
}

console.log(newDomainsForMatchingEntities, 'new domains for matching')
console.log(matchingResults.length, 'matching')
console.log(newResults.length, 'new')
