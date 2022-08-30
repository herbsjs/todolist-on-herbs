module.exports = {
  client: process.env.DATABASE_CLIENT,
  database: {
    connection: {
      useNullAsDefault: true,
      client: process.env.DATABASE_CLIENT,
      filename: process.env.DATABASE_CONNECTION,
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
  },
}
