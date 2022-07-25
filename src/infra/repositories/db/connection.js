const knex = require('knex')
const config = require('../../config/config')

module.exports = knex(config.database)