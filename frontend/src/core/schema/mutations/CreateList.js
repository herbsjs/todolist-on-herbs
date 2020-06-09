import gql from 'graphql-tag';

export default gql`
  mutation CreateListMutation($name: String!) {
    createList(name: $name) {
      id
      name
    }
  }
`;
