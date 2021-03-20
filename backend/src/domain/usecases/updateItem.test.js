const { Ok, Err } = require('buchu')
const assert = require('assert')
const { Item } = require('../entities/item')

const { updateItem } = require('./updateItem')

describe('Update Item', () => {
  function aUser({ hasAccess }) {
    return { canUpdateItem: hasAccess }
  }

  describe('Valid Item', () => {

    it('should update Item keeping the same position ', async () => {
      const injection = {
        ItemRepository: class {
          async update(item) { return item }
          async findByID(id) {
            return [Item.fromJSON({
              id: 11110,
              position: 2,
              isDone: true,
              description: `Let's do it!`,
            })]
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = {
        id: 11110,
        position: 2,
        isDone: true,
        description: `Let's make it!`,
      }

      // When
      const uc = updateItem(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
      assert.strictEqual(ret.ok.position, 2)
    })

    it('should update Item changing to an existing position', async () => {
      const injection = {
        ItemRepository: class {
          async update(item) { return item }
          async findByID(id) {
            return [Item.fromJSON({
              id: 22,
              position: 2,
              isDone: true,
              description: `Domain Driven Design`,
            })]
          }
          async findBy(where) {
            return [Item.fromJSON({
              id: 11,
              position: 1,
              isDone: true,
              description: `Clean Architecture`,
            }),
            Item.fromJSON({
              id: 22,
              position: 2,
              isDone: true,
              description: `Domain Driven Design`,
            }),
            Item.fromJSON({
              id: 33,
              position: 3,
              isDone: true,
              description: `Test Driven Design`,
            })]
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = {
        id: 22,
        position: 3,
        isDone: true,
        description: `Domain Driven Design`,
      }

      // When
      const uc = updateItem(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
      assert.strictEqual(ret.ok.position, 3)
    })

    it('should update Item changing to a non existing position', async () => {
      const injection = {
        ItemRepository: class {
          async update(item) { return item }
          async findByID(id) {
            return [Item.fromJSON({
              id: 22,
              position: 2,
              isDone: true,
              description: `Domain Driven Design`,
            })]
          }
          async findBy(where) {
            return [Item.fromJSON({
              id: 11,
              position: 1,
              isDone: true,
              description: `Clean Architecture`,
            }),
            Item.fromJSON({
              id: 22,
              position: 2,
              isDone: true,
              description: `Domain Driven Design`,
            }),
            Item.fromJSON({
              id: 33,
              position: 3,
              isDone: true,
              description: `Test Driven Design`,
            })]
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = {
        id: 22,
        position: 5,
        isDone: true,
        description: `Domain Driven Design`,
      }

      // When
      const uc = updateItem(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
      assert.strictEqual(ret.ok.position, 5)
    })
  })

  describe('Invalid Item', () => {

    it('should not update Item if the Item does not exist', async () => {
      const injection = {
        ItemRepository: class {
          async findByID(id) {
            return []
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = {
        id: 11110,
        position: 2,
        isDone: true,
        description: `Let's make it!`,
      }

      // When
      const uc = updateItem(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.strictEqual(ret.err, `Item not found - ID: 11110`)
    })

    it('should not update invalid Item', async () => {
      const injection = {
        ItemRepository: class {
          async findByID(id) {
            return [Item.fromJSON({
              id: 22,
              position: 2,
              isDone: true,
              description: `Clean Code`,
            })]
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = {
        id: 11110,
        position: 2,
        isDone: true,
        description: ``,
      }

      // When
      const uc = updateItem(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err, { description: [{ cantBeEmpty: true }, { isTooShort: 3 }] })
    })

  })
})
