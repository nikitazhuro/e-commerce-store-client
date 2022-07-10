import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import client from '.';

import './App.css';

import ErrorDefender from './components/ErrorBoundary/ErrorBoundary';
import Loader from './components/UI/Loader/Loader';
import AppRouter from './components/AppRouter/AppRouter';
import withRouter from './components/withRouter';

import store from './store';
import getCategoryList from './query/categories';
import getCurrencyList from './query/currencies';
import { setCategoryListAction } from './store/reducers/category-reducer/category-actions';
import { setActiveCurrencyAction, setCurrencyListAction } from './store/reducers/currency-reducer/currency-actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    client.query({ query: getCategoryList }).then((response) => {
      store.dispatch(setCategoryListAction(response.data.categories));
    });
    client.query({ query: getCurrencyList }).then((response) => {
      store.dispatch(setCurrencyListAction(response.data.currencies));
      store.dispatch(setActiveCurrencyAction(response.data.currencies[0].symbol));
    }).then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const {
      isLoading,
    } = this.state;

    if (isLoading) {
      return (
        <Loader />
      );
    }
    return (
      <div className="App">
        <ErrorDefender>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ErrorDefender>
      </div>
    );
  }
}

export default withRouter(App);
