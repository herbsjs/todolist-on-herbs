const { createItem } = require('./createItem')
const { TodoList } = require('../entities/todoList')
const { Ok } = require('@herbsjs/herbs')
const assert = require('assert')

describe('Create Item', () => {
  function aUser({ hasAccess }) {
    return { canCreateItem: hasAccess }
  }

  describe('Valid Item', () => {

    it('should add Item on empty List ', async () => {
      // Given
      const injection = {
        ListRepository: class {
          async find(where) { return ([TodoList.fromJSON({ name: `Great achievements`, id: 65676 })]) }
        },
        ItemRepository: class {
          async insert(item) { return (item) }
          async find(where) { return [] }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = { description: `My firts item!`, listId: 65676 }

      // When
      const uc = createItem(injection)
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
      assert.strictEqual(ret.ok.position, 1)
    })

    it('should add Item at the last position on a List with others Items', async () => {
      // Given
      const injection = {
        ListRepository: class {
          async find(where) { return [TodoList.fromJSON({ name: `Great goals`, id: 65676 })] }
        },
        ItemRepository: class {
          async insert(item) { return item }
          async find(where) {
            return [
              { id: 11111, position: 1 },
              { id: 11112, position: 2 },
              { id: 11113, position: 3 },
            ]
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = { description: `Make it happen!`, listId: 65676 }

      // When
      const uc = createItem(injection)
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
      assert.strictEqual(ret.ok.position, 4)
    })
  })

  describe('Invalid Item', () => {

    it('should not create invalid Item', async () => {
      // Given
      const injection = {}
      const user = aUser({ hasAccess: true })
      const req = { listId: 65676 }

      // When
      const uc = createItem(injection)
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err.message, 'Item is invalid')
      assert.deepStrictEqual(ret.isInvalidEntityError, true)
    })

    it('should not create Item if the List does not exist', async () => {
      // Given
      const injection = {
        ListRepository: class {
          async find(where) { return [] }
        }
      }
      const user = aUser({ hasAccess: true })
      const req = { description: `You can do it!`, listId: 65680 }

      // When
      const uc = createItem(injection)
      await uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.strictEqual(ret.err.message, `List not found - ID: 65680`)
      assert.strictEqual(ret.isNotFoundError, true)
    })

  })
})
