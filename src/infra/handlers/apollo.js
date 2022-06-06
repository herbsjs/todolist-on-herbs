const { ApolloServer } = require('apollo-server-lambda')
const [typeDefs, resolvers] = require('../api/graphql')

const user = require('../config/user')

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user }),
})

module.exports = server.createHandler()
