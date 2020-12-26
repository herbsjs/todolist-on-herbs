const { usecase2mutation } = require('herbs2gql')
const { gql } = require('apollo-server-express')

const usecase = require('../../../../../domain/usecases/updateList').updateList()

module.exports = gql(usecase2mutation(usecase))
