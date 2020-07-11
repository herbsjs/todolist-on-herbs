var express = require('express')
const Settings = require('./settings')
var { ApolloServer } = require('apollo-server-express')
var cors = require('cors')
var morgan = require('cors')
const schema = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

class ServerAPI {
  constructor(app) {
    this.app = app
    this.useCors()
    this.morgan()
    this.apollo()
    this.init()
  }

  useCors() {
    this.app.use(cors())
  }

  morgan() {
    this.app.use(morgan('dev'))
  }

  apollo() {
    const server = new ApolloServer({
      introspection: true,
      playground: true,
      typeDefs: schema,
      resolvers,
    })
    server.applyMiddleware({ app: this.app, path: '/graphql' })
  }

  banner() {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server UP and Running in port: ${Settings.web.httpPort}`)
  }

  init() {
    return this.app.listen({ port: Settings.web.httpPort }, this.banner)
  }
}

module.exports = new ServerAPI(express())
