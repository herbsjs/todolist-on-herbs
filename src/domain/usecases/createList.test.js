const { createList } = require('./createList')
const { Ok } = require('@herbsjs/herbs')
const assert = require('assert')

describe('Create List', () => {

    function aUser({ hasAccess }) {
        return { canCreateList: hasAccess }
    }

    describe('Valid List', () => {

        it('should create List ', async () => {
            // Given
            const injection = {
                ListRepository: class ListRepository {
                    async insert(list) { return list }
                }
            }
            const user = aUser({ hasAccess: true })
            const req = { name: `Amazing List` }

            // When
            const uc = createList(injection)
            await uc.authorize(user)
            const ret = await uc.run({ name: req.name })

            // Then
            assert.ok(ret.isOk)
            assert.deepStrictEqual(ret.ok.toJSON(), { id: ret.ok.id, items: [], name: `Amazing List` })
        })
    })

    describe('Invalid List', () => {

        it('should not create List', async () => {
            // Given
            const injection = {}
            const user = aUser({ hasAccess: true })
            const req = { name: "" }

            // When
            const uc = createList(injection)
            await uc.authorize(user)
            const ret = await uc.run({ name: req.name })

            // Then
            assert.ok(ret.isErr)
            assert.deepStrictEqual(ret.err.message, 'List is invalid')
            assert.deepStrictEqual(ret.isInvalidEntityError, true)
        })
    })
})


