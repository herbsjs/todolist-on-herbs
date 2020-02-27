const { getLists } = require('./getLists')
const { Ok, Err } = require('buchu')
const assert = require('assert')

describe('Get Todo Lists', () => {

    function aUser({ hasAccess }) {
        return { canCreateList: hasAccess }
    }

    describe('Get Lists', () => {

        it('All', async () => {
            // Given
            const injection = {
                ListRepository: class ListRepository {
                    getByIDs(ids) { return Ok([]) }
                }
            }
            const user = aUser({ hasAccess: true })
            const req = { ids: [] }

            // When
            const uc = getLists(injection)
            uc.authorize(user)
            const ret = await uc.run({ ids: req.ids })

            // Then
            assert.ok(ret.isOk)
        })
    })
})


