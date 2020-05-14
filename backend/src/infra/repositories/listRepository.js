const DB = require('./inMemDB')
const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { TodoList } = require('../../domain/entities/todoList')

module.exports = class ListRepository {
  constructor() {
    this.table = 'list'
  }

  async save(list) {
    try{
      const ret = await DB.set(this.table, list.id, list)

      if(!ret)
      return Err('Not Saved')

      return Ok(TodoList.fromJSON(ret))
    }catch(__){
      return Err('Not Saved')
    }
  }

  async getByIDs(ids) {
    const ret = await DB.getMany(this.table, ids)

    if(!ret)
      return Err('Not Found')

    const listArray = []
    for (var i = 0, len = ret.length; i < len; i++) {
      if (ret[i] === undefined) continue
      listArray.push(TodoList.fromJSON(ret[i]))
    }

    if(!listArray.length)
      return Err('Not Found')

    return Ok(listArray)
  }
}
