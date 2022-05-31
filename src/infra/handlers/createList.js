const httpsCode = require('../config/statusCode')
const { createList } = require('../../domain/usecases/createList')
const user = require('../config/user')

module.exports = async (event, context, callback) => {
  try {
    const args = JSON.parse(event.body)

    const parameters = {
      name: args.name,
    }

    const ucCreateList = createList()
    await ucCreateList.authorize(user)
    const ucResult = await ucCreateList.run(parameters)

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
