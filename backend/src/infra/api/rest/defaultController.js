function castRequest(value, type) {
    if (value === undefined) return undefined
    if (Array.isArray(type))
        return [castRequest(value, type[0])]
    if (type === Number) return Number(value)
    if (type === String) return String(value)
}

function req2request(req, useCase) {
    const schema = useCase.requestSchema
    const params = {}
    const fields = Object.keys(schema)
    for (const field of fields) {
        const type = schema[field]
        let value = castRequest(req[field], type)
        if (value !== undefined) params[field] = value
    }
    return params
}

async function defaultController(usecase, req, user, res, next) {
    try {

        /* Authorization */
        const hasAccess = usecase.authorize(user)
        if (hasAccess === false) {
            // eslint-disable-next-line no-console
            console.info(usecase.auditTrail)
            return res.status(403).json({ message: 'User is not authorized' })
        }

        /* Execution */
        const request = req2request(req, usecase)
        const response = await usecase.run(request)

        /* Audit */
        // eslint-disable-next-line no-console
        console.info(usecase.auditTrail)

        /* Response */
        if (response.isOk) res.status(200).json(response.ok)
        else res.status(400).json({ error: response.err })

        res.end()
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        res.status(500).json({ error: error.name, message: error.message })
        next()
    }
}

module.exports = defaultController