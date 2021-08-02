const knex = require('knex')
const Config = require('../../config/config')

module.exports = knex(Config.database)