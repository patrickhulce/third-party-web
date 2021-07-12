const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const {ChartJSNodeCanvas} = require('chartjs-node-canvas')
const exec = require('child_process').execFileSync

const LIB_FOLDER = path.join(__dirname, '../lib')
const UPDATES_FOLDER = path.join(LIB_FOLDER, 'markdown/updates')
const PARTIALS_FOLDER = path.join(LIB_FOLDER, 'markdown/')
const MD_TEMPLATE = fs.readFileSync(path.join(LIB_FOLDER, 'markdown/template.md'), 'utf8')
const createMarkdownString = _.template(MD_TEMPLATE)

const ALL_DATA = require('../.tmp/combined-data.json')
const ALL_CATEGORIES = require('../data/categories.json')
const DATA_BY_CATEGORY = _.groupBy(ALL_DATA, entity => entity.categories[0])
_.forEach(ALL_CATEGORIES, (value, id) =>
  _.assign(value, {id, totalExecutionTime: _.sumBy(DATA_BY_CATEGORY[id], 'totalExecutionTime')})
)

function createUpdatesContent() {
  let updates = []
  for (const file of fs.readdirSync(UPDATES_FOLDER)) {
    const dateRegex = /^(\d{4}-\d{2}-\d{2})/
    if (!dateRegex.test(file)) continue
    const datePart = file.match(dateRegex)[1]
    updates.push(
      `## ${datePart} dataset\n\n` + fs.readFileSync(path.join(UPDATES_FOLDER, file), 'utf8')
    )
  }

  return updates.join('\n\n')
}

function createPartialsContent() {
  const partials = {}

  for (const file of fs.readdirSync(PARTIALS_FOLDER)) {
    const partialsRegex = /^(.*)\.partial\.md$/
    if (!file.includes('.partial.')) continue
    if (!partialsRegex.test(file)) continue
    const partialName = file.match(partialsRegex)[1]
    partials[partialName] = fs
      .readFileSync(path.join(PARTIALS_FOLDER, file), 'utf8')
      .replace(/---(.|\s)*?---/m, '')
  }

  return partials
}

function createMarkdownTable(headers, rows) {
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '--').join(' | ')} |`,
    ...rows.map(cells => `| ${cells.join(' | ')} |`),
  ].join('\n')
}

async function createChartImages() {
  const categories = _(ALL_CATEGORIES)
    .values()
    .sortBy('totalExecutionTime')
    .reverse()
    .value()

  const chartByCategory = new ChartJSNodeCanvas({width: 600, height: 300})
  const buffer = await chartByCategory.renderToBuffer({
    options: {
      legend: {
        position: 'left',
        labels: {
          fontStyle: 'bold'
        }
      },
    },
    type: 'doughnut',
    data: {
      labels: _.map(categories, 'title'),
      datasets: [
        {
          label: 'Breakdown By Category',
          backgroundColor: _.map(categories, 'color'),
          borderWidth: 1.5,
          data: _.map(categories, 'totalExecutionTime'),
        },
      ],
    },
  }, 'image/png')

  fs.writeFileSync(path.join(__dirname, '../by-category.png'), buffer)
}

function createCategorySection(category) {
  const categoryRows = _.sortBy(DATA_BY_CATEGORY[category.id], 'averageExecutionTime')
    .filter(entry => entry.totalOccurrences >= 1000)
    .map((entry, rank) => [
      rank + 1,
      entry.homepage ? `[${entry.name}](${entry.homepage})` : entry.name,
      entry.totalOccurrences.toLocaleString(),
      Math.round(entry.averageExecutionTime) + ' ms',
    ])

  const table = createMarkdownTable(['Rank', 'Name', 'Usage', 'Average Impact'], categoryRows)
  return [
    `<a name="${category.id}"></a>`,
    `#### ${category.title}\n`,
    `${category.description}\n`,
    table,
  ].join('\n')
}

async function run() {
  const categoryTOC = _.map(
    ALL_CATEGORIES,
    category => `1.  [${category.title}](#${category.id})`
  ).join('\n         ')

  const categoryContents = _.map(ALL_CATEGORIES, createCategorySection).join('\n\n')

  const topDataRows = _.sortBy(ALL_DATA, 'totalExecutionTime')
    .reverse()
    .slice(0, 200)
    .map(entry => [
      entry.homepage ? `[${entry.name}](${entry.homepage})` : entry.name,
      entry.totalOccurrences.toLocaleString(),
      Math.round(entry.totalExecutionTime / 1000).toLocaleString() + ' s',
      Math.round(entry.averageExecutionTime) + ' ms',
    ])

  await createChartImages()

  const readmePath = path.join(__dirname, '../README.md')
  fs.writeFileSync(
    readmePath,
    createMarkdownString({
      partials: createPartialsContent(),
      updates_contents: createUpdatesContent(),
      category_table_of_contents: categoryTOC,
      category_contents: categoryContents,
      all_data: createMarkdownTable(
        ['Name', 'Popularity', 'Total Impact', 'Average Impact'],
        topDataRows
      ),
    })
  )

  exec(path.join(__dirname, '../node_modules/.bin/prettier'), ['--write', readmePath])
}

run().catch(console.error)
