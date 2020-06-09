const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Mutation {
    updateList(id: Int!, name: String!): TodoList!
  }
`
