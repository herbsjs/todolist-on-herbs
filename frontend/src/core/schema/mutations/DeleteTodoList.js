import gql from 'graphql-tag';

export const deleteTodoList = gql`
    mutation Mutation($id: String!) {
      deleteList(id: $id) {
            id,
            name
        }
    }`
