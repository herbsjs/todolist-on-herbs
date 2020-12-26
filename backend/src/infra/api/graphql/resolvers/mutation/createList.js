const defaultResolver = require('../defaultResolver')

const usecase = require('../../../../../domain/usecases/createList').createList

const resolvers = {
  Mutation: {
    createList: defaultResolver({ usecase })
  }
}

module.exports = resolvers
