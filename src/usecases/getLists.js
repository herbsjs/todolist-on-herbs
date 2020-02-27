const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { TodoList } = require('../entities/todoList')

const dependency = {
    ListRepository: require('../repositories/listRepository')
}

module.exports.getLists = (injection) =>

    usecase("Create TO DO List", {

        request: { ids: Array },

        authorize: (user) => user.canCreateList ? Ok() : Err(),

        setup: (ctx) => ctx.di = Object.assign({}, dependency, injection),

        'Get lists': step(async (ctx) => {
            const listRepo = new ctx.di.ListRepository(injection)
            return ctx.ret = await listRepo.getByIDs(ctx.req.ids)
        }),
    })