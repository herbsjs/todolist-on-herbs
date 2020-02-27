class DB {

    constructor() {
        this.id = Math.random() * 1000
        global._todolist = {}
        this.memDB = global._todolist
    }

    _key(table, key) {
        return table + key
    }

    async get(table, key) {
        return this.memDB[this._key(table, key)]
    }

    async set(table, key, value) {
        return this.memDB[this._key(table, key)] = value
    }
}

module.exports = new DB()