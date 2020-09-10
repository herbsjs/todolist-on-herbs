const { getLists } = require('./getLists')
const { Ok } = require('buchu')
const assert = require('assert')

describe('Get Todo Lists', () => {

    describe('Get Lists', () => {

        it('All Lists', async () => {
            // Given
            const injection = {
                ListRepository: class ListRepository {
                    async getAll(ids) { return Ok([]) }
                }
            }
            const user = { canGetLists: true }
            const req = { ids: [] }

            // When
            const uc = getLists(injection)
            uc.authorize(user)
            const ret = await uc.run({ ids: req.ids })

            // Then
            assert.ok(ret.isOk)
        })

        it('Filter todo by ids', async () => {
            // Given
            const injection = {
                ListRepository: class ListRepository {
                    async getByIDs(ids) { return Ok([]) }
                }
            }
            const user = { canGetLists: true }
            const req = { ids: [1, 2] }

            // When
            const uc = getLists(injection)
            uc.authorize(user)
            const ret = await uc.run({ ids: req.ids })

            // Then
            assert.ok(ret.isOk)
        })
    })
})


