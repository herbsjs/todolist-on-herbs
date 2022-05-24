const httpsCode = require('../config/statusCode')

const dependency = {
  createList: require('../../domain/usecases/createList'),
  user: require('../config/user'),
}

module.exports = async (event, context, callback) => {
  const di = { ...dependency, ...context }

  try {
    const args = JSON.parse(event.body)

    const parameters = {
      name: args.name,
    }

    const ucCreateList = di.createList(di)
    await ucCreateList.authorize(di.user)
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
    logger.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao processar a solicitação',
        Stack: JSON.stringify(error),
      }),
    }
  }
}
