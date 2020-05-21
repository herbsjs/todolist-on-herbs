const checker = require('../checker')
const err = require('../errorCodes')

function presence(value, options) {
    if (options === false) return null
    const result = checker.isEmpty(value)
    return result ? { [err.cantBeEmpty]: options } : null
}

module.exports = presence 