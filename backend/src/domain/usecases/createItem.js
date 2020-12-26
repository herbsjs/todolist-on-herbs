const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { Item } = require('../entities/item')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ItemRepository: require('../../infra/repositories/itemRepository'),
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.createItem = (injection) =>
  usecase('Create Item', {
    request: { listId: Number, description: String },

    response: Item,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: (user) => (user.canCreateItem ? Ok() : Err()),

    'Create temporary item': step((ctx) =>
    (
      ctx.item = Item.fromJSON({
        id: Math.floor(Math.random() * 100000),
        description: ctx.req.description,
        isDone: false,
        listId: ctx.req.listId,
      })
    )),

    'Check if it is valid item': step((ctx) =>
      ctx.item.isValid() ? Ok() : Err(ctx.item.errors)
    ),

    'Check if list exist': step(async (ctx) => {
      const listRepo = new ctx.di.ListRepository(injection)
      const ret = await listRepo.getByIDs([ctx.req.listId])
      const list = (ctx.List = ret.ok[0])
      if (!list) return Err(`List not found - ID: "${ctx.req.listId}"`)

      return Ok()
    }),

    'Set item position as the last item on the list': step(async (ctx) => {
      const itemRepo = new ctx.di.ItemRepository(injection)
      const repoResult = await itemRepo.geItemByListID(ctx.req.listId)

      if (repoResult.isErr) return repoResult

      const items = repoResult.ok

      if (!items.length) {
        ctx.item.position = 1
        return Ok()
      }

      const lastItem = items.reduce((prev, cur) => {
        return prev ? (cur.position > prev.position ? cur : prev) : cur
      }, undefined)

      if (lastItem) ctx.item.position = lastItem.position + 1

      return Ok()
    }),

    'Save list': step(async (ctx) => {
      const itemRepo = new ctx.di.ItemRepository(injection)
      return (ctx.ret = await itemRepo.save(ctx.item))
    }),
  })
