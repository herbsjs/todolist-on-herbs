const { deleteList } = require('../../domain/usecases/deleteList')
const { apiGateway } = require('./defaultHandler')
const { user } = require('../config')

module.exports = async (event, context, callback) => {
  const parameters = {
    id: Number(event.pathParameters.id),
  }

  return apiGateway(deleteList, parameters, user)
}
