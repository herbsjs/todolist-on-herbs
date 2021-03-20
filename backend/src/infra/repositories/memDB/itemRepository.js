const DB = require('./inMemDB')
const { Ok, Err } = require('buchu')
const { Item } = require('../../../domain/entities/item')

module.exports = class ItemListRepositoy {
  constructor() {
    this.table = 'item'
  }

  async save(item) {
    try {
      const ret = await DB.set(this.table, item.id, item)

      if (!ret) return Err('Not Saved')

      return Ok(Item.fromJSON(ret))
    } catch (__) {
      return Err('Not Saved')
    }
  }

  async geItemByListID(id) {
      const ret = await DB.getAll(this.table)

      const itemListArray = []
      for (var i = 0, len = ret.length; i < len; i++) {
        const item = ret[i]
        if (item === undefined || JSON.parse(item).listId !== id) continue
        itemListArray.push(Item.fromJSON(item))
      }

      return Ok(itemListArray)
  }

  async getItemByID(id) {
      const ret = await DB.get(this.table, id)

      if (ret) return Ok(Item.fromJSON(ret))

      return Err('Not Found')
  }
}
