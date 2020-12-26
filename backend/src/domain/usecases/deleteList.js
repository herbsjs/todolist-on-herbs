const { Ok, Err, usecase, step, ifElse } = require('buchu')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/listRepository'),
}

module.exports.deleteList = injection =>
  usecase('Delete List', {
    request: { id: Number },
    
    response: TodoList,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: user => (user.canDeleteList ? Ok() : Err()),

    'Check if it is valid list': step(async ctx => {
      const listRepo = new ctx.di.ListRepository(injection)

      const ret = await listRepo.getByIDs([ctx.req.id])
      if (ret.isErr) return ret

      const list = ctx.list = ret.ok[0]
      return list
        ? Ok(list)
        : Err(`List ID ${ctx.req.id} does not exist`)
    }),

    'Delete list': step(async ctx => {
      const listRepo = new ctx.di.ListRepository(injection)
      const ret = await listRepo.deleteByIDs([ctx.req.id])
      if (ret.isErr) return ret
      const allLists = ctx.list = ret.ok
      return (ctx.ret = allLists)
    })

  })
