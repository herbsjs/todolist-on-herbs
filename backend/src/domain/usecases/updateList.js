const { Ok, Err, usecase, step } = require('buchu')
const { TodoList } = require('../../domain/entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.updateList = injection =>
  usecase('Update List', {
    request: { id: Number, name: String },

    response: TodoList,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: user => (user.canUpdateList ? Ok() : Err()),

    'Retrieve list': step(async ctx => {
      const listRepo = new ctx.di.ListRepository(injection)
      const ret = await listRepo.getByIDs([ctx.req.id])
      if (ret.isErr) return ret
      const list = (ctx.list = ret.ok[0])
      if (list) return Ok(list)
      return Err(`List not found - ID: "${ctx.req.id}"`)
    }),

    'Check if it is valid list': step(ctx => {
      const list = ctx.list
      list.name = ctx.req.name
      return list.isValid() ? Ok() : Err(list.errors)
    }),

    'Update list': step(async ctx => {
      const listRepo = new ctx.di.ListRepository(injection)
      return (ctx.ret = await listRepo.save(ctx.list))
    }),
  })
