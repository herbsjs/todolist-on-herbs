const { apiGateway } = require('./defaultHandler')
const { updateItem } = require('../../domain/usecases/updateItem')
const { user } = require('../config')

module.exports = async (event, context, callback) => {
  const args = JSON.parse(event.body)

  const parameters = {
    id: event?.pathParameters?.id && Number(event.pathParameters.id),
    description: args.description,
    isDone: args.isDone,
    position: args.position && Number(args.position),
  }

  return apiGateway(updateItem, parameters, user)
}
