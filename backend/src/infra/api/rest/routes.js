const { generateRoutes } = require('herbs2rest')
const Config = require('../../config/config')

const controllers = [
  {
    name: 'lists',
    getAll: require('../../../domain/usecases/getLists').getLists,
    getById: require('../../../domain/usecases/getLists').getLists,
    post: require('../../../domain/usecases/createList').createList,
    put: require('../../../domain/usecases/updateList').updateList,
    delete: require('../../../domain/usecases/deleteList').deleteList
  },
  {
    name: 'items',
    post: require('../../../domain/usecases/createItem').createItem,
    put: require('../../../domain/usecases/updateItem').updateItem
  }
]

module.exports = (routes) => {
  const showInfo = Config.environment !== "production"
  generateRoutes(controllers, routes, showInfo)
}