const httpsCode = require('../config/statusCode')

async function apiGateway(usecase, parameters, authContext) {
  try {
    const usecaseInstace = usecase()
    await usecaseInstace.authorize(authContext)
    const ucResult = await usecaseInstace.run(parameters)

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
        message: 'Unable to process',
        Stack: JSON.stringify(error),
      }),
    }
  }
}

module.exports = { apiGateway }
