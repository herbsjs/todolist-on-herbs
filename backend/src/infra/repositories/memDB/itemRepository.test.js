const ItemRepository = require('./itemRepository')
const { Ok } = require('buchu')
const assert = require('assert')

describe.skip('Item Repository', () => {
  describe('Valid Operations', () => {
    it('Should save item', async () => {
      // Given
      const item = {
        id: 1,
        listId: 1,
        description: 'First item on list',
        position: 1,
        isDone: false,
      }

      // When
      const repo = new ItemRepository()

      const ret = await repo.save(item)

      // Then
      assert.ok(ret.isOk)
    }),

    it('Should get item by id', async () => {
      // Given
      await new ItemRepository().save({
        id: 1,
        listId: 1,
        description: 'First item on list',
        position: 1,
        isDone: false,
      })

      // When
      const repo = new ItemRepository()

      const ret = await repo.getItemByID(1)

      // Then
      assert.ok(ret.isOk)
    }),

    it('Should get item by listId', async () => {
      // Given

      await new ItemRepository().save({
        id: 1,
        listId: 1,
        description: 'First item on list',
        position: 1,
        isDone: false,
      })

      // When
      const repo = new ItemRepository()

      const ret = await repo.geItemByListID(1)

      // Then
      assert.ok(ret.isOk)
      assert.ok(ret.ok.length === 1)
    })
  })

  describe('Invalid Operations', () => {
    it('Should Not save item', async () => {
      // Given
      const item = undefined

      // When
      const repo = new ItemRepository()

      const ret = await repo.save(item)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err, 'Not Saved')
    }),
    it('Should not get non existing item by id', async () => {
      // Given

      await new ItemRepository().save({})

      // When
      const repo = new ItemRepository()

      const ret = await repo.getItemByID(11110)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err, 'Not Found')
    }),
    it('Should not get item by non existing List', async () => {
      // Given
      const item = undefined
      await new ItemRepository().save(item)

      // When
      const repo = new ItemRepository()

      const ret = await repo.geItemByListID(33)

      // Then
      assert.ok(ret.isOk)
      assert.deepStrictEqual(ret.ok, [])
    })
  })
})
