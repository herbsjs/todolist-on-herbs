const { GraphQLDateTime } = require('graphql-iso-date');

const todoListCreateListResolver  = require('./mutation/createList');
const todoListGetListsResolver  = require('./query/getLists');

const customScalarResolver = {
  Date: GraphQLDateTime
};

module.exports = [
  customScalarResolver,
  todoListCreateListResolver,
  todoListGetListsResolver
];
