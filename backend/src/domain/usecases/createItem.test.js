const { createItem } = require('./createItem')
const { Ok } = require('buchu')
const assert = require('assert')

describe('Create TO DO Item', () => {
  function aUser({ hasAccess }) {
    return { canCreateItem: hasAccess }
  }

  describe('Valid Item', () => {
    it('Should Add item on empty List ', async () => {
      // Given
      const injection = {
        ListRepository: class {
          async getByIDs(id) {
            return Ok([{ name: 'List One', id: 65676 }])
          }
        },
        ItemRepository: class {
          async save(list) {
            return Ok(list)
          }
          async geItemByListID(id) {
            return Ok([])
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = { description: 'First item on my list', listId: 65676 }

      // When
      const uc = createItem(injection)
      uc.authorize(user)
      const ret = await uc.run({
        listId: req.listId,
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
              return Ok([{ name: 'List list', id: 65676 }])
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
                  listId: 65676,
                  description: 'First item on list',
                  position: 1,
                  isDone: false,
                },
                {
                  id: 11111,
                  listId: 65676,
                  description: 'Second item on list',
                  position: 2,
                  isDone: false,
                },
                {
                  id: 11112,
                  listId: 65676,
                  description: 'Third item on list',
                  position: 3,
                  isDone: false,
                },
              ]

              const filteredList = baseList.filter(
                (item) => item.listId === id
              )

              return Ok(filteredList)
            }
          },
        }
        const user = aUser({ hasAccess: true })
        const req = { description: 'Fourth item on my list', listId: 65676 }

        // When
        const uc = createItem(injection)
        uc.authorize(user)
        const ret = await uc.run({
          listId: req.listId,
          description: req.description,
        })

        // Then
        assert.ok(ret.isOk)
      })
  })

  describe('Invalid Item', () => {
    it('Should Not Create Item on invalid list', async () => {
      // Given
      const injection = {
        ListRepository: class {
          async getByIDs(id) {
            return Ok([])
          }
        },
        ItemRepository: class {
          async save(list) {
            return Ok(list)
          }
          async geItemByListID(id) {
            return Ok([
              {
                id: 11110,
                listId: 65676,
                description: 'First item on list',
                position: 1,
                isDone: false,
              },
            ])
          }
        },
      }
      const user = aUser({ hasAccess: true })
      const req = { description: 'Fist item on my list', listId: 65680 }

      // When
      const uc = createItem(injection)
      uc.authorize(user)
      const ret = await uc.run({
        listId: req.listId,
        description: req.description,
      })

      // Then
      assert.ok(ret.isErr)
    }),
      it('Should Not Create invalid Item', async () => {
        // Given
        const injection = {
          ListRepository: class {
            async getByIDs(id) {
              return Ok([{ name: 'List list', id: 65676 }])
            }
          },
          ItemRepository: class {
            async save(list) {
              return Ok(list)
            }
            async geItemByListID(id) {
              return Ok([])
            }
          },
        }
        const user = aUser({ hasAccess: true })
        const req = { listId: 65676 }

        // When
        const uc = createItem(injection)
        uc.authorize(user)
        const ret = await uc.run({
          listId: req.listId,
          description: req.description,
        })

        // Then
        assert.ok(ret.isErr)
      })
  })
})
