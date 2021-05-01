const { usecase2query, defaultResolver } = require('herbs2gql')

const usecases = [
    require('../../../domain/usecases/getLists').getLists
    /* Add more use cases here */
]

const queries = usecases.map(usecase => usecase2query(usecase(), defaultResolver(usecase)))

/* Custom Queries */
// queries.push(require('./custom/getItem'))

module.exports = queries
