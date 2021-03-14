const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { Item } = require('../entities/item')

const dependency = {
  ItemRepository: require('../../infra/repositories/pg/itemRepository'),
  ListRepository: require('../../infra/repositories/pg/listRepository'),
}

module.exports.createItem = (injection) =>
  usecase('Create Item', {
    request: { listId: Number, description: String, isDone: Boolean },

    response: Item,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: (user) => (user.canCreateItem ? Ok() : Err()),

    'Check if the Item is valid': step((ctx) => {
      const req = ctx.req
      const item = ctx.item = new Item()
      item.id = Math.floor(Math.random() * 100000)
      item.description = req.description
      item.isDone = req.isDone
      item.listId = req.listId

      if (!item.isValid()) return Err(item.errors)
      return Ok()
    }),

    'Check if the List exists': step(async (ctx) => {
      const req = ctx.req
      const repo = new ctx.di.ListRepository(injection)
      const ret = await repo.findByID([req.listId])
      const list = (ctx.List = ret[0])

      if (list === undefined) return Err(`List not found - ID: ${req.listId}`)
      return Ok()
    }),

    'Set item position as the last Item on the List': step(async (ctx) => {
      const req = ctx.req
      const item = ctx.item
      const repo = new ctx.di.ItemRepository(injection)
      const otherItems = await repo.findBy({ listId: req.listId })

      if (otherItems.length === 0) {
        item.position = 1
        return Ok()
      }

      // put Item to the botton of the list
      const positions = otherItems.map(i => i.position)
      const lastPosition = Math.max(...positions)
      item.position = lastPosition + 1
      return Ok()
    }),

    'Save list': step(async (ctx) => {
      const repo = new ctx.di.ItemRepository(injection)
      const item = ctx.item
      return (ctx.ret = await repo.insert(item))
    }),
  })
