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

    authorize: (user) => (user.canAddItem ? Ok() : Err()),

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    'Get old item': step(async (ctx) => {
      const itemListRepo = new ctx.di.ItemListRepository(injection)
      const oldItem = (ctx.req.oldItem = (await itemListRepo.getItemByID(ctx.req.id)).ok)

      if(!oldItem)
        return Err(`Item not found - ID: "${ctx.req.id}"`)

      return Ok()
    }),

    'Update item': step((ctx) => {
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
        if (ctx.req.position !== ctx.req.oldItem.position) {
          return Ok(true)
        } else {
          return Ok(false)
        }
      }),

      'Rearrange positions and save itens': step(async (ctx) => {
        const listRepo = new ctx.di.ItemListRepository(injection)
        const ret = await listRepo.geItemByListID([ctx.req.idList])
        const itemList = ret.ok

        const itemEqualPosition = itemList.find(
          (item) =>
            item.position === ctx.req.position &&
            item.id !== ctx.req.id
        )
        if (itemEqualPosition) {
          itemEqualPosition.position = ctx.req.oldItem.position
          await listRepo.save(itemEqualPosition)
        }

        return (ctx.ret = await listRepo.save(ctx.ret.updatedItem))
      }),

      'Save updated item': step(async (ctx) => {
        const listRepo = new ctx.di.ItemListRepository(injection)
        return (ctx.ret = await listRepo.save(ctx.ret.updatedItem))
      })
    })
  })
