const { ItemList } = require('./itemList')
const assert = require('assert')

describe('Item List', () => {
  describe('Valid List', () => {
    it('Should be a Valid item list', async () => {
      // Given
      const aItemList = new ItemList()

      // When
      aItemList.description = 'My first Item List'
      aItemList.isDone = false
      aItemList.position = 1

      // Then
      assert.ok(aItemList.isValid())
    })
  }),
    describe('Invalid List', () => {
      it('Should not be a Valid item list', async () => {
        // Given
        const aItemList = new ItemList()

        // When
        aItemList.description = undefined
        aItemList.isDone = false
        aItemList.position = 1

        // Then
        assert.ok(!aItemList.isValid())
      })
    })
})
