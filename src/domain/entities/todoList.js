const { entity, field,id } = require('@herbsjs/herbs')
const { Item } = require('./item')

module.exports.TodoList =
    entity('To Do List', {
        id: id(Number),
        name: field(String, {
            validation: { presence: true, length: { minimum: 3 } }
        }),
        items: field([Item], { default: () => [] }),

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
