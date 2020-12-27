const { usecase2query } = require('herbs2gql')
const defaultResolver = require('./defaultResolver')

const usecases = [
    require('../../../domain/usecases/getLists').getLists()
    /* Add more use cases here */
]

const queries = usecases.map(usecase => usecase2query(usecase, defaultResolver(usecase)))

/* Custom Queries */
// queries.push(require('./custom/getItem'))

module.exports = queries
