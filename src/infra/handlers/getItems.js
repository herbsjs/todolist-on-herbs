const { getItems } = require('../../domain/usecases/getItems')
const { apiGateway } = require('./defaultHandler')
const user = require('../config/user')

module.exports = async (event, context, callback) => {
  const parameters = {
    ids:
      event.multiValueQueryStringParameters?.ids.map((id) => Number(id)) ||
      (event.queryStringParameters?.ids &&
        Number(event.queryStringParameters.ids)),
  }
  return apiGateway(getItems, parameters, user)
}
