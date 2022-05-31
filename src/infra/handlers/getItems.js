const httpsCode = require('../config/statusCode')
const { getItems } = require('../../domain/usecases/getItems')
const user = require('../config/user')

module.exports = async (event, context, callback) => {
  try {
    const parameters = {
      ids:
        event.multiValueQueryStringParameters?.ids.map((id) => Number(id)) ||
        (event.queryStringParameters?.ids &&
          Number(event.queryStringParameters.ids)),
    }

    const ucGetItems = getItems()
    await ucGetItems.authorize(user)
    const ucResult = await ucGetItems.run(parameters)

    if (ucResult.isOk)
      return {
        statusCode: 200,
        body: JSON.stringify(ucResult.ok),
      }

    if (ucResult.err === 'Not Authorized')
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: ucResult.err,
        }),
      }

    return {
      statusCode: httpsCode[ucResult.err.code],
      body: JSON.stringify({
        message: ucResult.err.message,
        stack: ucResult.err.cause,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao processar a solicitação',
        Stack: JSON.stringify(error),
      }),
    }
  }
}
