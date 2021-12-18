const usecases = require('./usecases')
const entities = require('./entities')
const repositories = require('./repositories')
const crud = require('./crud')
const requireAll = require('./requireAll')

module.exports = {
    herbarium: {
        requireAll,
        entities,
        usecases,
        repositories,
        crud
    }
}