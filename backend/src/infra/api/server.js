var express = require('express')
const Config = require('../config/config')
var { ApolloServer } = require('apollo-server-express')
var cors = require('cors')
const [typeDefs, resolvers] = require('./graphql/index')
const usecases = require('../../domain/usecases/_uclist')
const renderShelfHTML = require('herbsshelf')
const controllers = require('./rest/controller')

const user = {
  canCreateList: true,
  canGetLists: true,
  canUpdateList: true,
  canDeleteList: true,
  canCreateItem: true,
  canUpdateItem: true
}

class ServerAPI {
  constructor(app) {
    this.app = app
    this.useCors()
    this.rest()
    this.apollo()
    this.herbsShelf()
    this.init()
  }

  useCors() {
    this.app.use(cors())
  }

  rest() {
    this.app.use((req, res, next) => { req.user = user; next() })
    this.app.use(express.json())
    controllers(this.app)
  }

  apollo() {
    const server = new ApolloServer({
      introspection: true,
      playground: true,
      typeDefs,
      resolvers,
      context: ({ req }) => ({ user })
    })
    server.applyMiddleware({ app: this.app, path: '/graphql' })
  }

  banner() {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server UP and Running in port: ${Config.web.httpPort}`)
  }

  init() {
    return this.app.listen({ port: Config.web.httpPort }, this.banner)
  }

  herbsShelf() {
    this.app.get('/herbsshelf', (req, res, next) => {
      res.setHeader('Content-Type', 'text/html')
      const shelf = renderShelfHTML(usecases())
      res.write(shelf)
      res.end()
    })
  }
}

module.exports = new ServerAPI(express())
