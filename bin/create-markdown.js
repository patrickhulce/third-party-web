const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const Chart = require('chartjs-node')
const exec = require('child_process').execFileSync

const LIB_FOLDER = path.join(__dirname, '../lib')
const MD_TEMPLATE = fs.readFileSync(path.join(LIB_FOLDER, 'template.md'), 'utf8')
const createMarkdownString = _.template(MD_TEMPLATE)

const ALL_DATA = require('../.tmp/combined-data.json')
const ALL_CATEGORIES = require('../data/categories.json')
const DATA_BY_CATEGORY = _.groupBy(ALL_DATA, entity => entity.categories[0])
_.forEach(ALL_CATEGORIES, (value, id) =>
  _.assign(value, {id, totalExecutionTime: _.sumBy(DATA_BY_CATEGORY[id], 'totalExecutionTime')}),
)

function createUpdatesContent() {
  let updates = []
  for (const file of fs.readdirSync(LIB_FOLDER)) {
    const dateRegex = /^(\d{4}-\d{2}-\d{2})/
    if (!dateRegex.test(file)) continue
    const datePart = file.match(dateRegex)[1]
    updates.push(
      `## ${datePart} dataset\n\n` + fs.readFileSync(path.join(LIB_FOLDER, file), 'utf8'),
    )
  }

  return updates.join('\n\n')
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

  const chartByCategory = new Chart(600, 300)
  await chartByCategory.drawChart({
    options: {
      legend: {position: 'left'},
    },
    type: 'doughnut',
    data: {
      labels: _.map(categories, 'title'),
      datasets: [
        {
          label: 'Breakdown By Category',
          backgroundColor: _.map(categories, 'color'),
          data: _.map(categories, 'totalExecutionTime'),
        },
      ],
    },
  })

  const buffer = await chartByCategory.getImageBuffer('image/png')
  fs.writeFileSync(path.join(__dirname, '../by-category.png'), buffer)
}

function createCategorySection(category) {
  const categoryRows = _.sortBy(DATA_BY_CATEGORY[category.id], 'averageExecutionTime').map(
    (entry, rank) => [
      rank + 1,
      `[${entry.name}](${entry.homepage})`,
      entry.totalOccurrences.toLocaleString(),
      Math.round(entry.averageExecutionTime) + ' ms',
    ],
  )

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
    category => `1.  [${category.title}](#${category.id})`,
  ).join('\n         ')

  const categoryContents = _.map(ALL_CATEGORIES, createCategorySection).join('\n\n')

  const allDataRows = _.sortBy(ALL_DATA, 'totalExecutionTime')
    .reverse()
    .map(entry => [
      `[${entry.name}](${entry.homepage})`,
      entry.totalOccurrences.toLocaleString(),
      Math.round(entry.totalExecutionTime / 1000).toLocaleString() + ' s',
      Math.round(entry.averageExecutionTime) + ' ms',
    ])

  await createChartImages()

  const readmePath = path.join(__dirname, '../README.md')
  fs.writeFileSync(
    readmePath,
    createMarkdownString({
      updates_contents: createUpdatesContent(),
      category_table_of_contents: categoryTOC,
      category_contents: categoryContents,
      all_data: createMarkdownTable(
        ['Name', 'Popularity', 'Total Impact', 'Average Impact'],
        allDataRows,
      ),
    }),
  )

  exec(path.join(__dirname, '../node_modules/.bin/prettier'), ['--write', readmePath])
}

run().catch(console.error)
