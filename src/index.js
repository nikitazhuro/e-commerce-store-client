/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import App from './App';

import store from './store';

const deployUrl = 'https://e-commerce-store-server.herokuapp.com/graphql';
const localUrl = 'http://localhost:4000/graphql';

const client = new ApolloClient({
  uri: deployUrl,
  cache: new InMemoryCache(),
});
export default client;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
