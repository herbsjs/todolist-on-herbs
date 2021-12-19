const { usecase2mutation, defaultResolver } = require('@herbsjs/herbs2gql')
const { herbarium } = require('@herbsjs/herbarium')

const usecases = herbarium.usecases
    .findBy({ operation: [herbarium.crud.create, herbarium.crud.update, herbarium.crud.delete] })
    .map(e => e.usecase)

const mutations = usecases.map(usecase => usecase2mutation(usecase(), defaultResolver(usecase)))

/* Custom Mutations Example */
mutations.push(require('./custom/createItem'))

module.exports = mutations