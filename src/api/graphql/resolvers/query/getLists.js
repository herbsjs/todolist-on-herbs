const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express')
const { getLists } = require('../../../../usecases/getLists')

function aUser({ hasAccess }) {
  return { canCreateList: hasAccess }
}

const resolvers = {
  Query: {
    getLists: async (parent, args) => {
      const uc = getLists()
      //TODO: authorize user
      const user = aUser({ hasAccess: true })
      uc.authorize(user)
      const response = await uc.run({ ids: args.ids })
      if (response.isOk) {
        return response.ok.value
      } else {
        throw new Error(response.err.message)
      }
    },
  },
}

module.exports = resolvers
