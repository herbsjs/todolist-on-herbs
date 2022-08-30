const { Ok, Err, usecase, step, ifElse } = require('@herbsjs/herbs')
const { herbarium } = require('@herbsjs/herbarium')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/pg/listRepository'),
}

const getLists = (injection) =>
  usecase('Get Lists', {
    request: { ids: [Number] },

    response: [TodoList],

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: async (user) => (user.can.get.list ? Ok() : Err()),

    'Get List by ID or All': ifElse({
      'If it is was informed one or more IDs': step(async (ctx) => {
        return Ok(ctx.req.ids !== undefined && ctx.req.ids.length > 0)
      }),

      'Then return the all on the list': step(async (ctx) => {
        const repo = new ctx.di.ListRepository(injection)
        const list = await repo.find({ where: { id: ctx.req.ids } })
        return Ok((ctx.ret = list))
      }),

      'Else return all': step(async (ctx) => {
        const repo = new ctx.di.ListRepository(injection)
        const lists = await repo.findAll()
        return Ok((ctx.ret = lists))
      }),
    }),
  })

module.exports.getLists = herbarium.usecases
  .add(getLists, 'GetLists')
  .metadata({
    group: 'Lists',
    operation: herbarium.crud.read,
    entity: TodoList,
  }).usecase
