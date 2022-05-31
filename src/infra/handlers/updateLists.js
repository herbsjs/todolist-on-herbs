const httpsCode = require('../config/statusCode')
const { updateList } = require('../../domain/usecases/updateList')
const user = require('../config/user')

module.exports = async (event, context, callback) => {
  try {
    const args = JSON.parse(event.body)

    const parameters = {
      id: Number(event.pathParameters.id),
      name: args.name,
    }

    const ucUpdateList = updateList()
    await ucUpdateList.authorize(user)
    const ucResult = await ucUpdateList.run(parameters)

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
