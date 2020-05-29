const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Mutation {
    createItem(description: String!, listId: Int!): Item
  }
`
