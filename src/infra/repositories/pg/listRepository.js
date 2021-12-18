const { herbarium } = require('../../herbarium')
const { Repository } = require("@herbsjs/herbs2knex")
const connection = require('./connection')
const { TodoList } = require('../../../domain/entities/todoList')

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
        .metadata({ entity: TodoList })
        .repository