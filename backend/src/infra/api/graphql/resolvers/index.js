const { GraphQLDateTime } = require('graphql-iso-date')

const createListResolver  = require('./mutation/createList')
const createItemResolver  = require('./mutation/createItem')
const updateItemResolver  = require('./mutation/updateItem')
const getListsResolver  = require('./query/getLists')

const customScalarResolver = {
  Date: GraphQLDateTime
}

module.exports = [
  customScalarResolver,
  createListResolver,
  getListsResolver,
  createItemResolver,
  updateItemResolver
]
