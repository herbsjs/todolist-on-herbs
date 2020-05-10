const { Ok, Err } = require('buchu')
const assert = require('assert')

const { Item } = require('../entities/item')
const { updateItem } = require('./updateItem')

describe('Update To Do Item', () => {
  function aUser({ hasAccess }) {
    return { canAddItem: hasAccess }
  }

  describe('Should update Valid Item', () => {
    it('Should Update Item changing position ', async () => {
      const injection = {
        ItemListRepository: class {
          async save(list) {
            return Ok(list)
          }
          async geItemByListID(id) {
            return Ok([
              {
                id: 11110,
                idList: 65676,
                description: 'First item on list',
                position: 1,
                isDone: false,
              },
              {
                id: 11112,
                idList: 65676,
                description: 'Second item on list',
                position: 2,
                isDone: true,
              },
            ])
          }
          async getItemByID(id) {
            return Ok({
              id: 11110,
              idList: 65676,
              description: 'First item on list',
              position: 1,
              isDone: false,
            })
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = {
        id: 11110,
        position: 2,
        isDone: true,
        description: 'New item in second position',
      }

      // When
      const uc = updateItem(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
    }),
    it('Should Update Item not changing position ', async () => {
      const injection = {
        ItemListRepository: class {
          async save(list) {
            return Ok(list)
          }
          async geItemByListID(id) {
            return Ok([
              {
                id: 11110,
                idList: 65676,
                description: 'First item on list',
                position: 1,
                isDone: false,
              },
              {
                id: 11112,
                idList: 65676,
                description: 'Second item on list',
                position: 2,
                isDone: true,
              },
            ])
          }
          async getItemByID(id) {
            return Ok({
              id: 11110,
              idList: 65676,
              description: 'First item on list',
              position: 1,
              isDone: false,
            })
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = {
        id: 11110,
        position: 1,
        isDone: true,
        description: 'New item on description',
      }

      // When
      const uc = updateItem(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
    })
  }),
  describe('Should not update Item', () => {
    it('Should not update nonexistent Item ', async () => {
      const injection = {
        ItemListRepository: class {
          async save(list) {
            return Ok(list)
          }
          async geItemByListID(id) {
            return Ok([])
          }
          async getItemByID(id) {
            return Err('Not Found')
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = {
        id: 11110,
        position: 1,
        isDone: true,
        description: 'Updating not created item',
      }

      // When
      const uc = updateItem(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.equal(ret.err,"Item not found - ID: \"11110\"")
    })
  })
})
