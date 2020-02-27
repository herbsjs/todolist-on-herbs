const { updateList } = require('./updateList')
const { Ok, Err } = require('buchu')
const assert = require('assert')
const { TodoList } = require('../entities/todoList')


describe('Update Todo List', () => {

    function aUser({ hasAccess }) {
        return { canCreateList: hasAccess }
    }

    describe('Update Lists', () => {

        it('Should Update List', async () => {
            // Given
            const injection = {
                ListRepository: class ListRepository {
                    getByIDs(ids) { return Ok([new TodoList()]) }
                    save(list) { return Ok(list) }
                }
            }
            const user = aUser({ hasAccess: true })
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
                    getByIDs(ids) { return Ok([]) }
                }
            }
            const user = aUser({ hasAccess: true })
            const req = { id: 1, name: "New Name" }

            // When
            const uc = updateList(injection)
            uc.authorize(user)
            const ret = await uc.run({ id: req.id, name: req.name })

            // Then
            assert.ok(!ret.isOk)
            assert.ok(ret.err == 'List not found - ID: "1"')
        })
    })
})


