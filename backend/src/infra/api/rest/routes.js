const { generateRoutes } = require('@herbsjs/herbs2rest')
const Config = require('../../config/config')

const controllers = [{
        name: 'lists',
        getAll: { usecase: require('../../../domain/usecases/getLists').getLists },
        getById: { usecase: require('../../../domain/usecases/getLists').getLists, id: 'ids' },
        post: { usecase: require('../../../domain/usecases/createList').createList },
        put: { usecase: require('../../../domain/usecases/updateList').updateList },
        delete: { usecase: require('../../../domain/usecases/deleteList').deleteList }

    },
    {
        name: 'items',
        post: { usecase: require('../../../domain/usecases/createItem').createItem },
        put: { usecase: require('../../../domain/usecases/updateItem').updateItem },
        getAll: { usecase: require('../../../domain/usecases/getItems').getItems },
        delete: { usecase: require('../../../domain/usecases/deleteItem').deleteItem }
    }
]

module.exports = (routes) => {
    const showInfo = Config.environment !== "production"
    generateRoutes(controllers, routes, showInfo)
}