const { BaseEntity } = require('./baseEntity')

class Field {
    constructor(type, options = {}) {
        this.name = ""
        this.type = type
        this.options = options
        this._validations = null
    }

    get defaultValue() {

        if (this.options.default !== undefined) {
            if (typeof this.options.default === "function") return this.options.default()
            return this.options.default
        }

        const type = this.type
        if (type === Number) return 0
        if (type === String) return ""
        if (type === Date) return null
        if (type === Boolean) return false
        if (type.prototype instanceof BaseEntity) return new type()
        return undefined
    }

    get validation() {

        if (this._validations) return this._validations

        const validation = { type: this.type }
        if (this.options.validation)
            Object.assign(validation, this.options.validation)

        return this._validations = validation
    }

}

const field = (type, options) => {
    return new Field(type, options)
}

module.exports = { field, Field }