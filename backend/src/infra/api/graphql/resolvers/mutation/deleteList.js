const defaultResolver = require('../defaultResolver')

const usecase = require('../../../../../domain/usecases/deleteList').deleteList

const resolvers = {
  Mutation: {
    deleteList: defaultResolver({ usecase })
  }
}

module.exports = resolvers
