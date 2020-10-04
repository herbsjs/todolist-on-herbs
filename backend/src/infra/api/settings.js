const dotenv = require('dotenv')
dotenv.config({ silent: true })

const environment = process.env.NODE_ENV || 'dev'
// eslint-disable-next-line no-console
console.log(`♻️  Enviroment: ${environment}`)
const settings = require('./config/settings.' + [environment] + '.json')

module.exports = settings
