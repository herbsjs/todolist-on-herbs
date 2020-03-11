const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    lists(ids: [Int]): [TodoList]
  }

  extend type Mutation {
  
  createList(
      name: String!
    ): TodoList!
  
  }
  
  type TodoList {
    id: String,
    name: String
  }
`;