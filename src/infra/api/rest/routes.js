const { generateControllers, generateRoutes } = require('@herbsjs/herbs2rest')

const { herbarium } = require('@herbsjs/herbarium')
const controller = require('./controller')


// add custon controllers
// controllers.push(...)

module.exports = (routes) => {
    const controllers = generateControllers({ herbarium, controller })
    const showEndpoints = true
    generateRoutes(controllers, routes, showEndpoints)
}