const createListGQL = require('./createList')
const assert = require('assert')
const { Ok, Err } = require('buchu')
const { UserInputError } = require('apollo-server-express')

describe('GraphQL - Mutations', () => {

    describe('createList mutation', () => {

        it('should create a list', async () => {
            // Given
            const listName = 'List 432'
            const injection = {
                createList: (injection) => {
                    return {
                        authorize() { return true },
                        async run() { return Ok({ name: listName }) }
                    }
                }
            }
            const createList = createListGQL.Mutation.createList

            // When
            const ret = await createList(null, { injection, name: listName })

            // Then
            assert.deepEqual(ret.name, listName)

        })

        it('should not create a list', async () => {
            // Given
            const listName = 'List 432'
            const error = { errorTest: true }
            const injection = {
                createList: (injection) => {
                    return {
                        authorize() { return true },
                        async run() { return Err(error) }
                    }
                }
            }
            const createList = createListGQL.Mutation.createList

            // When
            const ret = async () => await createList(null, { injection, name: listName })

            // Then
            await assert.rejects(ret, new UserInputError(null, { invalidArgs: error }),)
        })
    })
})


