const defaultResolver = require('../defaultResolver')

const usecase = require('../../../../../domain/usecases/updateList').updateList

const resolvers = {
  Mutation: {
    updateList: defaultResolver({ usecase })
  }
}

module.exports = resolvers