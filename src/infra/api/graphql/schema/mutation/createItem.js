const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Mutation {
    createItem(description: String!, idList: Int!): Item
  }
`
