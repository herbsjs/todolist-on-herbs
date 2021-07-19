const { deleteItem } = require('./deleteItem')
const assert = require('assert')
const { Item } = require('../entities/item')


describe('Delete Items', () => {

    it('should delete Item', async() => {
        // Given
        const injection = {
            ItemRepository: class ItemRepository {
                async find(where) { return [new Item({ id: 1, description: `graduate in college` })] }
                async delete(ids) { return true }
            }
        }

        const user = { canDeleteItem: true }
        const req = { id: 1 }

        // When
        const uc = deleteItem(injection)
        await uc.authorize(user)
        const ret = await uc.run({ id: req.id })

        // Then
        assert.ok(ret.isOk)
    })

    it('should not delete Item if the Item does not exist', async() => {
        // Given
        const injection = {
            ItemRepository: class ItemRepository {
                async find(where) { return [] }
            }
        }
        const user = { canDeleteItem: true }
        const req = { id: 2 }

        // When
        const uc = deleteItem(injection)
        await uc.authorize(user)
        const ret = await uc.run({ id: req.id })

        // Then
        assert.ok(!ret.isOk)
        assert.strictEqual(ret.err, 'Item ID 2 does not exist')
    })
})