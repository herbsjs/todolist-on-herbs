const assert = require('assert')
const item = require('./item')
const list = require('./list')

describe('Generic List', () => {

    describe('Add Item', () => {

        it('should add a new valid item', async () => {
            // Given
            const items = new Map()
            const builder = (obj, id) => Object.assign({}, obj, item(id))
            const aList = list(items, builder)
            const id = 1
            const obj = { aStr: "a" }

            // When
            const anItem = aList.add(obj, id)

            // Then
            assert.ok(anItem.id === id)
            assert.ok(anItem.aStr === "a")
            assert.ok(items.size === 1)
        })
    })

    describe('Get All Items', () => {

        it('should get all items from the list', async () => {
            // Given
            const items = new Map([
                [1, 'one'],
                [2, 'two'],
                [3, 'three'],
            ])
            const builder = () => { }
            const aList = list(items, builder)

            // When
            const allItems = aList.all

            // Then
            assert.ok(allItems === items)
        })
    })

    describe('Get An Item', () => {

        it('should get an specific item from the list', async () => {
            // Given
            const items = new Map([
                [1, 'one'],
                [2, 'two'],
                [3, 'three'],
            ])
            const builder = () => { }
            const aList = list(items, builder)

            // When
            const anItems = aList.get(1)

            // Then
            assert.ok(anItems === 'one')
        })
    })

    describe('Find Items', () => {

        it('should find an specific item when there is only one match', async () => {
            // Given
            const items = new Map()
            const builder = (obj, id) => Object.assign({}, obj, item(id))
            const aList = list(items, builder)
            aList.add({ aStr: "a" }, 10).metadata({ letter: "A", number: 1 })
            aList.add({ aStr: "b" }, 11).metadata({ letter: "B", number: 2 })
            aList.add({ aStr: "c" }, 12).metadata({ letter: "C", number: 1 })

            // When
            const anItem = aList.findBy({ letter: "C", number: 1 })

            // Then
            assert.ok(anItem.length === 1)
            assert.ok(anItem[0].aStr === "c")
            assert.ok(anItem[0].letter === "C")
            assert.ok(anItem[0].number === 1)
        })

        it('should not find an item when there is no match', async () => {
            // Given
            const items = new Map()
            const builder = (obj, id) => Object.assign({}, obj, item(id))
            const aList = list(items, builder)
            aList.add({ aStr: "a" }, 10).metadata({ letter: "A", number: 1 })
            aList.add({ aStr: "b" }, 11).metadata({ letter: "B", number: 2 })
            aList.add({ aStr: "c" }, 12).metadata({ letter: "C", number: 1 })

            // When
            const anItem = aList.findBy({ letter: "C", number: 2 })

            // Then
            assert.ok(anItem.length === 0)
        })

        it('should find multiple items when there are matches with single vars, multiple values ', async () => {
            // Given
            const items = new Map()
            const builder = (obj, id) => Object.assign({}, obj, item(id))
            const aList = list(items, builder)
            aList.add({ aStr: "a" }, 10).metadata({ letter: "A", number: 1 })
            aList.add({ aStr: "b" }, 11).metadata({ letter: "B", number: 2 })
            aList.add({ aStr: "c" }, 12).metadata({ letter: "C", number: 3 })

            // When
            const anItem = aList.findBy({ number: [1, 2] })

            // Then
            assert.ok(anItem.length === 2)
            assert.ok(anItem.find((x) => x.number === 1).aStr === 'a')
            assert.ok(anItem.find((x) => x.number === 2).aStr === 'b')

        })

        it('should find multiple items when there are matches with multiple vars, multiple values ', async () => {
            // Given
            const items = new Map()
            const builder = (obj, id) => Object.assign({}, obj, item(id))
            const aList = list(items, builder)
            aList.add({ aStr: "a" }, 10).metadata({ letter: "A", number: 1 })
            aList.add({ aStr: "b" }, 11).metadata({ letter: "B", number: 2 })
            aList.add({ aStr: "c" }, 12).metadata({ letter: "C", number: 2 })
            aList.add({ aStr: "d" }, 13).metadata({ letter: "D", number: 1 })

            // When
            const anItem = aList.findBy({ number: [1, 2], letter: ["A", "C"] })

            // Then
            assert.ok(anItem.length === 2)
            assert.ok(anItem.find((x) => x.number === 1).aStr === 'a')
            assert.ok(anItem.find((x) => x.number === 2).aStr === 'c')

        })
    })
})