const { validate, errorCodes, checker } = require("suma")
const validateValue = validate

class BaseEntity {

    validate() {
        const errors = {}
        for (const [name, definition] of Object.entries(this.meta.schema)) {
            const value = this[name]

            // ignore functions
            if (checker.isFunction(value)) continue

            // types validation
            const validation = definition.validation
            const retErrors = validateValue(value, validation)
            if (retErrors.errors && retErrors.errors.length > 0) {
                errors[name] = retErrors.errors
                continue
            }

            // for entity types (deep validation)
            if (value instanceof BaseEntity) {
                if (value.isValid()) continue
                errors[name] = value.errors
            }
        }

        this.__proto__.errors = errors
    }

    isValid() {
        this.validate()
        return Object.keys(this.errors).length === 0
    }

    toJSON() {
        function deepCopy(obj) {
            const copy = {}
            for (const field in obj.meta.schema) {
                let value = obj[field]
                if (value instanceof BaseEntity) value = deepCopy(value)
                if (value instanceof Function) continue
                copy[field] = value
            }
            return copy
        }
        const obj = deepCopy(this)
        return obj
    }

    static fromJSON(json) {

        function parse(type, value) {
            if(value === undefined) return undefined
            if(value === null) return null

            if (type === Date) return new Date(value)
            if (type.prototype instanceof BaseEntity) {
                const entity = type.fromJSON(value)
                return entity
            }
            return value        
         }

        let data = json
        if (typeof json === "string") data = JSON.parse(json)

        const instance = new this()

        for (const field in instance.meta.schema) {
            const fieldMeta = instance.meta.schema[field]
            if (!(fieldMeta.constructor.name === "Field")) continue
            instance[field] = parse(fieldMeta.type, data[field])
        }

        return instance
    }
}

module.exports = { BaseEntity }
