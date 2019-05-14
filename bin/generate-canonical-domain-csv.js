const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const entities = require('../dist/entities.json')

const entries = _.flatten(
  entities.map(entity => entity.domains.map(domain => [domain, entity.domains[0]]))
)

fs.writeFileSync(
  path.join(__dirname, '../dist/domain-map.csv'),
  entries.map(l => l.join(',')).join('\n')
)
