const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { Item } = require('../entities/item')

const dependency = {
  ItemRepository: require('../../infra/repositories/ItemRepository'),
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.createItem = (injection) =>
  usecase('Create Item', {
    request: { idList: Number, description: String },

    authorize: (user) => (user.canAddItem ? Ok() : Err()),

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    'Create item': step(
      (ctx) =>
        (ctx.item = Item.fromJSON({
          id: Math.floor(Math.random() * 100000),
          description: ctx.req.description,
          isDone: false,
          idList: ctx.req.idList,
        }))
    ),

    'Check if it is valid item': step((ctx) =>
      ctx.item.isValid() ? Ok() : Err(ctx.list.errors)
    ),

    'Check if list exist': step(async (ctx) => {
      const listRepo = new ctx.di.ListRepository(injection)
      const ret = await listRepo.getByIDs(ctx.req.idList)
      const list = (ctx.List = ret.ok[0])
      if (!list) return Err(`List not found - ID: "${ctx.req.idList}"`)

      return Ok()
    }),

    'Get the last position value': step(async (ctx) => {
      const itensRepo = new ctx.di.ItemRepository(injection)
      const itensList = (await itensRepo.geItemByListID(ctx.req.idList)).ok

      if (!itensList.length){
        ctx.item.position = 1
        return Ok()
      }

      const lastItem = itensList.reduce((prev, cur) => {
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
