const { UserInputError } = require('apollo-server-express')

const dependency = {
  updateItem: require('../../../../../domain/usecases/updateItem').updateItem,
}

const resolvers = {
  Mutation: {
    updateItem: async (parent, args) => {
      const di = Object.assign({}, dependency, args.injection)
      const uc = di.updateItem(args.injection)
      const hasAccess = uc.authorize({ canUpdateItem: true }) // TODO: authorize user
      const response = await uc.run({
        id: args.id,
        description: args.description,
        isDone: args.isDone,
        position: args.position,
      })

      if (response.isErr)
        throw new UserInputError(null, { invalidArgs: response.err })
      return response.ok
    },
  },
}

module.exports = resolvers
