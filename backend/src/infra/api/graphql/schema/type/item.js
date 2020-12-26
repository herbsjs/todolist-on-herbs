const { gql } = require('apollo-server-express')
const { Item } = require('../../../../../domain/entities/item')
const { entity2type } = require('herbs2gql')

module.exports = gql(entity2type(Item))