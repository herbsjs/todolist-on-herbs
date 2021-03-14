const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { Item } = require('../entities/item')

const dependency = {
  ItemRepository: require('../../infra/repositories/pg/itemRepository'),
}

module.exports.updateItem = (injection) =>
  usecase('Update Item', {
    request: {
      id: Number,
      description: String,
      isDone: Boolean,
      position: Number
    },

    response: Item,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: (user) => (user.canUpdateItem ? Ok() : Err()),

    'Retrieve the previous Item from the repository': step(async (ctx) => {
      const req = ctx.req
      const repo = new ctx.di.ItemRepository(injection)
      const ret = await repo.findByID(req.id)
      const item = (ctx.item = ret[0])
      if (item === undefined) return Err(`Item not found - ID: ${req.id}`)
      return Ok(item)
    }),

    'Check if it is a valid Item before update': step((ctx) => {
      const req = ctx.req
      const item = ctx.item

      ctx.hasChangedPosition = (item.position !== req.position)
      ctx.oldPosition = item.position

      item.id = req.id
      item.description = req.description
      item.isDone = req.isDone
      item.position = req.position

      return item.isValid() ? Ok() : Err(item.errors)
    }),

    'Check if is necessary to update tasks positions': ifElse({
      'If position has changed': step((ctx) => {
        return Ok(ctx.hasChangedPosition)
      }),

      'Then rearrange positions and save itens on repository': step(async (ctx) => {
        const req = ctx.req
        const item = ctx.item
        const repo = new ctx.di.ItemRepository(injection)
        const itemList = await repo.findBy({ listId: item.listId })

        const itemToMove = itemList.find((item) => item.id !== req.id && item.position === req.position)

        if (itemToMove) {
          itemToMove.position = ctx.oldPosition
          await repo.update(itemToMove)
        }

        return (ctx.ret = await repo.update(ctx.item))
      }),

      'Else save updated item on repository': step(async (ctx) => {
        const repo = new ctx.di.ItemRepository(injection)
        return (ctx.ret = await repo.update(ctx.item))
      }),



    }),

  })
