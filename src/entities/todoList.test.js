const { TodoList } = require('./todoList')
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
})


