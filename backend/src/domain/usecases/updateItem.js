const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { Item } = require('../entities/item')

const dependency = {
  ItemListRepository: require('../../infra/repositories/itemRepository'),
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

    'Retrieve the previous item from the repository': step(async (ctx) => {
      const itemRepo = new ctx.di.ItemListRepository(injection)
      const repoResult = await itemRepo.getItemByID(ctx.req.id)

      if (repoResult.isErr) return Err(`Item not found - ID: "${ctx.req.id}"`)

      ctx.req.oldItem = repoResult.ok
      return Ok()
    }),

    'Update temporary item': step((ctx) => {
      const oldItem = Item.fromJSON({ ...ctx.req.oldItem })

      oldItem.position = ctx.req.position || oldItem.position
      oldItem.description = ctx.req.description || oldItem.description
      oldItem.isDone = ctx.req.isDone || oldItem.isDone

      ctx.ret.updatedItem = oldItem
      return Ok()
    }),

    'Check if temporary item is valid': step((ctx) => {
      return ctx.ret.updatedItem.isValid()
        ? Ok()
        : Err(ctx.ret.updatedItem.errors)
    }),

    'Check if is necessary to update tasks positions': ifElse({
      'If position has been changed': step((ctx) => {
        return Ok(ctx.req.position !== ctx.req.oldItem.position)
      }),

      'Then rearrange positions and save itens on repository': step(async (ctx) => {
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

      'Else save updated item on repository': step(async (ctx) => {
        const itemRepo = new ctx.di.ItemListRepository(injection)
        return (ctx.ret = await itemRepo.save(ctx.ret.updatedItem))
      }),



    }),

  })
