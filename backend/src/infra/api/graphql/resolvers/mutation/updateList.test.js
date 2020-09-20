const updateListGQL = require('./updateList')
const assert = require('assert')
const { Ok, Err } = require('buchu')
const { UserInputError } = require('apollo-server-express')

describe('GraphQL - Mutations', () => {

    describe('updateList mutation', () => {

        it('should update a list', async () => {
            // Given
            const listId = 432
            const listName = 'List 432'
            const injection = {
                updateList: (injection) => {
                    return {
                        authorize() { return true },
                        async run() { return Ok({ id: listId, name: listName }) }
                    }
                }
            }
            const updateList = updateListGQL.Mutation.updateList

            // When
            const ret = await updateList(null, { injection, id: listId, name: listName })

            // Then
            assert.deepEqual(ret.name, listName)

        })

        it('should not update a list', async () => {
            // Given
            const listId = 32
            const listName = 'List 432'
            const error = { errorTest: true }
            const injection = {
                updateList: (injection) => {
                    return {
                        authorize() { return true },
                        async run() { return Err(error) }
                    }
                }
            }
            const updateList = updateListGQL.Mutation.updateList

            // When
            const ret = async () => await updateList(null, { injection, id: listId, name: listName })

            // Then
            await assert.rejects(ret, new UserInputError(null, { invalidArgs: error }),)
        })
    })
})


