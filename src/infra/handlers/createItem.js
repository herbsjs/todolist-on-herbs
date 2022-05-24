const httpsCode = require('../config/statusCode')

const dependency = {
  createItem: require('../../domain/usecases/createItem'),
  user: require('../config/user'),
}

module.exports = async (event, context, callback) => {
  const di = { ...dependency, ...context }

  try {
    const args = JSON.parse(event.body)

    const parameters = {
      listId: Number(args.listId),
      description: args.description,
      isDone: args.isDone,
    }

    const ucCreateItem = di.createItem(di)
    await ucCreateItem.authorize(di.user)
    const ucResult = await ucCreateItem.run(parameters)

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
