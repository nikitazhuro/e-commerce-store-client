import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import classes from './basket-page.module.css';

import NavBar from '../../components/UI/NavBar/NavBar';
import BasketPageItemList from './basket-page-list/basket-page-list';

class BasketPage extends PureComponent {
  render() {
    const {
      basketItems,
    } = this.props;

    return (
      <div>
        <NavBar />
        <div className={classes.basketPage}>
          <h1>CART</h1>
        </div>
        <div className={classes.basketListWrapper}>
          <BasketPageItemList basketItems={basketItems} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  basketItems: state.basketReducer.basketItems,
  activeCurrency: state.currencyReducer.activeCurrency,
});

export default connect(mapStateToProps, null)(BasketPage);
