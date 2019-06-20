const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const DATA_FOLDER = path.join(__dirname, '../data')

const {getEntity} = require('../lib/')
const datasetNames = fs
  .readdirSync(DATA_FOLDER)
  .filter(f => f.includes('origin-scripting'))
  .sort()
  .reverse()

const observedDomains = new Set()

for (const datasetName of datasetNames) {
  const dataset = require(`../data/${datasetName}`)

  dataset
    .map(e => e.origin)
    .filter(Boolean)
    .forEach(domain => observedDomains.add(domain))
}

const entries = Array.from(observedDomains)
  .map(domain => {
    const entity = getEntity(domain)
    if (!entity) {
      return undefined
    }

    return [domain, entity.domains[0], entity.categories[0] || 'other']
  })
  .filter(Boolean)

fs.writeFileSync(
  path.join(__dirname, '../dist/domain-map.csv'),
  entries.map(l => l.join(',')).join('\n')
)
