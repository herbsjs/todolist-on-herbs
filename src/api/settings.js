const dotenv = require('dotenv')
dotenv.config({ silent: true })

const environment = process.env.NODE_ENV || 'dev'
const settings = require('./config/settings.' + [environment] + '.json')

module.exports = settings
