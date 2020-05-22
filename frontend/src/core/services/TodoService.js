import ApolloClient from 'apollo-boost';
import environment from '../../config/Config';
import { createList } from '../schema/mutations/CreateList'

export const addTodoListApollo = (item, client2) => {
    const client = new ApolloClient({ uri: environment.apiSettings.baseUrl });

    return client
        .mutate({ mutation: createList, variables: { name: item.text }});
}