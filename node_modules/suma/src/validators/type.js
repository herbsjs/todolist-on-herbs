const checker = require('../checker')
const err = require('../errorCodes')

const typeCheckers = new Map()
typeCheckers.set(String, checker.isString)
typeCheckers.set(Boolean, checker.isBoolean)
typeCheckers.set(Number, checker.isNumber)
typeCheckers.set(Date, checker.isDate)
typeCheckers.set(Object, checker.isObject)
typeCheckers.set(Array, checker.isArray)

function type(value, type) {

    function findTypeChecker(type) {
        let typeChecker = typeCheckers.get(type)
        if (typeChecker === undefined) typeChecker = checker.isInstanceOf
        return typeChecker
    }

    // ignore Null
    if (!checker.isDefined(value)) return null

    let result, typeName
    if (checker.isArrayWithType(type)) {
        let typeChecker = checker.isArrayWithTypeValid
        const innerType = type[0]
        typeName = [innerType.name]
        result = typeChecker(value, findTypeChecker(innerType), innerType)
    } else {
        let typeChecker = findTypeChecker(type)
        typeName = type.name
        result = typeChecker(value, type)
    }
    return result ? null : { [err.wrongType]: typeName }
}

module.exports = type 