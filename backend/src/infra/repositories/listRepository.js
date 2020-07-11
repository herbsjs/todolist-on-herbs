const DB = require('./inMemDB')
const { Ok} = require('buchu')
const { TodoList } = require('../../domain/entities/todoList')

module.exports = class ListRepository {
  constructor() {
    this.table = 'list'
  }

  async save(list) {
    const ret = await DB.set(this.table, list.id, list)
    return Ok(TodoList.fromJSON(ret))
  }

  async getByIDs(ids) {
    const ret = await DB.getMany(this.table, ids)
    const listArray = []
    for (var i = 0, len = ret.length; i < len; i++) {
      if (ret[i] === undefined) continue
      listArray.push(TodoList.fromJSON(ret[i]))
    }
    return Ok(listArray)
  }
}
