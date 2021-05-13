const controllerList = [
  {
    name: 'lists',
    getById: require('../../../domain/usecases/getList').getList,
    post: require('../../../domain/usecases/createList').createList,
    put: require('../../../domain/usecases/updateList').updateList,
    delete: require('../../../domain/usecases/deleteList').deleteList
  },
  {
    name: 'items',
    idParameter: 'itemId',
    post: require('../../../domain/usecases/createItem').createItem,
    put: require('../../../domain/usecases/updateItem').updateItem
  }
]

module.exports = controllerList
