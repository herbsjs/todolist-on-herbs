const { getList } = require('./getList')
const { Ok } = require('buchu')
const assert = require('assert')

describe('Get List', () => {
  it('should find List by ID', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async findByID(ids) { return [{id: 1}] }
      }
    }

    const user = { canGetLists: true }
    const req = { id: 1 }

    // When
    const uc = getList(injection)
    uc.authorize(user)
    const ret = await uc.run({ id: req.id })

    // Then
    assert.ok(ret.isOk)
    assert.strictEqual(ret.ok.id, 1)
  })

  it('should not find List by ID if it does not exist', async () => {
    // Given
    const injection = {
      ListRepository: class ListRepository {
        async findByID(ids) { return Ok([]) }
      }
    }

    const user = { canGetLists: true }
    const req = { id: 1 }

    // When
    const uc = getList(injection)
    uc.authorize(user)
    const ret = await uc.run({ id: req.id })

    // Then
    assert.ok(ret.isErr)
    assert.strictEqual(ret.err, 'List ID 1 does not exist')
  })
})
