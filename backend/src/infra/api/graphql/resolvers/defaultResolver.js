const { UserInputError, ForbiddenError } = require('apollo-server-express')

function args2request(args, useCase) {
    const params = {}
    const fields = Object.keys(useCase.requestSchema)
    for (const field of fields) params[field] = args[field]
    return params
}

function defaultResolver(params) {

    return async function resolver(parent, args, context, info) {

        /* Initialization */
        const uc = params.usecase(args.injection)

        /* Authorization */
        const hasAccess = uc.authorize(context.user)
        if (hasAccess === false) {
            // eslint-disable-next-line no-console
            console.info(uc.auditTrail)
            throw new ForbiddenError()
        }

        /* Execution */
        const request = args2request(args, uc)
        const response = await uc.run(request)

        /* Audit */
        // eslint-disable-next-line no-console
        console.info(uc.auditTrail)

        /* Response */
        if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
        return response.ok
    }
}

module.exports = defaultResolver
