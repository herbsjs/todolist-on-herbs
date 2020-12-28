const { GraphQLDateTime } = require('graphql-iso-date')

const resolver = { Date: GraphQLDateTime }

const schema = [`scalar Date`]

module.exports = [schema, resolver]
