const { gql } = require('apollo-server-express')

module.exports = gql`
  type Item {
    id: Int
    description: String
    isDone: Boolean
    position: Int
    listId: Int
  }
`
