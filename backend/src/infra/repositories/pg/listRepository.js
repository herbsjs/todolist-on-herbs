const { Repository } = require("herbs2knex")
const { TodoList } = require('../../../domain/entities/todoList')
const connection = require('./connection')

module.exports = class ListRepository extends Repository {
    constructor(injection) {
        super({
            entity: TodoList,
            table: "lists",
            ids: ["id"],
            knex: connection
        })
    }
}

