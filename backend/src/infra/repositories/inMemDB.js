const tables = require('./tablesList').tables
class DB {
  constructor() {
    this.id = Math.random() * 1000
    global._todolist = {}
    this.memDB = global._todolist

    tables.forEach((tableName) => {
      this.memDB[tableName] = []
    })
  }

  async get(table, key) {
    return key ? this.memDB[table][key] : this.memDB[table]
  }

  async getMany(table, keys) {
    const ret = []
    for (const key of keys) {
      ret.push(await this.get(table, key))
    }
    return ret
  }

  async set(table, key, value) {
    return (this.memDB[table][key] = JSON.stringify(value))
  }
}

module.exports = new DB()
