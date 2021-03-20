const { Repository } = require("herbs2knex")
const { Item } = require('../../../domain/entities/item')
const connection = require('./connection')

module.exports = class ItemRepository extends Repository {
    constructor(injection) {
        super({
            entity: Item,
            table: "items",
            ids: ["id"],
            foreignKeys: [{ listId: String }],
            knex: connection
        })
    }
}
