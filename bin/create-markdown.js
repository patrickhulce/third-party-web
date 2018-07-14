const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const MD_TEMPLATE = fs.readFileSync(path.join(__dirname, '../lib/template.md'), 'utf8')
const data = require('../.tmp/combined-data.json')

const tableRows = []
for (const entry of data) {
  tableRows.push(
    `| [${entry.name}](${entry.homepage}) | ${Math.round(
      entry.totalExecutionTime / 1000,
    ).toLocaleString()} s | ${Math.round(entry.averageExecutionTime)} ms |`,
  )
}

const createMarkdown = _.template(MD_TEMPLATE)

fs.writeFileSync(
  path.join(__dirname, '../README.md'),
  createMarkdown({
    table_of_contents: 'TBD',
    summary_contents: 'TBD',
    category_contents: 'TBD',
    all_data: `| Name | Total Cost (s) | Average Cost (ms) |\n| -- | -- | -- |\n${tableRows.join(
      '\n',
    )}`,
  }),
)
