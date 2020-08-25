const { Ok, Err, usecase, step, ifElse } = require('buchu')

const dependency = {
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.getLists = injection =>
  usecase('Get Todo Lists', {
    request: { ids: Array },

    authorize: user => (user.canGetLists ? Ok() : Err()),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    'Create new instance of todo repository': step(async ctx => {
      ctx.listRepo = new ctx.di.ListRepository(injection)
      return Ok();
    }),
    'Get todos by Id or get all': ifElse({

      'If the id exists': step(async (ctx) => {
        if (ctx.req.ids.length > 0) {
          return Ok()
        }
      }),

      'Then: Get By Id': step(async (ctx) => {
        return await ctx.listRepo.getByIDs(ctx.req.ids)
      }),

      'Else: Get All': step(async (ctx) => {
        return await ctx.listRepo.getAll()
      })
    })
  })
