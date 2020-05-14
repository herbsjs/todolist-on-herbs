const { Item } = require('./item')
const assert = require('assert')

describe('Item ', () => {
  describe('Valid Item', () => {
    it('Should be a Valid item', async () => {
      // Given
      const aItemList = new Item()

      // When
      aItemList.description = 'My first Item List'
      aItemList.isDone = false
      aItemList.position = 1

      // Then
      assert.ok(aItemList.isValid())
    })
  }),
    describe('Invalid List', () => {
      it('Should not be a Valid item', async () => {
        // Given
        const aItemList = new Item()

        // When
        aItemList.description = undefined
        aItemList.isDone = false
        aItemList.position = 1

        // Then
        assert.ok(!aItemList.isValid())
      })
    })
})
