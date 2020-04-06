# Todolist on Herbs
A sample Todo List graphQL API using Herbs using [Buchu](https://github.com/herbsjs/buchu), [Gotu](https://github.com/herbsjs/gotu), [Suma](https://github.com/herbsjs/suma) and [Graphql](https://github.com/graphql/graphql-js) with [Apollo Server Express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express)

### Installing

  Just run:

    $ npm install

### Run
    $ node .\src\api\server.js

  You should receive this message => 🚀 Server UP and Running in port: 4000    

  We also added an exclusive Visual Studio Code launch.json file to the project so you can run the project using F5 or the debug tab (Ctrl+Shift+D)


### Installing dev dependencies

 We also added some developer dependencies to force a pattern for lint, formating and testing:

```json
  {
      "devDependencies": {
      "eslint": "^6.8.0",
      "eslint-config-airbnb-base": "^14.1.0",
      "eslint-config-prettier": "^6.10.1",
      "eslint-plugin-import": "^2.20.2",
      "eslint-plugin-prettier": "^3.1.2",
      "mocha": "^7.1.1",
      "nyc": "^15.0.1",
      "prettier": "^2.0.4"
    }
  }
  ```

We recommend you install them for the best experience

### Using

To create a list just run a POST http://localhost:{yourport}/graphql

```graphql
mutation{
  createList(name: "List One") {
    name,id
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