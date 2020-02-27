const { entity, field } = require('gotu')

module.exports.TodoList =
    entity('To Do List', {
        id: field(Number),
        name: field(String, {
            validation: {
                presence: true,
                length: {
                    minimum: 3,
                    message: "must be at least 3 characters"
                }
            }
        })
    })