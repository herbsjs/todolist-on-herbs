module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'todolist_on_herbs_db',
      user: 'postgres',
      password: 'postgres',
      host: 'localhost',
      port: 5432
    },
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

  production: {}

}
