import gql from 'graphql-tag'

export const getTodos = gql`
  query {
    getLists(ids: []) {
        id,
        name
    }
  }
`