const fs = require('fs')
const path = require('path')

const fileToFix = path.resolve(process.cwd(), process.argv[2])
console.log('Fixing', fileToFix, '...')
const lines = fs
  .readFileSync(process.argv[2], 'utf8')
  .split('\n')
  .filter(Boolean)
JSON.parse(lines[0])

fs.writeFileSync(fileToFix, '[\n' + lines.join(',') + '\n]')
