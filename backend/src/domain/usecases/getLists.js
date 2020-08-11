const { Ok, Err, usecase, step } = require('buchu')

const dependency = {
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.getLists = injection =>
  usecase('Get Todo Lists', {
    request: { ids: Array },

    authorize: user => (user.canGetLists ? Ok() : Err()),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    'Get lists': step(async ctx => {
      const listRepo = new ctx.di.ListRepository(injection)

      if (ctx.req.ids.length > 0) {
        ctx.ret = await listRepo.getByIDs(ctx.req.ids)
      }
      else {
        ctx.ret = await listRepo.getAll()
      }

      return ctx.ret
    }),
  })
