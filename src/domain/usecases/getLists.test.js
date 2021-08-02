const { getLists } = require('./getLists')
const { Ok } = require('@herbsjs/herbs')
const assert = require('assert')

describe('Get List', () => {

    it('return all Lists', async() => {
        // Given
        const injection = {
            ListRepository: class ListRepository {
                async findAll(ids) { return Ok([]) }
            }
        }
        const user = { canGetLists: true }
        const req = { ids: [] }

        // When
        const uc = getLists(injection)
        await uc.authorize(user)
        const ret = await uc.run({ ids: req.ids })

        // Then
        assert.ok(ret.isOk)
    })

    it('should find List by ID', async() => {
        // Given
        const injection = {
            ListRepository: class ListRepository {
                async find(where) { return Ok([{ id: 1 }]) }
            }
        }
        const user = { canGetLists: true }
        const req = { ids: [1, 2] }

        // When
        const uc = getLists(injection)
        await uc.authorize(user)
        const ret = await uc.run({ ids: req.ids })

        // Then
        assert.ok(ret.isOk)
        assert.strictEqual(ret.ok[0].id, 1)
    })

    it('should not find List by ID if it does not exist', async() => {
        // Given
        const injection = {
            ListRepository: class ListRepository {
                async find(where) { return Ok([]) }
            }
        }
        const user = { canGetLists: true }
        const req = { ids: [1, 2] }

        // When
        const uc = getLists(injection)
        await uc.authorize(user)
        const ret = await uc.run({ ids: req.ids })

        // Then
        assert.ok(ret.isOk)
        assert.strictEqual(ret.ok.length, 0)
    })
})