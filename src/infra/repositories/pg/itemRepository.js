const { herbarium } = require('../../herbarium')
const { Repository } = require("@herbsjs/herbs2knex")
const { Item } = require('../../../domain/entities/item')
const connection = require('./connection')

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

herbarium
    .repositories.add(ItemRepository, 'ItemRepository')
    .metadata({ entity: 'Item' })


module.exports = ItemRepository