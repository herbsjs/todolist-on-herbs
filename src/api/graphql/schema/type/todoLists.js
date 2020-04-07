const { gql } = require('apollo-server-express')

module.exports = gql`
  type TodoList {
    id: String
    name: String
  }
`