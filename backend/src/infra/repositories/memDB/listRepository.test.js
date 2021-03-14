const assert = require('assert')
const ListRepository = require('./listRepository')

describe.skip('List Repository', () => {

  it('Should save a new list', async () => {
    // Given
    const repository = new ListRepository()

    // When
    const ret = await repository.save({ id: 1, name: 'List 1' })

    // Then
    assert.deepStrictEqual("List 1", ret.ok.name)
    assert.deepStrictEqual(1, ret.ok.id)
  })

  it('Should get all lists', async () => {
    // Given
    const repository = new ListRepository()
    await repository.save({ id: 1, name: 'List 1' })
    await repository.save({ id: 2, name: 'List 2' })

    // When
    const ret = await repository.getAll()

    // Then
    assert.deepStrictEqual(2, ret.ok.length)
  })

  it('Should get lists by id', async () => {
    // Given
    const repository = new ListRepository()
    await repository.save({ id: 1, name: 'List 1' })
    await repository.save({ id: 2, name: 'List 2' })

    // When
    const ret = await repository.getByIDs([1])

    // Then
    assert.deepStrictEqual(1, ret.ok.length)
    assert.deepStrictEqual("List 1", ret.ok[0].name)
    assert.deepStrictEqual(1, ret.ok[0].id)
  })

  it('Should delete a list by id', async () => {
    // Given
    const repository = new ListRepository()
    await repository.save({ id: 1, name: 'List 1' })
    await repository.save({ id: 2, name: 'List 2' })

    // When
    const ret = await repository.deleteByIDs([1])

    // Then
    assert.deepStrictEqual(1, ret.ok.length)
  })

})
