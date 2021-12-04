const { deleteItem } = require('./deleteItem')
const assert = require('assert')
const { Item } = require('../entities/item')


describe('Delete Items', () => {

    it('should delete Item', async() => {
        const item = new Item()
        item.id = 1
        item.description = 'graduate in college'

        // Given
        const injection = {
            ItemRepository: class ItemRepository {
                async find(where) { return [item] }
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
                async delete(ids) { return true }
            }
        }
        const user = { canDeleteItem: true }
        const req = { id: 2 }

        // When
        const uc = deleteItem(injection)
        await uc.authorize(user)
        const ret = await uc.run({ id: req.id })

        // Then
        assert.ok(ret.isErr)
        assert.strictEqual(ret.err.message, 'Item ID 2 does not exist')
        assert.strictEqual(ret.isNotFoundError, true)
    })
})
