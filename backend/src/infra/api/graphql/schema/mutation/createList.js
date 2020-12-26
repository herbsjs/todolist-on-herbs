const { usecase2mutation } = require('herbs2gql')
const { gql } = require('apollo-server-express')

const usecase = require('../../../../../domain/usecases/createList').createList()

module.exports = gql(usecase2mutation(usecase))