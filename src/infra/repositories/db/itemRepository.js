const { herbarium } = require('@herbsjs/herbarium')
const { Repository } = require("@herbsjs/herbs2knex")
const connection = require('./connection')
const { Item } = require('../../../domain/entities/item')

class ItemRepository extends Repository {
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

module.exports =
    herbarium.repositories
        .add(ItemRepository, 'ItemRepository')
        .metadata({ entity: Item })
        .repository