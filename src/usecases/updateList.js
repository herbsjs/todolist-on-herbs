const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ListRepository: require('../repositories/listRepository'),
}

module.exports.updateList = injection =>
  usecase('Update Todo List', {
    request: { id: Number, name: String },

    authorize: user => (user.canCreateList ? Ok() : Err()),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

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
