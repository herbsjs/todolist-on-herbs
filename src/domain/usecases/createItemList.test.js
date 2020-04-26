const { createItemList } = require('./createItemList')
const { Ok, Err } = require('buchu')
const assert = require('assert')

describe('Create TO DO List', () => {
  function aUser({ hasAccess }) {
    return { canAddItemList: hasAccess }
  }

  describe('Valid List', () => {
    it('Should Add item on List ', async () => {
      // Given
      const injection = {
        ListRepository: class ListRepository {
          async save(list) {
            return Ok(list)
          }
          async getByIDs(ids) {
            const baseList = [
              {
                name: 'List One',
                id: 65676,
                items: []
              },
            ]

            const filteredList = baseList.filter((list) => {
              return ids.includes(list.id)
            })

            return Ok(filteredList)
          }
        },

      }
      const user = aUser({ hasAccess: true })
      const req = { description: 'Fist item on my list', idList: 65676 }

      // When
      const uc = createItemList(injection)
      uc.authorize(user)
      const ret = await uc.run({
        idList: req.idList,
        description: req.description,
      })

      // Then
      assert.ok(ret.isOk)
    }),
    it('Should Add extra item on List ', async () => {
      // Given
      const injection = {
        ListRepository: class ListRepository {
          async save(list) {
            return Ok(list)
          }
          async getByIDs(ids) {
            const baseList = [
              {
                name: 'List One',
                id: 65676,
                items: [{
                  description:"First item on list",
                  position: 1,
                  isDone: false
                }]
              },
            ]

            const filteredList = baseList.filter((list) => {
              return ids.includes(list.id)
            })

            return Ok(filteredList)
          }
        },

      }
      const user = aUser({ hasAccess: true })
      const req = { description: 'Fist item on my list', idList: 65676 }

      // When
      const uc = createItemList(injection)
      uc.authorize(user)
      const ret = await uc.run({
        idList: req.idList,
        description: req.description,
      })

      // Then
      assert.ok(ret.isOk)
    })
  })

  describe('Invalid Name List', () => {
    it.only('Should Not Create Item on invalid list', async () => {
      // Given
      const injection = {
        ListRepository: class ListRepository {
          async save(list) {
            return Ok(list)
          }
          async getByIDs(ids) {
            const baseList = [
              {
                name: 'List One',
                id: 65676,
                items: [{
                  description:"First item on list",
                  position: 1,
                  isDone: false
                }]
              },
            ]

            const filteredList = baseList.filter((list) => {
              return ids.includes(list.id)
            })

            return Ok(filteredList)
          }
        },

      }
      const user = aUser({ hasAccess: true })
      const req = { description: 'Fist item on my list', idList: 6666 }

      // When
      const uc = createItemList(injection)
      uc.authorize(user)
      const ret = await uc.run({
        idList: req.idList,
        description: req.description,
      })

      // Then
      assert.ok(ret.isErr)
    })
  })
})
