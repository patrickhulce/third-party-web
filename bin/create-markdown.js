const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const Chart = require('chartjs-node')

const MD_TEMPLATE = fs.readFileSync(path.join(__dirname, '../lib/template.md'), 'utf8')
const createMarkdownString = _.template(MD_TEMPLATE)

const ALL_DATA = require('../.tmp/combined-data.json')
const ALL_CATEGORIES = require('../data/categories.json')
const DATA_BY_CATEGORY = _.groupBy(ALL_DATA, entity => entity.categories[0])
_.forEach(ALL_CATEGORIES, (value, id) =>
  _.assign(value, {id, totalExecutionTime: _.sumBy(DATA_BY_CATEGORY[id], 'totalExecutionTime')}),
)

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
  const categoryRows = _
    .sortBy(DATA_BY_CATEGORY[category.id], 'averageExecutionTime')
    .map((entry, rank) => [
      rank + 1,
      `[${entry.name}](${entry.homepage})`,
      entry.totalOccurrences.toLocaleString(),
      Math.round(entry.averageExecutionTime) + ' ms',
    ])

  const table = createMarkdownTable(['Rank', 'Name', 'Popularity', 'Average Impact'], categoryRows)
  return [
    `<a name="${category.id}"></a>`,
    `#### ${category.title}\n`,
    `${category.description}\n`,
    table,
  ].join('\n')
}

async function run() {
  const categoryTOC = _
    .map(ALL_CATEGORIES, category => `1.  [${category.title}](#${category.id})`)
    .join('\n         ')

  const categoryContents = _.map(ALL_CATEGORIES, createCategorySection).join('\n\n')

  const allDataRows = _
    .sortBy(ALL_DATA, 'totalOccurrences')
    .reverse()
    .map(entry => [
      `[${entry.name}](${entry.homepage})`,
      entry.totalOccurrences.toLocaleString(),
      Math.round(entry.totalExecutionTime / 1000) + ' s',
    ])

  await createChartImages()

  fs.writeFileSync(
    path.join(__dirname, '../README.md'),
    createMarkdownString({
      category_table_of_contents: categoryTOC,
      category_contents: categoryContents,
      all_data: createMarkdownTable(['Name', 'Popularity', 'Total Impact'], allDataRows),
    }),
  )
}

run().catch(console.error)
