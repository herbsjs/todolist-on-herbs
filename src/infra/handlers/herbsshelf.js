const renderShelfHTML = require('@herbsjs/herbsshelf')
const { herbarium } = require('@herbsjs/herbarium')

module.exports = async (event, context, callback) => {
  herbarium.requireAll()

  const usecases = Array.from(herbarium.usecases.all).map(([_, item]) => ({
    usecase: item.usecase(),
    id: item.id,
    tags: { group: item.group },
  }))

  const shelf = renderShelfHTML('TODO List', usecases)

  return {
    statusCode: 200,
    body: shelf,
    headers: { 'Content-Type': 'text/html' },
  }
}
