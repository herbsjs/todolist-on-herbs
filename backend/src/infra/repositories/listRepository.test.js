const ListRepository = require('./listRepository')
const { Ok } = require('buchu')
const assert = require('assert')

describe('List Repository', () => {
  describe('Valid Operations', () => {
    it('Should save list', async () => {
      // Given
      const list = {id:1, name: "My favorite list"}

      // When
      const repo = new ListRepository()

      const ret = await repo.save(list)

      // Then
      assert.ok(ret.isOk)
    }),
    it('Should get list', async () => {
      // Given
      const list = {id:1, name: "My favorite list"}
      await new ListRepository().save(list)

      // When
      const repo = new ListRepository()

      const ret = await repo.getByIDs([1])

      // Then
      assert.ok(ret.isOk)
    })
  })

  describe('Invalid Operations', () => {
    it('Should not save list', async () => {
      // Given
      const list = undefined

      // When
      const repo = new ListRepository()

      const ret = await repo.save(list)

      // Then
      assert.ok(ret.isErr)
      assert.equal(ret.err, 'Not Saved')
    }),
    it('Should not get non existing list', async () => {
      // Given
      const list = {id:1, name: "My favorite list"}
      await new ListRepository().save(list)

      // When
      const repo = new ListRepository()

      const ret = await repo.getByIDs([33])

      // Then
      assert.ok(ret.isErr)
      assert.equal(ret.err,'Not Found')
    })
  })
})
