const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getLists(ids: [Int]): [TodoList]
  }

  extend type Mutation {
    createList(name: String!): TodoList!
  }

  type TodoList {
    id: String
    name: String
  }
`
