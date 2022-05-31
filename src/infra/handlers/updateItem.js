const httpsCode = require('../config/statusCode')
const { updateItem } = require('../../domain/usecases/updateItem')
const user = require('../config/user')

module.exports = async (event, context, callback) => {
  try {
    const args = JSON.parse(event.body)

    const parameters = {
      id: Number(event.pathParameters.id),
      description: args.description,
      isDone: args.isDone,
      position: Number(args.position),
    }

    const ucUpdateItem = updateItem()
    await ucUpdateItem.authorize(user)
    const ucResult = await ucUpdateItem.run(parameters)

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
