![CI Build](https://github.com/herbsjs/todolist-on-herbs/workflows/Node.js%20CI/badge.svg) [![codecov](https://codecov.io/gh/herbsjs/todolist-on-herbs/branch/master/graph/badge.svg)](https://codecov.io/gh/herbsjs/todolist-on-herbs)


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

To update a list just run a POST http://localhost:{yourport}/graphql

```graphql
mutation{
  updateList(id: "1", name: "List One") {
    name,id
  }
}
```

To delete a list just run a POST http://localhost:{yourport}/graphql

```graphql
mutation{
  deleteList(id: "1") {
  }
}
```

  Additionally a [file](src/api/graphql/docs/herbs.postman_collection.json) was also added to the docs folder for import into the postman

### Environment

We also added the sample environment files. Within the .env file you will find the following information


## How to contribute

If you would like to help contribute to this repository, please see [CONTRIBUTING]https://github.com/herbsjs/todolist-on-herbs/blob/master/.github/CONTRIBUTING.md)

---

### License

- [MIT License](https://github.com/herbsjs/todolist-on-herbs/blob/master/LICENSE)