module.exports = {
    client: process.env.DATABASE_CLIENT,
    useNullAsDefault: true,
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,     
      filename: process.env.DATABASE_FILE_NAME,
    },
}
