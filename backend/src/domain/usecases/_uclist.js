module.exports = (injection) => {
    return {
        "Items": [
            require('./createItem').createItem(injection),
            require('./updateItem').updateItem(injection),
        ],
        "List": [
            require('./createList').createList(injection),
            require('./getLists').getLists(injection),
            require('./updateList').updateList(injection),
            require('./deleteList').deleteList(injection),
        ]
    }
}