const createItemGQL = require('./createItem')
const assert = require('assert')
const { Ok, Err } = require('buchu')
const { UserInputError } = require('apollo-server-express')

describe('GraphQL - Mutations', () => {
  describe('createItem mutation', () => {
    it('should create TO DO item', async () => {
      // Given
      const itemDescription = 'Item on list'
      const itemIdList = 1022020
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
                idList: itemIdList,
              })
            },
          }
        },
      }
      const createItem = createItemGQL.Mutation.createItem

      // When
      const ret = await createItem(null, { injection, description: itemDescription, idList: itemIdList })

      // Then
      assert.deepEqual(ret.description, itemDescription)
    })

    it('should not create a item', async () => {
      // Given
      const itemDescription = 'Item on list'
      const itemIdList = 1022020
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
      const createItem = createItemGQL.Mutation.createItem

      // When
      const ret = async () =>
        await createItem(null, {
          injection,
          description: itemDescription,
          idList: itemIdList,
        })

      // Then
      await assert.rejects(
        ret,
        new UserInputError(null, { invalidArgs: error })
      )
    })
  })
})
