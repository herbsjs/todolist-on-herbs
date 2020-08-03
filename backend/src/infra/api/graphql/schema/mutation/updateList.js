const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Mutation {
    updateList(id: String!, name: String!): TodoList!
  }
`
