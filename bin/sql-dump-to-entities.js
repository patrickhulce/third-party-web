const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const {getEntity, getRootDomain} = require('../lib/index.js')

// This file converts the SQL data from this script: https://gist.github.com/patrickhulce/46ab17b48799715b303f9144de8444e1
// Into the entities.json format

const RESULTS_FILE_PATH = path.join(__dirname, '../results.csv')
const ENTITIES_FILE_PATH = path.join(__dirname, '../data/entities.json')
const ENTITIES = _.cloneDeep(require(ENTITIES_FILE_PATH))

const SUBCATEGORY_TO_CATEGORY = {
  // "Other" group
  'Internet Hosting': 'hosting',
  'Geo-location': 'utility',
  'Printing Support': 'utility',
  CDN: 'utility',
  'Development Resources': 'utility',
  'Web Design': 'hosting',
  'Event and Presentation Platform': 'hosting',
  Tracking: 'analytics',
  'Application and System Development': 'utility',
  'Game Marketing Platform': 'marketing',
  'Event Logging Platform': 'utility',
  'URL Shortening': 'utility',
  'Customer Identity Management': 'analytics',
  'ECommerce Solution': 'hosting',
  'Push Notifications': 'utility',
  'File Sharing and Synchronisation': 'utility',
  'Image Generation': 'utility',
  'Industry Association': 'utility',
  'Image Acceleration': 'utility',
  'Image Interactivity': 'utility',
  'Communication Services': 'utility',
  'Mobile Optimisation': 'utility',
  'Real-Time App. Development': 'utility',
  'Web Management': 'utility',
  'Translation Services': 'utility',

  // "Dynamic Content" group
  'Marketing Platform': 'marketing',
  'Customer Engagement': 'customer-success',
  'A-B Testing': 'analytics',
  'Web Personalisation': 'analytics',
  'Device Recognition': 'analytics',
  'Live Support': 'customer-success',
  'Usability Research (Customer Experience)': 'analytics',
  'Market Research (Surveys)': 'analytics',
  'Call Tracking': '',
  'Opinions and Reviews': '',
  'Online Community (Forums)': 'social',
  'Community & Discussion': 'social',
  'Helpdesk Services': 'customer-success',
  'Market Research (Benchmarking)': 'analytics',
  'User Interaction': 'customer-success',
  'Mapping Services': 'utility',
  'Site Search': 'utility',
  'Web Search': 'utility',
  'Content Management': 'hosting',
  'Newsfeed Provider': 'social',
  'Search Engine': 'utility',
  'Image Management': 'utility',

  // "Analytics" group
  Analytics: 'analytics',
  'Performance Analytics': 'analytics',
  'Marketing Analytics': 'analytics',
  'Web Analytics': 'analytics',
  Performance: 'analytics',
  Benchmarking: 'analytics',
  'Behavioral Automation Platform (Exit Intent)': 'analytics',
  'Hit Counter': 'analytics',
  'Content Measurement and Distribution': 'analytics',
  'Business Intelligence': 'analytics',
  'Social Media Analytics': 'analytics',
  'Tag Management': 'tag-manager',
  'CDN JSLib': 'library',
  'CDN Fonts': 'library',
  'Hosted Libraries': 'library',
}

const CATEGORY_TO_CATEGORY = {
  Advertising: 'Advertising',
  Analytics: 'analytics',
  'Content Provision': 'content',
  'Dynamic Content': 'other',
  'Financial Services': 'utility',
  'Fraud & Security': 'utility',
  'Hosted Media': 'content',
  'User Interaction': 'analytics',
  'Social Media': 'social',
  Other: 'other',
}

const results = fs
  .readFileSync(RESULTS_FILE_PATH, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(line => line.split('|'))
  .map(parts => ({
    product: parts[0],
    company: parts[1],
    domains: _.uniq(parts[2].split(',').filter(d => d.includes('.') && !d.includes('/'))),
    subcategory: parts[3],
    category: parts[4],
  }))

let matchingResults = []
let newResults = []

const seenDomains = new Map()
for (const result of results) {
  let entity
  let ignoreThisResult = false

  for (const domain of result.domains) {
    if (seenDomains.has(domain)) {
      const oldResult = seenDomains.get(domain)
      matchingResults = matchingResults.filter(r => r !== oldResult)
      newResults = newResults.filter(r => r !== oldResult)
      ignoreThisResult = true
      break
    }

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
    }

    seenDomains.set(domain, result)
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
    entity.domains.push(domain)
    newDomainsForMatchingEntities++
  }
}

const seen = new Set(ENTITIES.map(e => e.name))
for (const result of newResults) {
  const category =
    SUBCATEGORY_TO_CATEGORY[result.subcategory] || CATEGORY_TO_CATEGORY[result.category] || 'other'
  const entity = {
    name: result.product,
    company: result.company,
    categories: [category],
    domains: result.domains,
  }

  if (seen.has(entity.name)) continue
  ENTITIES.push(entity)
  seen.add(entity.name)
}

if (process.env.WRITE_ENTITIES) {
  ENTITIES.forEach(entity => {
    if (entity.company === entity.name) delete entity.company
  })

  fs.writeFileSync(ENTITIES_FILE_PATH, JSON.stringify(ENTITIES, null, 2))
}

console.log(newDomainsForMatchingEntities, 'new domains for matching')
console.log(matchingResults.length, 'matching')
console.log(newResults.length, 'new')
