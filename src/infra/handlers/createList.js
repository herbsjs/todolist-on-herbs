const { createList } = require('../../domain/usecases/createList')
const { apiGateway } = require('./defaultHandler')
const { user } = require('../config')

module.exports = async (event, context, callback) => {
  const args = JSON.parse(event.body)

  const parameters = {
    name: args.name,
  }

  return apiGateway(createList, parameters, user)
}
