const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { TodoList } = require('../../domain/entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.deleteList = injection =>
  usecase('Delete Todo List', {
    request: { id: Number },

    authorize: user => (user.canDeteleList ? Ok() : Err()),

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    'Check if it is valid list': step(async ctx => {
      const listRepo = new ctx.di.ListRepository(injection)
      const ret = await listRepo.getByIDs([ctx.req.id])
      if (ret.isErr) return ret
      const list = (ctx.list = ret.ok[0])
      if (list) return Ok(list)
    }),

    'Delete list': step(async ctx => {
      const listRepo = new ctx.di.ListRepository(injection)
      const ret = await listRepo.deleteByIDs([ctx.req.id])
      if (ret.isErr) return ret
      const allLists = (ctx.list = ret.ok)
      return (ctx.ret = allLists)
    })

  })
