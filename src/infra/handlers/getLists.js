const { getLists } = require('../../domain/usecases/getLists')
const { apiGateway } = require('./defaultHandler')
const { user } = require('../config')

module.exports = async (event, context, callback) => {
  const args = JSON.parse(event.body)

  const parameters = {
    listId: args?.listId && Number(args?.listId),
    description: args?.description,
    isDone: args?.isDone,
  }

  return apiGateway(getLists, parameters, user)
}
