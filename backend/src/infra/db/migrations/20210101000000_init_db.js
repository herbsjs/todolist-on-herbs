
exports.up = function (knex) {
    return knex.schema
    
    .createTable('items', function (table) {
        table.bigInteger('id')
        table.string('description', 1024)
        table.boolean('is_done')
        table.integer('position')
        table.timestamps(true, true)
    })

    .createTable('lists', function (table) {
        table.bigInteger('id')
        table.string('name', 60)
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    return knex.schema 
    .dropTableIfExists('items')
    .dropTableIfExists('lists')
}