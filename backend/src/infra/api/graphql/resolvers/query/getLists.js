const defaultResolver = require('../defaultResolver')

const usecase = require('../../../../../domain/usecases/getLists').getLists

const resolvers = {
  Query: {
    getLists: defaultResolver({ usecase })
  }
}

module.exports = resolvers