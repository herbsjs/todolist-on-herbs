const { TodoList } = require('./todoList')
const { Item } = require('./item')
const assert = require('assert')

describe('To Do List', () => {

    describe('Valid List', () => {

        it('Should Have a Valid Name', async () => {
            // Given
            const aTodoList = new TodoList()

            // When
            aTodoList.name = "My TO-DO list"

            // Then
            assert.ok(aTodoList.isValid())
        })
    })

    describe('Check for Empty', () => {

        it('is not Empty', async () => {
            // Given
            const aTodoList = new TodoList()
            aTodoList.items.push(new Item())

            // When
            const ret = aTodoList.isEmpty()

            // Then
            assert.ok(ret === false)
        })

        it('is Empty', async () => {
            // Given
            const aTodoList = new TodoList()

            // When
            const ret = aTodoList.isEmpty()

            // Then
            assert.ok(ret === true)
        })

    })

    describe('Last Position', () => {

        it('should have last position = 0 for empty list', async () => {
            // Given
            const aTodoList = new TodoList()

            // When
            const ret = aTodoList.lastPosition()

            // Then
            assert.strictEqual(ret, 0)
        })

        it('should have last position = 1 for a list with 1 item', async () => {
            // Given
            const aTodoList = new TodoList()
            aTodoList.items.push(Item.fromJSON({ position: 1 }))

            // When
            const ret = aTodoList.lastPosition()

            // Then
            assert.strictEqual(ret, 1)
        })
    })


})


