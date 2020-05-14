const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Mutation {
    updateItem(
      id: Int!
      description: String
      isDone: Boolean
      position: Int!
    ): Item!
  }
`
