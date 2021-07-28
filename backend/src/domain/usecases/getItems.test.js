const { getItems } = require('./getItems')
const { Ok } = require('@herbsjs/herbs')
const assert = require('assert')


describe('Get Items', () => {

    it('return all Items', async() => {
        // Given
        const injection = {
            ItemRepository: class ItemRepository {
                async findAll(ids) { return Ok([]) }
            }
        }
        const user = { canGetItems: true }
        const req = { ids: [] }

        // When
        const uc = getItems(injection)
        await uc.authorize(user)
        const ret = await uc.run({ ids: req.ids })

        // Then
        assert.ok(ret.isOk)
    })

    it('should find Item by ID', async() => {
        // Given
        const injection = {
            ItemRepository: class ItemRepository {
                async find(where) { return Ok([{ id: 1 }]) }
            }
        }
        const user = { canGetItems: true }
        const req = { ids: [1, 2] }

        // When
        const uc = getItems(injection)
        await uc.authorize(user)
        const ret = await uc.run({ ids: req.ids })

        // Then
        assert.ok(ret.isOk)
        assert.strictEqual(ret.ok[0].id, 1)
    })

    it('should not find Item by ID if it does not exist', async() => {
        // Given
        const injection = {
            ItemRepository: class ItemRepository {
                async find(where) { return Ok([]) }
            }
        }
        const user = { canGetItems: true }
        const req = { ids: [1, 2] }

        // When
        const uc = getItems(injection)
        await uc.authorize(user)
        const ret = await uc.run({ ids: req.ids })

        // Then
        assert.ok(ret.isOk)
        assert.strictEqual(ret.ok.length, 0)
    })

})