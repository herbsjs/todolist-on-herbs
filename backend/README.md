![Node.js CI](https://github.com/herbsjs/todolist-on-herbs/workflows/Node.js%20CI/badge.svg)

# Todolist on Herbs
A sample Todo List graphQL API using Herbs using [Buchu](https://github.com/herbsjs/buchu), [Gotu](https://github.com/herbsjs/gotu), [Suma](https://github.com/herbsjs/suma) and [Graphql](https://github.com/graphql/graphql-js) with [Apollo Server Express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express)

### Installing

  Just run:

    $ npm install

### Run
    $ npm start

  You should receive this message => 🚀 Server UP and Running in port: 4000

  We also added an exclusive Visual Studio Code launch.json file to the project so you can run the project using F5 or the debug tab (Ctrl+Shift+D)

### Herbs REPL

    $ node .\src\infra\repl

### Using

To create a list just run a POST http://localhost:{yourport}/graphql

```graphql
mutation{
  createList(name: "List One") {
    name,id
  }
}
```

To add item on a list just run a POST http://localhost:{yourport}/graphql

```graphql
mutation{
	createItem(listId: 94585, description: "First Item"){
    id,
    listId,
    isDone,
    description,
    position
  }
}
```

To update item just run a POST http://localhost:{yourport}/graphql

```graphql
mutation{
  updateItem(id: 96211, description: "Updated Item", position: 1, isDone:true)
    {
      id,
      listId,
      isDone,
      description,
      position,
    }
}
```

To get the list and just run a POST http://localhost:{yourport}/graphql passing an array of ID's

```graphql
query{
  getLists(ids:[0]) {
    name,id
  }
}
```

  Additionally a [file](src/api/graphql/docs/herbs.postman_collection.json) was also added to the docs folder for import into the postman

### Environment

We also added the sample environment files. Within the .env file you will find the following information

    NODE_ENV=dev
    HERBS_EXCEPTION=audit


Within settings, the application reads the NODE_ENV variable within the .env file to define which configuration file it will use (within config/settings.xxx.json).

The audit HERBS_EXCEPTION variable is also added within the .env file according to its documentation.
