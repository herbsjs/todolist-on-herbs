const { usecase2query, defaultResolver } = require('@herbsjs/herbs2gql')

const usecases = [
    require('../../../domain/usecases/getLists').getLists,
    /* Add more use cases here */
    require('../../../domain/usecases/getItems').getItems
]

const queries = usecases.map(usecase => usecase2query(usecase(), defaultResolver(usecase)))

/* Custom Queries */
// queries.push(require('./custom/getItems'))

module.exports = queries