const createItemGQL = require('./createItem')
const assert = require('assert')
const { Ok, Err } = require('buchu')
const { UserInputError } = require('apollo-server-express')

describe('GraphQL - Mutations', () => {
  describe('createItem mutation', () => {
    it('should create TO DO item', async () => {
      // Given
      const itemDescription = 'Item on list'
      const itemlistId = 1022020
      const injection = {
        createItem: (injection) => {
          return {
            authorize() {
              return true
            },
            async run() {
              return Ok({
                id: Math.random(),
                description: itemDescription,
                isDone: false,
                position: 1,
                listId: itemlistId,
              })
            },
          }
        },
      }
      const createItem = createItemGQL[1].Mutation.createItem

      // When
      const ret = await createItem(null, { injection, description: itemDescription, listId: itemlistId }, { user: {} })

      // Then
      assert.deepEqual(ret.description, itemDescription)
    })

    it('should not create a item', async () => {
      // Given
      const itemDescription = 'Item on list'
      const itemlistId = 1022020
      const error = { errorTest: true }
      const injection = {
        createItem: (injection) => {
          return {
            authorize() {
              return true
            },
            async run() {
              return Err(error)
            },
          }
        },
      }
      const createItem = createItemGQL[1].Mutation.createItem

      // When
      const ret = async () =>
        await createItem(null,
          {
            injection,
            description: itemDescription,
            listId: itemlistId,
          },
          { user: {} })

      // Then
      await assert.rejects(
        ret,
        new UserInputError(null, { invalidArgs: error })
      )
    })
  })
})
