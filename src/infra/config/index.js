const dotenv = require('dotenv')
dotenv.config({ silent: true })

module.exports = {
  database: require('./database'),
  user: require('./user'),
}
