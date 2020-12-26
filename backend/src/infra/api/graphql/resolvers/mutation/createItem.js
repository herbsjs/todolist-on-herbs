const { UserInputError } = require('apollo-server-express')

const dependency = {
  createItem: require('../../../../../domain/usecases/createItem').createItem
}

const resolvers = {
  Mutation: {
    createItem: async (parent, args, context, _) => {
      const di = Object.assign({}, dependency, args.injection)
      const uc = di.createItem(args.injection)
      const hasAccess = uc.authorize(context.user)
      const response = await uc.run({
        description: args.description,
        listId: args.listId
      })

      if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
      return response.ok
    },
  },
}

module.exports = resolvers
