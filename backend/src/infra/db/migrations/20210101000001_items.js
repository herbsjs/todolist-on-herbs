
exports.up = async function (knex) {
    return knex.schema
        .createTable('items', function (table) {
            table.bigInteger('id').primary()
            table.string('description', 1024)
            table.boolean('is_done')
            table.integer('position')
            table.bigInteger('list_id')
            table.foreign('list_id').references('lists.id')
            table.timestamps(true, true)
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('items')
}