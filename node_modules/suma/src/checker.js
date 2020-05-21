class Checker {

    static isFunction(value) {
        return typeof value === 'function'
    }

    static isDefined(value) {
        return value !== null && value !== undefined
    }

    static isArray(value) {
        return {}.toString.call(value) === '[object Array]'
    }
    
    static isArrayWithType(value) {
        return Array.isArray(value) && value.length === 1 && typeof value[0] === 'function'
    }

    static isArrayWithTypeValid(value, typeChecker, type) {
        return value.every((i) => typeChecker(i, type))
    }

    static isString(value) {
        return typeof value === 'string' || value instanceof String
    }

    static isBoolean(value) {
        return (value === false || value === true)
    }

    static isNumber(value) {
        return typeof value === 'number'
    }

    static isDate(obj) {
        return obj instanceof Date
    }

    static isObject(obj) {
        return obj === Object(obj)
    }

    static isInstanceOf(obj, type) {
        return obj instanceof type
    }

    static isEmpty(value) {
        if (!this.isDefined(value)) return true

        if (this.isFunction(value)) return false

        if (this.isString(value)) {
            const EMPTY_STRING_REGEXP = /^\s*$/
            return EMPTY_STRING_REGEXP.test(value)
        }

        if (this.isArray(value)) return value.length === 0

        if (this.isDate(value)) return false

        if (this.isObject(value)) {
            // If it finds at least one property we consider it non empty
            for (const attr in value) {
                return false
            }
            return true
        }

        return false
    }

    static isValidFormat(value,expression) {
        return expression.test(value)
    }
    
    static isTooShort(value, minimum) {
        if (!this.isNumber(minimum)) throw Error(`Invalid minimum length. It must be a number.`)
        const length = value.length
        return length < minimum 
    }

    static isTooLong(value, maximum) {
        if (!this.isNumber(maximum)) throw Error(`Invalid maximum length. It must be a number.`)
        const length = value.length
        return length > maximum 
    }
    static isWrongLength(value, expectedLength) {
        if (!this.isNumber(expectedLength)) throw Error(`Invalid length. It must be a number.`)
        const length = value.length
        return length !== expectedLength 
    }

    static isEqualTo(left, right) {
        if (!this.isNumber(right)) throw Error(`Invalid 'Equal To'. It must be a number.`)
        return left === right 
    }

    static isGreaterThan(left, right) {
        if (!this.isNumber(right)) throw Error(`Invalid 'Greater Than'. It must be a number.`)
        return left > right 
    }

    static isGreaterThanOrEqualTo(left, right) {
        if (!this.isNumber(right)) throw Error(`Invalid 'Greater Than Or Equal To'. It must be a number.`)
        return left >= right 
    }

    static isLessThan(left, right) {
        if (!this.isNumber(right)) throw Error(`Invalid 'Less Than'. It must be a number.`)
        return left < right 
    }

    static isLessThanOrEqualTo(left, right) {
        if (!this.isNumber(right)) throw Error(`Invalid 'Less Than Or Equal To'. It must be a number.`)
        return left <= right 
    }
    
    static isInteger(value) {
        return this.isNumber(value) && value % 1 === 0;
    }

    static isBeforeThan(value, param) {
        if (!this.isDate(value)) throw Error(`Invalid value. It must be a date.`)
        return value < param 
    }

    static isAfterThan(value, param) {
        if (!this.isDate(value)) throw Error(`Invalid value. It must be a date.`)
        return value > param 
    }

    static isAt(value, param) {
        if (!this.isDate(value)) throw Error(`Invalid value. It must be a date.`)
        return value.valueOf() === param.valueOf() 
    }
}

module.exports = Checker