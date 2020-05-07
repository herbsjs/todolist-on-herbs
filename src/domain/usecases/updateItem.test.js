const { Ok, Err } = require('buchu')
const assert = require('assert')

const { Item } = require('../entities/item')
const { updateItemList } = require('./updateItem')

describe('Update To Do items', () => {
  function aUser({ hasAccess }) {
    return { canAddItem: hasAccess }
  }

  describe('Valid List', () => {
    const defaultItemList = [
      {
        id: 11110,
        idList: 65676,
        description: 'New item description on list',
        position: 1,
        isDone: false,
      },
      {
        id: 11112,
        idList: 65676,
        description: 'Second item on list',
        position: 2,
        isDone: false,
      },
    ]

    const injection = {
      ItemListRepository: class {
        async save(list) {
          return Ok(list)
        }
        async geItemByListID(id) {
          const filteredList = defaultItemList.filter(
            (item) => id.find((id) => id === item.idList) === item.idList
          )
          return Ok(filteredList)
        }
        async getItemByID(id) {
          const filteredItem = defaultItemList.find(
            (item) => item.id === id
          )
          return Ok(Item.fromJSON(filteredItem))
        }
      },
    }
    it('Should Update Item values ', async () => {
      const user = aUser({ hasAccess: true })
      const req = {
        id: 11110,
        idList: 65676,
        position: 2,
        isDone: true,
        description: 'New item description',
      }

      // When
      const uc = updateItemList(injection)
      uc.authorize(user)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
    }),
      it('Should done item', async () => {
        const user = aUser({ hasAccess: true })
        const req = {
          id: 11110,
          idList: 65676,
          isDone: true,
        }

        // When
        const uc = updateItemList(injection)
        uc.authorize(user)
        const ret = await uc.run(req)

        // Then
        assert.ok(ret.isOk)
      }),
      it('Should update item position ', async () => {

        const user = aUser({ hasAccess: true })
        const req = {
          id: 11110,
          idList: 65676,
          position: 2,
        }

        // When
        const uc = updateItemList(injection)
        uc.authorize(user)
        const ret = await uc.run(req)

        // Then
        assert.ok(ret.isOk)
      }),
      it('Should update item description ', async () => {

        const user = aUser({ hasAccess: true })
        const req = {
          id: 11110,
          idList: 65676,
          description: 'New item description',
        }

        // When
        const uc = updateItemList(injection)
        uc.authorize(user)
        const ret = await uc.run(req)

        // Then
        assert.ok(ret.isOk)
      })
  })
})
