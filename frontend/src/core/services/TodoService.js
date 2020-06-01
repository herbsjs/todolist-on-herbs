import ApolloClient from 'apollo-boost';
import environment from '../../config/Config';
import { createList, updateList } from '../schema/mutations/Connector';

const addTodoList = (item) => {
  const client = new ApolloClient({ uri: environment.apiSettings.baseUrl });

  return client.mutate({ mutation: createList, variables: { name: item.text } });
};

const updateTodoList = (item) => {
  const client = new ApolloClient({ uri: environment.apiSettings.baseUrl });

  return client.mutate({ mutation: updateList, variables: { name: item.name, id: parseInt(item.id, 10) } });
};

export { updateTodoList, addTodoList };
