const assert = require('assert')
const { updateList } = require('./updateList')
const { TodoList } = require('../entities/todoList')

describe('Update Lists', () => {

  it('should Update List', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async find(where) { return [TodoList.fromJSON({ id: 1, name: `Things I must do` })] }
        async update(list) { return list }
      }
    }
    const user = { canUpdateList: true }
    const req = { id: 1, name: `Things I must learn` }

    // When
    const uc = updateList(injection)
    await uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(ret.isOk)
    assert.strictEqual(ret.ok.id, 1)
  })

  it('should not update List if the List does not exist', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async find(where) { return [] }
      }
    }
    const user = { canUpdateList: true }
    const req = { id: 1, name: `Should make this year` }

    // When
    const uc = updateList(injection)
    await uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(!ret.isOk)
    assert.deepStrictEqual(ret.err, `List not found - ID: 1`)
  })

  it('should not update if List is invalid', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async find(where) { return [TodoList.fromJSON({ id: 1, name: `Must have` })] }
      }
    }
    const user = { canUpdateList: true }
    const req = { id: 1, name: 'Li' }

    // When
    const uc = updateList(injection)
    await uc.authorize(user)
    const ret = await uc.run({ id: req.id, name: req.name })

    // Then
    assert.ok(ret.isErr && ret.err.name[0].isTooShort === 3)
  })

})
