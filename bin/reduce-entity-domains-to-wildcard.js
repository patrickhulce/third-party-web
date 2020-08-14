const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const {getRootDomain} = require('../lib/')

const entities = require('../data/entities.js')

function sortDomains(domains) {
  // Sort as if it were com.example.sub.domain
  return _.sortBy(domains, domain =>
    domain
      .split('.')
      .reverse()
      .join('.')
  )
}

const rootDomainMap = new Map()
for (const entity of entities) {
  for (const domain of entity.domains) {
    const rootDomain = getRootDomain(domain)
    const entitiesForRootDomain = rootDomainMap.get(rootDomain) || new Set()
    entitiesForRootDomain.add(entity)
    rootDomainMap.set(rootDomain, entitiesForRootDomain)
  }
}

for (const entity of entities) {
  const entityDomains = new Set()
  const allDomains = []
  for (const domain of entity.domains) {
    const rootDomain = getRootDomain(domain)
    const entitiesForRootDomain = rootDomainMap.get(rootDomain)
    if (
      entitiesForRootDomain.size === 1 && // Only add wildcard if this was the only entity with the domain
      entitiesForRootDomain.has(entity) &&
      !/^[0-9.]+$/.test(rootDomain) // Don't add wildcard for IP addresses
    ) {
      entityDomains.add(`*.${rootDomain}`)
      if (domain !== rootDomain) allDomains.push(domain)
    } else {
      entityDomains.add(domain)
    }
  }

  if (allDomains.length) entity.examples = allDomains
  entity.domains = sortDomains(Array.from(entityDomains))
}

fs.writeFileSync(path.join(__dirname, '../data/entities.json'), JSON.stringify(entities, null, 2))
