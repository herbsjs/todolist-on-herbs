const checker = require('../checker')
const err = require('../errorCodes')

const datetimeCheckers = {
    before: {
        func: (value, param) => !checker.isBeforeThan(value, param),
        err: err.tooLate
    },
    after: {
        func: (value, param) => !checker.isAfterThan(value, param),
        err: err.tooEarly
    },
    isAt: {
        func: (value, param) => !checker.isAt(value, param),
        err: err.notAt
    },
}

function datetime(value, options) {
    let results = null
    for (const [validator, param] of Object.entries(options)) {
        // ignore Null
        if (!checker.isDefined(value)) continue 
        
        const dtChecker = datetimeCheckers[validator]
        if (dtChecker === undefined) throw Error(`Unknown datetime validator "${validator}"`)
        
        // datetime: does not validate if it not a number
        if (!checker.isDate(value)) {
            results = results || []
            results.push({ [err.notADate]: param })
            continue
        }

        const result = dtChecker.func(value, param)
        if (result) {
            results = results || []
            results.push({ [dtChecker.err]: param })
        }
    }
    return results
}

module.exports = datetime 