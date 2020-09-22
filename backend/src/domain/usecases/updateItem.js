const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { Item } = require('../entities/item')

const dependency = {
  ItemListRepository: require('../../infra/repositories/itemRepository'),
}

module.exports.updateItem = (injection) =>
  usecase('update Item', {
    request: {
      id: Number,
      description: String,
      isDone: Boolean,
      position: Number
    },

    authorize: (user) => (user.canUpdateItem ? Ok() : Err()),

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    'Get the old item from the repository': step(async (ctx) => {
      const itemRepo = new ctx.di.ItemListRepository(injection)
      const repoResult = await itemRepo.getItemByID(ctx.req.id)

      if(repoResult.isErr) return Err(`Item not found - ID: "${ctx.req.id}"`)

      ctx.req.oldItem = repoResult.ok
      return Ok()
    }),

    'Update item entity': step((ctx) => {
      const oldItem = Item.fromJSON({ ...ctx.req.oldItem })

      oldItem.position = ctx.req.position || oldItem.position
      oldItem.description = ctx.req.description || oldItem.description
      oldItem.isDone = ctx.req.isDone || oldItem.isDone

      ctx.ret.updatedItem = oldItem
      return Ok()
    }),

    'Check if updated item is valid': step((ctx) => {
      return ctx.ret.updatedItem.isValid()
        ? Ok()
        : Err(ctx.ret.updatedItem.errors)
    }),

    'Check if is necessary update tasks positions': ifElse({
      'Check if position as been changed': step((ctx) => {
        return Ok(ctx.req.position !== ctx.req.oldItem.position)
      }),

      'Rearrange positions and save itens on repository': step(async (ctx) => {
        const itemRepo = new ctx.di.ItemListRepository(injection)
        const ret = await itemRepo.geItemByListID([ctx.req.listId])
        const itemList = ret.ok

        const itemToMove = itemList.find(
          (item) =>
            item.position === ctx.req.position &&
            item.id !== ctx.req.id
        )
        if (itemToMove) {
          itemToMove.position = ctx.req.oldItem.position
          await itemRepo.save(itemToMove)
        }

        return (ctx.ret = await itemRepo.save(ctx.ret.updatedItem))
      }),

      'Save updated item on repository': step(async (ctx) => {
        const itemRepo = new ctx.di.ItemListRepository(injection)
        return (ctx.ret = await itemRepo.save(ctx.ret.updatedItem))
      })
    })
  })
