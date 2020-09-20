const { UserInputError } = require('apollo-server-express')

const dependency = {
  deleteList: require('../../../../../domain/usecases/deleteList').deleteList,
}

const resolvers = {
  Mutation: {
    deleteList: async (parent, args) => {
      const di = Object.assign({}, dependency, args.injection)
      const uc = di.deleteList(args.injection)
      const hasAccess = uc.authorize({ canDeleteList: true }) // TODO: authorize user
      const response = await uc.run(args.id)

      if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
      return response.ok
    }
  }
}

module.exports = resolvers
