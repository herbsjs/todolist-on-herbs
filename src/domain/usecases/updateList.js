const { Ok, Err, usecase, step } = require('@herbsjs/herbs')
const { TodoList } = require('../../domain/entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/pg/listRepository'),
}

module.exports.updateList = injection =>
  usecase('Update List', {
    request: { id: Number, name: String },

    response: TodoList,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: async user => (user.canUpdateList ? Ok() : Err()),

    'Retrieve the List': step(async ctx => {
      const repo = new ctx.di.ListRepository(injection)
      const ret = await repo.find({ where: { id: [ctx.req.id] } })
      const list = (ctx.list = ret[0])
      if (list === undefined) return Err.notFound({
        message: `List not found - ID: ${ctx.req.id}`,
        payload: { entity: 'list' }
      })

      return Ok(list)
    }),

    'Check if it is a valid List before update': step(ctx => {
      const list = ctx.list
      list.name = ctx.req.name
      return list.isValid() ? Ok() : Err.invalidEntity({
        message: `List is invalid`,
        payload: { entity: 'list' },
        cause: list.errors
      })
    }),

    'Update the List': step(async ctx => {
      const repo = new ctx.di.ListRepository(injection)
      return (ctx.ret = await repo.update(ctx.list))
    }),
  })
