const { deleteList } = require('./deleteList')
const { Ok, Err } = require('buchu')
const assert = require('assert')

describe('Delete Todo Lists', () => {

    describe('Get Lists', () => {

        it('Should Delete List', async () => {
            // Given
            const injection = {
                ListRepository: class ListRepository {
                    async getByIDs(ids) { return Ok([new TodoList({ id: 1, name: 'todo-list-1' })]) }
                    async deleteByIDs(ids) { return Ok([new TodoList()]) }
                }
            }

            const user = { canDeteleList: true }
            const req = { id: 1 }

            // When
            const uc = deleteList(injection)
            uc.authorize(user)
            const ret = await uc.run({ id: req.id })

            // Then
            assert.ok(ret.isOk)
        })

        it('Should Not Delete List If the List Is Not Found', async () => {
            // Given
            const injection = {
                ListRepository: class ListRepository {
                    async getByIDs(ids) { return Ok([new TodoList({ id: 1, name: 'todo-list-1' })]) }
                }
            }
            const user = { canDeteleList: true }
            const req = { id: 2 }

            // When
            const uc = deleteList(injection)
            uc.authorize(user)
            const ret = await uc.run({ id: req.id })

            // Then
            assert.ok(!ret.isOk)
            assert.ok(ret.err == 'List not found - ID: "2"')
        })
    })
})


