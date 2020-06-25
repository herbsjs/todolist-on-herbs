import ApolloClient from 'apollo-boost';
import environment from '../../config/Config';
import { deleteTodoList } from '../schema/mutations/DeleteTodoList'

export const removeTodoList = (id) => {
    const client = new ApolloClient({ uri: environment.apiSettings.baseUrl });

    return client
        .mutate({ mutation: deleteTodoList, variables: { id: id.toString() }});
}
