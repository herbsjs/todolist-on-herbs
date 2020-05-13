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

  // queries
  require('./query/getLists'),

  // mutations
  require('./mutation/createList'),
]
