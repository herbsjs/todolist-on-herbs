const { createList } = require('../../../../usecases/createList')

function aUser({ hasAccess }) {
  return { canCreateList: hasAccess }
}

const resolvers = {
  Mutation: {
    createList: async (parent, args) => {
      const uc = createList()
      // TODO: authorize user
      const user = aUser({ hasAccess: true })
      uc.authorize(user)
      const response = await uc.run({ name: args.name })

      if (response.isOk) {
        return response.ok.value
      }
      throw new Error(response.err.message)
    }
  }
}

module.exports = resolvers
