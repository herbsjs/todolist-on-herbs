const { deleteList } = require('./deleteList')
const { Ok, Err } = require('@herbsjs/herbs')
const assert = require('assert')
const { TodoList } = require('../entities/todoList')


describe('Delete Todo Lists', () => {

    it('should delete List', async () => {
        // Given
        const injection = {
            ListRepository: class ListRepository {
                async find(where) { return [new TodoList({ id: 1, name: `Goals for this year` })] }
                async delete(ids) { return true }
            }
        }

        const user = { canDeleteList: true }
        const req = { id: 1 }

        // When
        const uc = deleteList(injection)
        await uc.authorize(user)
        const ret = await uc.run({ id: req.id })

        // Then
        assert.ok(ret.isOk)
    })

    it('should not delete List if the List does not exist', async () => {
        // Given
        const injection = {
            ListRepository: class ListRepository {
                async find(where) { return [] }
            }
        }
        const user = { canDeleteList: true }
        const req = { id: 2 }

        // When
        const uc = deleteList(injection)
        await uc.authorize(user)
        const ret = await uc.run({ id: req.id })

        // Then
        assert.ok(ret.isErr)
        assert.strictEqual(ret.err.message, 'List ID 2 does not exist')
        assert.strictEqual(ret.isNotFoundError, true)
    })
})


