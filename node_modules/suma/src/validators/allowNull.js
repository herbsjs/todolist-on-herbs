const checker = require('../checker')
const err = require('../errorCodes')

function allowNull(value, options) {
    if (options === false) return null
    const result = checker.isDefined(value)
    return result ? null : { [err.cantBeNull]: options }
}

module.exports = allowNull 