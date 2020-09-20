const { updateList } = require('./updateList')
const { Ok, Err } = require('buchu')
const assert = require('assert')
const { TodoList } = require('../entities/todoList')

describe('Update Lists', () => {

  it('Should Update List', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async getByIDs(ids) {
          const source = [TodoList.fromJSON({ id: 1, name: "Previous Name" })]
          let list = source.filter(args => ids.includes(args.id))
          return Ok(list)
        }
        async save(list) { return Ok(list) }
      }
    }
    const user = { canUpdateList: true }
    const req = { id: 1, name: "New Name" }

    // When
    const uc = updateList(injection)
    uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(ret.isOk)
  })

  it('Should Not Update List If the List Is Not Found', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async getByIDs(ids) {
          const source = []
          let list = source.filter(args => ids.includes(args.id))
          return Ok(list)
        }
      }
    }
    const user = { canUpdateList: true }
    const req = { id: 1, name: "New Name" }

    // When
    const uc = updateList(injection)
    uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(!ret.isOk)
    assert.ok(ret.err == 'List not found - ID: "1"')
  })

  it('Should Not Update List If the List Is Not Found', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async getByIDs(ids) {
          const source = []
          let list = source.filter(args => ids.includes(args.id))
          return Ok(list)
        }
      },
    }
    const user = { canUpdateList: true }
    const req = { id: 1, name: 'New Name' }

    // When
    const uc = updateList(injection)
    uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(!ret.isOk)
    assert.ok(ret.err == 'List not found - ID: "1"')
  })

  it('Should Not Update If Invalid List Name', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async getByIDs(ids) {
          const source = [TodoList.fromJSON({ id: 1, name: "Previous Name" })]
          let list = source.filter(args => ids.includes(args.id))
          return Ok(list)
        }
        async save(list) {
          return Ok(list)
        }
      },
    }
    const user = { canUpdateList: true }
    const req = { id: 1, name: 'Ne' }

    // When
    const uc = updateList(injection)
    uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(ret.isErr && ret.err.name[0].isTooShort === 3)
  })

  it('Should Not Update If the User Does Not Have Permission', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async getByIDs(ids) {
          const source = [new TodoList()]
          let list = source.filter(args => ids.includes(args.id))
          return Ok(list)
        }
        async save(list) {
          return Ok(list)
        }
      },
    }
    const user = {}
    const req = { id: 1, name: 'New List' }

    // When
    const uc = updateList(injection)
    uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(ret.isErr && ret.err == 'Not Authorized')
  })

  it('Should Not Update If Repository Returns Error', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async getByIDs(ids) {
          if (!ids) {
            return Err('Id must have a value')
          }

          return Err('Wrong params')
        }
        async save(list) {
          return Ok(list)
        }
      },
    }
    const user = { canUpdateList: true }
    const req = { id: 1, name: 'New List' }

    // When
    const uc = updateList(injection)
    uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(ret.isErr && ret.err === 'Wrong params')
  })
})