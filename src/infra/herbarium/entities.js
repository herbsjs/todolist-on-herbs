const item = require('./list/item')
const list = require('./list/list')
const entities = new Map()

const builder = (entity, id) => {
    const defaultItem = item(id)
    const entityItem = Object.assign({}, defaultItem, { entity })
    return entityItem
}

module.exports = list(entities, builder)