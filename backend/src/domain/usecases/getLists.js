const { Ok, Err, usecase, step, ifElse } = require('buchu')

const dependency = {
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.getLists = injection =>
  usecase('Get Todo Lists', {
    request: { ids: Array },

    authorize: user => (user.canGetLists ? Ok() : Err()),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

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
