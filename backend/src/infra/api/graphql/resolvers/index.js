const { GraphQLDateTime } = require('graphql-iso-date')

const createListResolver  = require('./mutation/createList')
const createItemResolver  = require('./mutation/createItem')
const updateItemResolver  = require('./mutation/updateItem')
const deleteListResolver  = require('./mutation/deleteList')
const updateListResolver  = require('./mutation/updateList')
const getListsResolver  = require('./query/getLists')

const customScalarResolver = {
  Date: GraphQLDateTime
}

module.exports = [
  customScalarResolver,
  createListResolver,
  getListsResolver,
  updateListResolver,
  deleteListResolver,
  createItemResolver,
  updateItemResolver,
  
  
]
