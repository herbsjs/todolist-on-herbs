const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Mutation {
    deleteList(id: String!): TodoList!
  }
`
