const checker = require('../checker')
const err = require('../errorCodes')

const numericalityCheckers = {
    greaterThan: {
        func: (value, param) => !checker.isGreaterThan(value, param),
        err: err.notGreaterThan
    },
    greaterThanOrEqualTo: {
        func: (value, param) => !checker.isGreaterThanOrEqualTo(value, param),
        err: err.notGreaterThanOrEqualTo
    },
    equalTo: {
        func: (value, param) => !checker.isEqualTo(value, param),
        err: err.notEqualTo
    },
    lessThan: {
        func: (value, param) => !checker.isLessThan(value, param),
        err: err.notLessThan
    },
    lessThanOrEqualTo: {
        func: (value, param) => !checker.isLessThanOrEqualTo(value, param),
        err: err.notLessThanOrEqualTo
    },
    onlyInteger: {
        func: (value, param) => param === true && !checker.isInteger(value),
        err: err.notAnInteger
    },
}

function numericality(value, options) {
    let results = null
    for (const [validator, param] of Object.entries(options)) {
        // ignore Null
        if (!checker.isDefined(value)) continue 
        
        const numChecker = numericalityCheckers[validator]
        if (numChecker === undefined) throw Error(`Unknown numericality validator "${validator}"`)
        
        // numericality: does not validate if it not a number
        if (!checker.isNumber(value)) {
            results = results || []
            results.push({ [err.notANumber]: param })
            continue
        }

        const result = numChecker.func(value, param)
        if (result) {
            results = results || []
            results.push({ [numChecker.err]: param })
        }
    }
    return results
}

module.exports = numericality 