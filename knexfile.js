module.exports = {

  development: {
    client: 'sqlite3',
    connection: { filename: "file.sqlite:memDb1?mode=memory&cache=shared" },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/infra/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/infra/db/seeds/dev'
    }
  },

  staging: {},

  production: {
    client: 'sqlite3',
    connection: { filename: "file.sqlite:memDb1?mode=memory&cache=shared" },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/infra/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/infra/db/seeds/dev'
    }
  }

}
