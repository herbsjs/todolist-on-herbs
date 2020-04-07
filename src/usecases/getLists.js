const { Ok, Err, usecase, step, ifElse } = require('buchu')

const dependency = {
  ListRepository: require('../repositories/listRepository'),
}

module.exports.getLists = injection =>
  usecase('Get Todo Lists', {
    request: { ids: Array },

    authorize: user => (user.canGetLists ? Ok() : Err()),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    'Get lists': step(async ctx => {
      const listRepo = new ctx.di.ListRepository(injection)
      return (ctx.ret = await listRepo.getByIDs(ctx.req.ids))
    }),
  })
