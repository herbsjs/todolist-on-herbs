const { herbsshelf } = require('@herbsjs/herbsshelf')
const { herbarium } = require('@herbsjs/herbarium')

module.exports = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: herbsshelf({ project: 'TODO List', herbarium }),
    headers: { 'Content-Type': 'text/html' },
  }
}
