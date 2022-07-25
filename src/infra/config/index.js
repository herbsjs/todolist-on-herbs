const dotenv = require('dotenv')
dotenv.config({ silent: true })

module.exports = {
  database: require('./database'),
  user: require('./user'),
  statusCode: require('./statusCode'),
  httpPort: process.env.HTTP_PORT,
  environment: process.env.NODE_ENV || 'development',
}
