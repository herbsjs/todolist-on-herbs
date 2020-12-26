const { deleteList } = require('./deleteList')
const { Ok, Err } = require('buchu')
const assert = require('assert')
const { TodoList } = require('../entities/todoList')


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

            const user = { canDeleteList: true }
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
                    async getByIDs(ids) { return Err(`List not found - ID: "2"`) }
                }
            }
            const user = { canDeleteList: true }
            const req = { id: 2 }

            // When
            const uc = deleteList(injection)
            uc.authorize(user)
            const ret = await uc.run({ id: req.id })

            // Then
            assert.ok(!ret.isOk)
            assert.ok(ret.err == 'List not found - ID: "2"')
        })

        it('Should throws some error on repository to delete list', async () => {
            // Given
            const injection = {
                ListRepository: class ListRepository {
                    async getByIDs(ids) { return Ok([new TodoList({ id: 1, name: 'todo-list-1' })]) }
                    async deleteByIDs(ids) { return Err("Some error") }

                }
            }
            const user = { canDeleteList: true }
            const req = { id: 2 }

            // When
            const uc = deleteList(injection)
            uc.authorize(user)
            const ret = await uc.run({ id: req.id })

            // Then
            assert.ok(!ret.isOk)
            assert.ok(ret.err == 'Some error')
        })
    })
})


