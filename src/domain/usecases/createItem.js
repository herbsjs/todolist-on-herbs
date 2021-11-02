const { Ok, Err, usecase, step, ifElse } = require('@herbsjs/herbs')
const { Item } = require('../entities/item')
const { herbarium } = require('../../infra/herbarium')

const dependency = {
  ItemRepository: require('../../infra/repositories/pg/itemRepository'),
  ListRepository: require('../../infra/repositories/pg/listRepository'),
}

const createItem = (injection) =>
  usecase('Create Item', {
    request: { listId: Number, description: String, isDone: Boolean },

    response: Item,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: async (user) => (user.canCreateItem ? Ok() : Err()),

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
      const ret = await repo.find({ where: { id: [req.listId] } })
      const list = (ctx.list = ret[0])

      if (list === undefined) return Err(`List not found - ID: ${req.listId}`)
      return Ok()
    }),

    'Set item position as the last Item on the List': step(async (ctx) => {
      const req = ctx.req
      const item = ctx.item
      const list = ctx.list
      const repo = new ctx.di.ItemRepository(injection)
      list.items = await repo.find({ where: { listId: req.listId } })

      if (list.isEmpty()) {
        item.position = 1
        return Ok()
      }

      // put Item at the botton of the list
      item.position = list.lastPosition() + 1
      return Ok()
    }),

    'Save list': step(async (ctx) => {
      const repo = new ctx.di.ItemRepository(injection)
      const item = ctx.item
      return (ctx.ret = await repo.insert(item))
    }),
  })

herbarium
  .usecases.add(createItem, 'CreateItem')
  .metadata({ group: 'Items', operation: herbarium.crud.create, entity: 'Item' })

module.exports.createItem = createItem