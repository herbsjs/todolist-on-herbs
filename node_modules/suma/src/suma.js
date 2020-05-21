const validators = {
    presence: require('./validators/presence'),
    format: require('./validators/format'),
    allowNull: require('./validators/allowNull'),
    type: require('./validators/type'),
    length: require('./validators/length'),
    numericality: require('./validators/numericality'),
    datetime: require('./validators/datetime'),
}
const errorCodes = require('./errorCodes')
const checker = require('./checker')

function validate(value, validations) {
    let result = []
    const entries = Object.entries(validations)
    for (const [key, options] of entries) {
        const validator = validators[key]
        if (validator === undefined) throw Error(`Unknown validator "${key}"`)
        const validation = validator(value, options)
        if (validation) result = result.concat(validation)
    }
    return { value: value, errors: result }
}

module.exports = { validate, errorCodes, checker }