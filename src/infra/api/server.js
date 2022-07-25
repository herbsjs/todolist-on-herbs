const Config = require('../config/config')

// Herbarium
const { herbarium } = require('@herbsjs/herbarium')
herbarium.requireAll()

// Express
const express = require('express')
const cors = require('cors')

// Shelf
const { renderShelfHTML, herbsshelf  } = require('@herbsjs/herbsshelf')

// GraphQL
const { ApolloServer } = require('apollo-server-express')
const [typeDefs, resolvers] = require('./graphql/index')

// REST
const generateRoutes = require('./rest/routes')

const user = {
    canCreateList: true,
    canGetLists: true,
    canGetItems: true,
    canUpdateList: true,
    canDeleteList: true,
    canDeleteItem: true,
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
        this.app.use((req, res, next) => {
            req.user = user
            next()
        })
        this.app.use(express.json())

        const routes = new express.Router()
        generateRoutes(routes)
        this.app.use(routes)
    }

    async apollo() {
        const server = new ApolloServer({
            introspection: true,
            playground: true,
            typeDefs,
            resolvers,
            context: ({ req }) => ({ user })
        })
        await server.start()
        server.applyMiddleware({ app: this.app, path: '/graphql' })

        // eslint-disable-next-line no-console
        console.info(`\n🖧 GraphQL endpoint - /graphql`)
    }

    banner() {
        // eslint-disable-next-line no-console
        console.info(`\n🚀 Server UP and Running in port: ${ process.env.PORT || Config.web.httpPort}`)
    }

    init() {
        return this.app.listen({ port: process.env.PORT ||  Config.web.httpPort }, this.banner)
    }

    herbsShelf() {
        this.app.get(['/', '/herbsshelf'], (req, res, next) => {
            res.setHeader('Content-Type', 'text/html')

            const shelf = herbsshelf ( {project: 'TODO List', herbarium})
            res.write(shelf)
            res.end()
        })

        // eslint-disable-next-line no-console
        console.info(`\n📚 Herbs Shelf endpoint - /`)

    }
}

module.exports = new ServerAPI(express())
