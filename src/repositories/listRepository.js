const DB = require('./inMemDB')
const { Ok, Err } = require('buchu')

module.exports =
    class ListRepository {
        constructor() {
            this.table = 'list'
        }

        async save(list) {
            const ret = await DB.set(this.table, list.id, list)
            return Ok(ret)
        }

        async getByIDs(ids) {
            const ret = await DB.getMany(this.table, ids)
            return Ok(ret)
        }
    }