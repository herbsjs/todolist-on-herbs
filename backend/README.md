![Node.js CI](https://github.com/herbsjs/todolist-on-herbs/workflows/Node.js%20CI/badge.svg)

# Todolist on Herbs

This is a example on how to build a backend application using [Herbs](https://github.com/herbsjs).

### Using

    $ npm install
    $ npm start

  You should receive this message => 🚀 Server UP and Running in port: 4000

  VSCode launchers (launch.json) are also available.

### Postgres setup

  1. Change `knexfile.js` and `src\infra\config\dev.json` connection info.

  2. Run migration:

    $ npx knex migrate:latest

### Herbs REPL

  View all the use cases and its steps in just one place.

    $ node .\src\infra\repl

### GraphQL

GraphQL Playground: [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Herbs Shelf

Herbs Shelf: [http://localhost:4000/herbsshelf](http://localhost:4000/herbsshelf)

### Herbs REPL

[Herbs REPL](https://github.com/herbsjs/herbs2repl):

    $ node ./src/infra/repl

### Settings

**Environment:**

`.env.{environment}` files. 

Rename one of the files to just `.env`. 

Default is `dev`. Also check for `HERBS_EXCEPTION` env variable.

**Config:**

Edit `/backend/infra/config/{environment}.json` files if necessary.

## How to contribute

If you would like to help contribute to this repository, please see [CONTRIBUTING](https://github.com/herbsjs/todolist-on-herbs/blob/master/.github/CONTRIBUTING.md)

---