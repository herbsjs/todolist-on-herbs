const { deleteItem } = require('../../domain/usecases/deleteItem')
const { apiGateway } = require('./defaultHandler')
const { user } = require('../config')

module.exports = async (event, context, callback) => {
  const parameters = {
    id: Number(event.pathParameters.id),
  }

  return apiGateway(deleteItem, parameters, user)
}
