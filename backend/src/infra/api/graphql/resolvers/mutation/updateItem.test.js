const createItemGQL = require('./updateItem')
const assert = require('assert')
const { Ok, Err } = require('buchu')
const { UserInputError } = require('apollo-server-express')

describe('GraphQL - Mutations', () => {
  describe('UpdateItem mutation', () => {
    it('should update item', async () => {
      // Given
      const itemId = Math.random()
      const itemlistId = 1022020
      const itemDescription = 'Item on list'
      const itemPosition = 1
      const itemIsDone = true

      const injection = {
        updateItem: (injection) => {
          return {
            authorize() {
              return true
            },
            async run() {
              return Ok({
                id: itemId,
                description: itemDescription,
                isDone: itemIsDone,
                position: itemPosition,
                listId: itemlistId,
              })
            },
          }
        },
      }
      const updateItem = createItemGQL.Mutation.updateItem

      // When
      const ret = await updateItem(null, {
        injection,
        description: itemDescription,
        id: itemId,
        position: itemPosition,
        isDone: itemIsDone,
      })

      // Then
      assert.deepEqual(ret.id, itemId)
    })

    it('should note update item', async () => {
      // Given
      const itemId = Math.random()
      const itemDescription = 'Item on list'
      const itemPosition = 1
      const itemIsDone = true
      const error = { errorTest: true }
      const injection = {
        updateItem: (injection) => {
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
      const updateItem = createItemGQL.Mutation.updateItem

      // When
      const ret = async () =>
       await updateItem(null, {
        injection,
        id: itemId,
        description: itemDescription,
        position: itemPosition,
        isDone: itemIsDone
      })

      // Then
      await assert.rejects(
        ret,
        new UserInputError(null, { invalidArgs: error })
      )
    })
  })
})
