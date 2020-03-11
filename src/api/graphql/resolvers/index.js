const { GraphQLDateTime } = require('graphql-iso-date');

const todoListResolvers  = require('./todoList');

const customScalarResolver = {
  Date: GraphQLDateTime
};

module.exports = [
  customScalarResolver,
  todoListResolvers
];
