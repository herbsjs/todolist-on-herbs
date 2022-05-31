const httpsCode = require('../config/statusCode')
const { createItem } = require('../../domain/usecases/createItem')
const user = require('../config/user')

module.exports = async (event, context, callback) => {
  try {
    const args = JSON.parse(event.body)

    const parameters = {
      listId: Number(args.listId),
      description: args.description,
      isDone: args.isDone === 'true',
    }

    const ucCreateItem = createItem()
    await ucCreateItem.authorize(user)
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
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao processar a solicitação',
        Stack: JSON.stringify(error),
      }),
    }
  }
}
