const { usecase2query } = require('herbs2gql')
const { gql } = require('apollo-server-express')

const usecase = require('../../../../../domain/usecases/getLists').getLists()

module.exports = gql(usecase2query(usecase))
