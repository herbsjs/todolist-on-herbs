const { Ok, Err, usecase, step, ifElse } = require('@herbsjs/herbs')
const { herbarium } = require('@herbsjs/herbarium')
const { TodoList } = require('../entities/todoList')

const dependency = {
  ListRepository: require('../../infra/repositories/pg/listRepository'),
  ItemRepository: require('../../infra/repositories/pg/itemRepository')
}

const getLists = injection =>
  usecase('Get Lists', {
    request: { ids: [Number] },

    response: [TodoList],

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: async user => (user.canGetLists ? Ok() : Err()),

    'Get List by ID or All': ifElse({

      'If it is was informed one or more IDs': step(async (ctx) => {
        return Ok(ctx.req.ids !== undefined && ctx.req.ids.length > 0)
      }),

      'Then return the all on the list': step(async (ctx) => {
        const repo = new ctx.di.ListRepository(injection)
        const list = await repo.find({ where: { id: ctx.req.ids } })
        return Ok(ctx.ret = list)
      }),

      'Else return all': step(async (ctx) => {
        const listRepo = new ctx.di.ListRepository(injection)
        const itemRepo = new ctx.di.ItemRepository(injection)
        const lists = await listRepo.findAll()
        const listWithItens = []
        for (let index = 0; index < lists.length; index++) {
          const list = lists[index]
          list.items = (await itemRepo.find({ where: {list_id: list.id} }))
          listWithItens.push(list)
        }
        return Ok(ctx.ret = listWithItens)
      })
    })
  })


module.exports.getLists =
  herbarium.usecases
    .add(getLists, 'GetLists')
    .metadata({ group: 'Lists', operation: herbarium.crud.read, entity: TodoList })
    .usecase