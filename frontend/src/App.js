import './App.css';
import './core/redux/saga/Reactotron';

import ApolloClient from 'apollo-boost';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import environment from './config/Config';
import { store } from './core/redux/store/Index';
import history from './extensions/history';
import Routes from './routes';

const client = new ApolloClient({ uri: environment.apiSettings.baseUrl });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
