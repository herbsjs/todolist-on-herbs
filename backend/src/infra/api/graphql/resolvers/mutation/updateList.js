const { UserInputError } = require('apollo-server-express')

const dependency = {
  updateList: require('../../../../../domain/usecases/updateList').updateList,
}

const resolvers = {
  Mutation: {
    updateList: async (parent, args) => {
      const di = Object.assign({}, dependency, args.injection)
      const uc = di.updateList(args.injection)
      const hasAccess = uc.authorize({ canCreateList: true }) // TODO: authorize user
      const response = await uc.run({ id: args.id, name: args.name })

      if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
      return response.ok
    }
  }
}

module.exports = resolvers
