const { Ok, Err, usecase, step } = require('buchu')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/pg/listRepository'),
}

module.exports.getList = injection =>
  usecase('Get List', {
    request: { id: Number },

    response: [TodoList],

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: user => (user.canGetLists ? Ok() : Err()),

    'Get List by ID': step(async ctx => {
      const { id } = ctx.req

      const repo = new ctx.di.ListRepository(injection)
      const ret = await repo.findByID([id])

      if (ret === undefined || ret[0] === undefined)
        return Err(`List ID ${id} does not exist`)

      ctx.ret = ret[0]

      return Ok()
    })
  })
