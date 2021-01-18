const listControllers = require('./list')
const itemControllers = require('./item')

function controllers(app) {
    listControllers(app)
    itemControllers(app)
}

module.exports = controllers