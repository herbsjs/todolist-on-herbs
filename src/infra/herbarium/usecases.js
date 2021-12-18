const item = require('./list/item')
const list = require('./list/list')
const usecases = new Map()

const builder = (usecase, id) => {
    const defaultItem = item(id)
    const usecaseItem = Object.assign({}, defaultItem, {
        usecase,
        operation: undefined,
        entity: undefined,
        group: undefined
    })
    return usecaseItem
}

module.exports = list(usecases, builder)