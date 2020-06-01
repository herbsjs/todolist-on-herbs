import gql from 'graphql-tag';

export default gql`
  mutation UpdateListMutation($id: Int!, $name: String!) {
    updateList(id: $id, name: $name) {
      id
      name
    }
  }
`;
