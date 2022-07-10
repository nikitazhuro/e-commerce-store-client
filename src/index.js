import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import App from './App';

import store from './store';

const client = new ApolloClient({
  uri: 'https://e-commerce-store-server.herokuapp.com/graphql',
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
