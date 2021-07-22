const { Ok, Err, usecase, step, ifElse } = require('@herbsjs/herbs')
const { Item } = require('../entities/item')

const dependency = {
    ItemRepository: require('../../infra/repositories/pg/itemRepository'),
    ListRepository: require('../../infra/repositories/pg/listRepository'),
}

module.exports.getItems = (injection) =>
    usecase('Get Items', {
        request: { ids: [Number] },

        response: [Item],

        setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

        authorize: async(user) => (user.canGetItems ? Ok() : Err()),

        'Get Item by ID or All': ifElse({
            'If one or more IDs were provided': step(async(ctx) => {
                return Ok(!!ctx.req.ids && ctx.req.ids.length > 0)
            }),

            'Then return the itens': step(async(ctx) => {
                const repo = new ctx.di.ItemRepository(injection)
                const item = await repo.find({ where: { id: ctx.req.ids } })

                return Ok(ctx.ret = item)
            }),

            'Else return all': step(async(ctx) => {
                const repo = new ctx.di.ItemRepository(injection)
                const items = await repo.findAll()
                return Ok(ctx.ret = items)
            })

        }),

    })
