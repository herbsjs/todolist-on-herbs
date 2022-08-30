const { Ok, Err, usecase, step } = require('@herbsjs/herbs')
const { herbarium } = require('@herbsjs/herbarium')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/db/listRepository'),
}

const createList = injection =>
  usecase('Create List', {
    request: { name: String },

    response: TodoList,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: async user => (user.can.create.list ? Ok() : Err()),

    'Check if the List is valid': step(ctx => {
      const list = ctx.list = new TodoList()
      list.id = Math.floor(Math.random() * 100000)
      list.name = ctx.req.name

      if (!list.isValid()) return Err.invalidEntity({
        message: `List is invalid`,
        payload: { entity: 'list' },
        cause: JSON.stringify(list.errors)
      })

      return Ok()
    }),

    'Save the List': step(async ctx => {
      const repo = new ctx.di.ListRepository(injection)
      ctx.ret = await repo.insert(ctx.list)
      return ctx.ret
    }),
  })

module.exports.createList =
  herbarium.usecases
    .add(createList, 'CreateList')
    .metadata({ group: 'Lists', operation: herbarium.crud.create, entity: TodoList })
    .usecase
