var {gql} = require("apollo-server-express");

var todoListSchema = require("./todoList");

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

`;

module.exports = [linkSchema, todoListSchema];
