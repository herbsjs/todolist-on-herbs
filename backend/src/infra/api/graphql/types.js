const { entity2type } = require('herbs2gql')

const entities = [
  require('../../../domain/entities/item').Item,
  require('../../../domain/entities/todoList').TodoList
  /* Add more entities here */
]

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