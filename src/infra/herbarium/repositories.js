const item = require('./list/item')
const list = require('./list/list')
const repositories = new Map()

const builder = (repository, id) => {
    const defaultItem = item(id)
    const repositoryItem = Object.assign({}, defaultItem, { repository })
    return repositoryItem
}

module.exports = list(repositories, builder)