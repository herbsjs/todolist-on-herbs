const fs = require('fs')
const files = fs.readdirSync(require('path').join(__dirname, './'))

const handlers = {}
for (file of files) {
  const handlerName = file.split('.')[0]
  if (['index', 'defaultHandler'].includes(handlerName)) continue
  handlers[handlerName] = require('./' + file)
}

module.exports = handlers
