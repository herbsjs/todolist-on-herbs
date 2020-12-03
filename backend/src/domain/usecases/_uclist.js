module.exports = (injection) => {
    return [
        { usecase: require('./createItem').createItem(injection), tags: { group: 'Items' } },
        { usecase: require('./updateItem').updateItem(injection), tags: { group: 'Items' } },
        { usecase: require('./createList').createList(injection), tags: { group: 'List' } },
        { usecase: require('./getLists').getLists(injection), tags: { group: 'List' } },
        { usecase: require('./updateList').updateList(injection), tags: { group: 'List' } },
        { usecase: require('./deleteList').deleteList(injection), tags: { group: 'List' } },
    ]
}