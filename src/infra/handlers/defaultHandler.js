async function apiGateway(usecase, parameters, authContext) {
  try {
    const usecaseInstace = usecase()
    const hasAccess = await usecaseInstace.authorize(authContext)
    const response = await usecaseInstace.run(parameters)

    if (hasAccess === false)
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: response.err,
        }),
      }

    if (response.isOk)
      return {
        statusCode: 200,
        body: JSON.stringify(ucResult.ok),
      }

    let statusCode = 400
    if (response.isInvalidArgumentsError) statusCode = 400
    if (response.isPermissionDeniedError) statusCode = 403
    if (response.isNotFoundError) statusCode = 404
    if (response.isAlreadyExistsError) statusCode = 409
    if (response.isInvalidEntityError) statusCode = 422
    if (response.isUnknownError) statusCode = 500

    return {
      statusCode,
      body: JSON.stringify({
        message: response.err,
        stack: response.err,
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
