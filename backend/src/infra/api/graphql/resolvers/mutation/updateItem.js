const defaultResolver = require('../defaultResolver')

const usecase = require('../../../../../domain/usecases/updateItem').updateItem

const resolvers = {
  Mutation: {
    updateItem: defaultResolver({ usecase })
  }
}

module.exports = resolvers