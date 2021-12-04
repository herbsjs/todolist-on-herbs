const { Ok, Err, usecase, step, ifElse } = require('@herbsjs/herbs')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/pg/listRepository'),
}

module.exports.deleteList = injection =>
  usecase('Delete List', {
    request: { id: Number },

    response: Boolean,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: async user => (user.canDeleteList ? Ok() : Err()),

    'Check if the List exist': step(async ctx => {
      const repo = new ctx.di.ListRepository(injection)
      const ret = await repo.find({ where: { id: [ctx.req.id] } })
      const list = ctx.list = ret[0]
      if (list === undefined) return Err.notFound({
        message: `List ID ${ctx.req.id} does not exist`,
        payload: { entity: 'list' }
      })
      return Ok()
    }),

    'Delete the List': step(async ctx => {
      const repo = new ctx.di.ListRepository(injection)
      const list = ctx.list
      const ret = await repo.delete(list)
      return Ok(ctx.ret = ret)
    })

  })
