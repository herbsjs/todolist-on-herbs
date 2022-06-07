const { createItem } = require('../../domain/usecases/createItem')
const { apiGateway } = require('./defaultHandler')
const user = require('../config/user')

module.exports = async (event, context, callback) => {
  const args = JSON.parse(event.body)

  const parameters = {
    listId: Number(args.listId),
    description: args.description,
    isDone: args.isDone,
  }

  return apiGateway(createItem, parameters, user)
}
