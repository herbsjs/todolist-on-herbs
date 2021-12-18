const { Repository } = require("@herbsjs/herbs2knex")
const { TodoList } = require('../../../domain/entities/todoList')
const connection = require('./connection')
const { herbarium } = require('../../herbarium')

class ListRepository extends Repository {
    constructor(injection) {
        super({
            entity: TodoList,
            table: "lists",
            ids: ["id"],
            knex: connection
        })
    }
}

module.exports =
    herbarium.repositories
        .add(ListRepository, 'ListRepository')
        .metadata({ entity: 'TodoList' })
        .repository