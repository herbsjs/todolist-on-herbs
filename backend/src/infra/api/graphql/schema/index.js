const { gql } = require('apollo-server-express')

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`

module.exports = [linkSchema,
  // types
  require('./type/todoLists'),
  require('./type/item'),

  // queries
  require('./query/getLists'),

  // mutations
  require('./mutation/createList'),
  require('./mutation/createItem'),
  require('./mutation/updateItem'),
]
