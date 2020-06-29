import gql from 'graphql-tag';

export const createList = gql`
    mutation Mutation($name: String!) {
        createList(name: $name) {
            id,
            name
        }
    }`
;