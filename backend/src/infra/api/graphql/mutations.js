const { usecase2mutation, defaultResolver } = require('herbs2gql')

const usecases = [
    require('../../../domain/usecases/createList').createList,
    require('../../../domain/usecases/deleteList').deleteList,
    require('../../../domain/usecases/updateList').updateList,
    require('../../../domain/usecases/updateItem').updateItem
    /* Add more use cases here */
]
const mutations = usecases.map(usecase => usecase2mutation(usecase(), defaultResolver(usecase)))

/* Custom Mutations */
mutations.push(require('./custom/createItem'))

module.exports = mutations