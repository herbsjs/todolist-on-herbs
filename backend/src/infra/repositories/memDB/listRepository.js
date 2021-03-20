const DB = require('./inMemDB')
const { Ok, Err } = require('buchu')
const { TodoList } = require('../../../domain/entities/todoList')

module.exports = class ListRepository {
  constructor() {
    this.table = 'list'
  }

  async insert(list) {
    try{
      const ret = await DB.set(this.table, list.id, list)

      if(!ret)
      return Err('Not Saved')

      return Ok(TodoList.fromJSON(ret))
    }catch(__){
      return Err('Not Saved')
    }
  }

  async getAll() {
    const ret = await DB.getAll(this.table)
    const listArray = []
    for (var i = 0, len = ret.length; i < len; i++) {
      if (ret[i] === undefined) continue
      listArray.push(TodoList.fromJSON(ret[i]))
    }
    return Ok(listArray)
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

  async deleteByIDs(ids) {
    await DB.deleteMany(this.table, ids)
    const listArray = await this.getAll()
    return Ok(listArray)
  }
}
