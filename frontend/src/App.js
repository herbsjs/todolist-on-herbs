import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import './App.css';
import history from './extensions/history';
import { Provider } from 'react-redux'
import  { store} from  './core/redux/store/Index';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import environment from './config/Config';
import './core/redux/saga/Reactotron'

const client = new ApolloClient({ uri: environment.apiSettings.baseUrl });

function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;