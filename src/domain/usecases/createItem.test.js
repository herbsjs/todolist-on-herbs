const { createItem } = require('./createItem')
const { Ok } = require('buchu')
const assert = require('assert')

describe('Create Item on List', () => {
  function aUser({ hasAccess }) {
    return { canAddItem: hasAccess }
  }

  describe('Valid List', () => {
    it('Should Add item on empty List ', async () => {
      // Given
      const injection = {
        ListRepository: class {
          async getByIDs(id) {
            const lists = [
              { name: 'List One', id: 65676 },
              { name: 'Second One', id: 65677 },
              { name: 'Third One', id: 65678 },
            ]

            return Ok(lists.filter(list => list.id === id))
          }
        },
        ItemRepository: class {
          async save(list) {
            return Ok(list)
          }
          async geItemByListID(id) {
            const baseList = []

            const filteredList = baseList.filter((item) => item.idList === id)

            return Ok(filteredList)
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = { description: 'First item on my list', idList: 65676 }

      // When
      const uc = createItem(injection)
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
          ListRepository: class {
            async getByIDs(id) {
              const lists = [
                { name: 'List list', id: 65676 },
                { name: 'Second list', id: 65677 },
                { name: 'Third list', id: 65678 },
              ]

              return Ok(lists.filter(list => list.id === id))
            }
          },
          ItemRepository: class {
            async save(list) {
              return Ok(list)
            }
            async geItemByListID(id) {
              const baseList = [
                {
                  id: 11110,
                  idList: 65676,
                  description: 'First item on list',
                  position: 1,
                  isDone: false,
                },
                {
                  id: 11111,
                  idList: 65676,
                  description: 'Second item on list',
                  position: 2,
                  isDone: false,
                },
                {
                  id: 11112,
                  idList: 65676,
                  description: 'Third item on list',
                  position: 3,
                  isDone: false,
                },
              ]

              const filteredList = baseList.filter((item) => item.idList === id)

              return Ok(filteredList)
            }
          },
        }
        const user = aUser({ hasAccess: true })
        const req = { description: 'Fourth item on my list', idList: 65676 }

        // When
        const uc = createItem(injection)
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
    it('Should Not Create Item on invalid list', async () => {
      // Given
      const injection = {
        ListRepository: class {
          async getByIDs(id) {
            const lists = [
              { name: 'List list', id: 65676 },
            ]

            return Ok(lists.filter(list => list.id === id))
          }
        },
        ItemRepository: class {
          async save(list) {
            return Ok(list)
          }
          async geItemByListID(id) {
            const baseList = [
              {
                id: 11110,
                idList: 65676,
                description: 'First item on list',
                position: 1,
                isDone: false,
              }
            ]

            const filteredList = baseList.filter((item) => item.idList === id)

            return Ok(filteredList)
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = { description: 'Fist item on my list', idList: 65680 }

      // When
      const uc = createItem(injection)
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
