const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.getLists = injection =>
  usecase('Get Lists', {
    request: { ids: [Number] },

    response: [TodoList],

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: user => (user.canGetLists ? Ok() : Err()),

    'Get List by ID or All': ifElse({

      'If there is just an ID': step(async (ctx) => {
        ctx.listRepo = new ctx.di.ListRepository(injection)
        return Ok(ctx.req.ids.length > 0)
      }),

      'Then get just one list': step(async (ctx) => {
        ctx.ret = await ctx.listRepo.getByIDs(ctx.req.ids)
        return Ok()
      }),

      'Else get all on the list': step(async (ctx) => {
        ctx.ret = await ctx.listRepo.getAll()
        return Ok()
      })

    })
  })
