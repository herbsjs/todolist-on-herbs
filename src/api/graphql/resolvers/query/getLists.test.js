const getListsGQL = require('./getLists')
const assert = require('assert')
const { Ok, Err } = require('buchu')
const { UserInputError } = require('apollo-server-express')

describe('GraphQL - Query', () => {

    describe('getList query', () => {

        it('should get lists', async () => {
            // Given
            const ids = [2344]
            const listName = 'List 431'
            const injection = {
                getLists: (injection) => {
                    return {
                        authorize() { return true },
                        async run() { return Ok([{ id: ids[0], name: listName }]) }
                    }
                }
            }
            const getLists = getListsGQL.Query.getLists

            // When
            const ret = await getLists(null, { injection, ids })

            // Then
            assert.deepEqual(ret, [{ id: ids[0], name: listName }])

        })

        it('should not get lists', async () => {
            // Given
            const ids = [2344]
            const error = { errorTest: true }
            const injection = {
                getLists: (injection) => {
                    return {
                        authorize() { return true },
                        async run() { return Err(error) }
                    }
                }
            }
            const getLists = getListsGQL.Query.getLists

            // When
            const ret = async () => await getLists(null, { injection, ids })

            // Then
            await assert.rejects(ret, new UserInputError(null, { invalidArgs: error }),)
        })
    })
})


