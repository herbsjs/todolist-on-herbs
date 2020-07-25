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
          return Ok([new TodoList()])
        }
        async save(list) {
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
    assert.ok(ret.isOk)
  });

  it('Should Update List', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async getByIDs(ids) { return Ok([new TodoList({ id: 1, name: "Previous Name" })]) }
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
        async getByIDs(ids) { return Ok([]) }
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
          return Ok([])
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
          return Ok([new TodoList()])
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
          return Ok([new TodoList()])
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
});

