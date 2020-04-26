const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { ItemList } = require('../entities/itemList')

const dependency = {
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.createItemList = (injection) =>
  usecase('Create Item List', {
    request: { idList: Number, description: String },

    authorize: (user) => (user.canAddItemList ? Ok() : Err()),

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    'Create item': step(
      (ctx) =>
        (ctx.item = ItemList.fromJSON({
          description: ctx.req.description,
          isDone: false
        }))
    ),

    'Check if it is valid item': step((ctx) =>
      ctx.item.isValid() ? Ok() : Err(ctx.list.errors)
    ),

    'Check if list exist': step(async (ctx) => {
      const listRepo = new ctx.di.ListRepository(injection)
      const ret = await listRepo.getByIDs([ctx.req.idList])
      if (ret.isErr) return ret
      const list = (ctx.list = ret.ok[0])
      if (!list) return Err(`List not found - ID: "${ctx.req.idList}"`)

      return Ok()
    }),

    'Get the last position value': step((ctx) => {
      const lastItem = ctx.list.items.reduce((prev, cur) => {
        return prev ? (cur.position > prev.position ? cur : prev) : cur
      }, undefined)

      if (lastItem) ctx.item.position = lastItem.position + 1
      else ctx.item.position = 1
      return Ok()
    }),

    'Save list': step(async (ctx) => {
      const itemRepo = new ctx.di.ListRepository(injection)
      return (ctx.ret = await itemRepo.save(ctx.item))
    }),
  })
