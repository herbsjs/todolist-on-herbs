const { apiGateway } = require('./defaultHandler')
const { updateList } = require('../../domain/usecases/updateList')
const { user } = require('../config')

module.exports = async (event, context, callback) => {
  const args = JSON.parse(event.body)

  const parameters = {
    id: Number(event.pathParameters.id),
    name: args.name,
  }
  return apiGateway(updateList, parameters, user)
}
