const { GraphQLDateTime } = require('graphql-iso-date')

const createListResolver  = require('./mutation/createList')
const getListsResolver  = require('./query/getLists')
const updateListResolver = require('./mutation/updateList')

const customScalarResolver = {
  Date: GraphQLDateTime
}

module.exports = [
  customScalarResolver,
  createListResolver,
  getListsResolver,
  updateListResolver
]
