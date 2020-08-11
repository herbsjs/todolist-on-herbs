import gql from 'graphql-tag'

export const createList = gql`
    mutation ($name: String!) {
        createList(name: $name) {
            id,
            name
        }
    }
`