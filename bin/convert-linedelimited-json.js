const fs = require('fs')
const path = require('path')

const PATH_TO_JSON = process.argv[2]
if (!PATH_TO_JSON || !PATH_TO_JSON.endsWith('.json'))
  throw new Error('Must provide a JSON file to convert')

const contents = fs.readFileSync(path.resolve(process.cwd(), PATH_TO_JSON), 'utf8')
if (contents.startsWith('[')) throw new Error('Already converted')

const lines = contents.split('\n').filter(Boolean)

fs.writeFileSync(
  PATH_TO_JSON,
  ['[', ...lines.map((line, i) => `  ${line}${i === lines.length - 1 ? '' : ','}`), ']'].join('\n')
)
