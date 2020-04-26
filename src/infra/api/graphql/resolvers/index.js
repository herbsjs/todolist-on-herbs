const { GraphQLDateTime } = require('graphql-iso-date')

const createListResolver  = require('./mutation/createList')
const deleteListResolver  = require('./mutation/deleteList')
const getListsResolver  = require('./query/getLists')

const customScalarResolver = {
  Date: GraphQLDateTime
}

module.exports = [
  customScalarResolver,
  createListResolver,
  deleteListResolver,
  getListsResolver,
]
