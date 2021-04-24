const { entity, field } = require('gotu')
const { Item } = require('./item')

module.exports.TodoList =
    entity('To Do List', {
        id: field(Number),
        name: field(String, {
            validation: { presence: true, length: { minimum: 3 } }
        }),
        items: field([Item]),

        isEmpty() {
            return this.items.length === 0
        },

        lastPosition() {
            const positions = this.items.map(i => i.position)
            positions.push(0)
            const lastPosition = Math.max(...positions)
            return lastPosition
        }

    })
