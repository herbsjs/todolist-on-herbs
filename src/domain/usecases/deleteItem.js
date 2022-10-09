const { Ok, Err, usecase, step } = require('@herbsjs/herbs')
const { herbarium } = require('@herbsjs/herbarium')
const { Item } = require('../entities/item')

const dependency = {
    ItemRepository: require('../../infra/repositories/db/itemRepository'),
}

const deleteItem = injection =>
    usecase('Delete Item', {
        request: { id: Number },

        response: Boolean,

        setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

        authorize: async user => (user.can.delete.item ? Ok() : Err()),

        'Check if the Item exist': step(async ctx => {
            const repo = new ctx.di.ItemRepository(injection)
            const ret = await repo.find({ where: { id: [ctx.req.id] } })
            const item = ctx.item = ret

            if (item && item.length > 0) return Ok()
            return Err.notFound({
                message: `Item ID ${ctx.req.id} does not exist`,
                payload: { entity: 'item' }
            })
        }),

        'Delete the Item': step(async ctx => {
            const repo = new ctx.di.ItemRepository(injection)
            const item = ctx.item
            const ret = await repo.delete(item)
            return Ok(ctx.ret = ret)
        })

    })

module.exports.deleteItem =
    herbarium.usecases
        .add(deleteItem, 'DeleteItem')
        .metadata({ group: 'Items', operation: herbarium.crud.delete, entity: Item })
        .usecase