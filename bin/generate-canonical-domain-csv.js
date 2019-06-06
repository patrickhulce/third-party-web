const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const {getEntity} = require('../lib/')
const observedDomainsDataset = require('../data/2019-04-01-origin-scripting.json')

const observedDomains = observedDomainsDataset.map(e => e.origin).filter(Boolean)

const entries = observedDomains
  .map(domain => {
    const entity = getEntity(domain)
    if (!entity) {
      return undefined
    }

    return [domain, entity.domains[0]]
  })
  .filter(Boolean)

fs.writeFileSync(
  path.join(__dirname, '../dist/domain-map.csv'),
  entries.map(l => l.join(',')).join('\n')
)
