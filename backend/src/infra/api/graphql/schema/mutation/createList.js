const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Mutation {
    createList(name: String!): TodoList!
  }
`
