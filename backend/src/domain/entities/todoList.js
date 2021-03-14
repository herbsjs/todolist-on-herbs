const { entity, field } = require('gotu')
const { Item } = require('./item')

module.exports.TodoList =
    entity('To Do List', {
        id: field(Number),
        name: field(String, {
            validation: { presence: true, length: { minimum: 3 } }
        }),
        items: field([Item]), // TODO: remove and test
    })
