const { UserInputError } = require('apollo-server-express')

const dependency = {
  createItem: require('../../../../domain/usecases/createItem').createItem
}

const schema = `extend type Mutation {
  createItem(description: String!, listId: Int!): Item
}`

const resolver = {
  Mutation: {
    createItem: async (parent, args, context, _) => {

      const di = Object.assign({}, dependency, args.injection)
      const usecase = di.createItem(args.injection)

      /* Authorization */
      const hasAccess = usecase.authorize(context.user)
      if (hasAccess === false) {
        // eslint-disable-next-line no-console
        console.info(usecase.auditTrail)
        throw new ForbiddenError()
      }

      /* Execution */
      const response = await usecase.run({
        description: args.description,
        listId: args.listId
      })

      /* Audit */
      // eslint-disable-next-line no-console
      console.info(usecase.auditTrail)

      /* Response */
      if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
      return response.ok
    },
  },
}

module.exports = [schema, resolver]
