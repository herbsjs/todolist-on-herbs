const controllerList = [
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

module.exports = controllerList
