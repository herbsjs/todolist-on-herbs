const { entity2type } = require('@herbsjs/herbs2gql')
const { herbarium } = require('@herbsjs/herbarium')

const entities = Array.from(herbarium.entities.all.values()).map(e => e.entity)

const defaultSchema = [`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }`]

let types = [defaultSchema]
types = types.concat(entities.map(entity => [entity2type(entity)]))

/* Custom Types */
types.push(require('./custom/date'))

module.exports = types
