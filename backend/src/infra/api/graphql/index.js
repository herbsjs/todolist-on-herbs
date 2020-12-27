const { gql } = require('apollo-server-express')
const { GraphQLDateTime } = require('graphql-iso-date')
const types = require('./types')
const queries = require('./queries')
const mutations = require('./mutations')

let graphQLDef = []
graphQLDef = graphQLDef.concat(types, queries, mutations)

/* Type Defs (Schemas) */
const typeDefs = graphQLDef.map(i => gql(i[0]))

/* Resolvers */
const resolvers = graphQLDef.map(i => i[1]).filter(i => i !== undefined)
resolvers.push({ Date: GraphQLDateTime })

module.exports = [typeDefs, resolvers]