![CI Build](https://github.com/herbsjs/todolist-on-herbs/workflows/Node.js%20CI/badge.svg) [![codecov](https://codecov.io/gh/herbsjs/todolist-on-herbs/branch/master/graph/badge.svg)](https://codecov.io/gh/herbsjs/todolist-on-herbs)


# TO DO list on Herbs
This is a example on how to build a application using [Herbs](https://github.com/herbsjs).


### Using

Backend:

    $ cd ./backend
    $ npm install
    $ npm start

Frontend:

    $ cd ./frontend
    $ npm install
    $ npm start

### GraphQL

GraphQL Playground: [http://localhost:4000/graphql](http://localhost:4000/graphql)


### Herbs Shelf

Herbs Shelf: [http://localhost:4000/herbsshelf](http://localhost:4000/herbsshelf)

### Herbs REPL

[Herbs REPL](https://github.com/herbsjs/herbs2repl):

    $ cd ./backend
    $ node ./src/infra/repl

### Settings

**Environment:**

`.env.{environment}` files. 

Rename one of the files to just `.env`. 

Default is `dev`.

**Config:**

Edit `/backend/infra/config/{environment}.json` files if necessary.

## How to contribute

If you would like to help contribute to this repository, please see [CONTRIBUTING](https://github.com/herbsjs/todolist-on-herbs/blob/master/.github/CONTRIBUTING.md)

---

### License

- [MIT License](https://github.com/herbsjs/todolist-on-herbs/blob/master/LICENSE)