const { UserInputError } = require('apollo-server-express')

const dependency = {
  createList: require('../../../../usecases/createList').createList,
}

const resolvers = {
  Mutation: {
    createList: async (parent, args) => {
      const di = Object.assign({}, dependency, args.injection)
      const uc = di.createList(args.injection)
      const hasAccess = uc.authorize({ canCreateList: true }) // TODO: authorize user
      const response = await uc.run({ name: args.name })

      if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
      return response.ok
    }
  }
}

module.exports = resolvers
