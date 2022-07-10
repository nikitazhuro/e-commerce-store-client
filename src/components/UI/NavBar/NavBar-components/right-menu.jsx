import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './right-menu.module.css';

import CurrencyModal from '../../Modal/CurrencyModal/CurrencyModal';
import BasketModal from '../../Modal/BasketModal/BasketModal';
import Button from '../../Button/Button';
import BasketList from '../../Modal/BasketModal/BasketModalFlow/BasketModal-ItemList/BasketModal-itemList';

import store from '../../../../store';
import { setActiveCurrencyAction } from '../../../../store/reducers/currency-reducer/currency-actions';
import filterPriceBySelectedCurrency from '../../../../ulits/filterPriceBySelectedCurrency';
import attributesCompare from '../../../../ulits/AttributesCompare';

class RightMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowCurrencyModal: false,
      isShowBasketModal: false,
    };
    this.showCurrencyModal = this.showCurrencyModal.bind(this);
    this.showBasketModal = this.showBasketModal.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
    this.calculateTotalItems = this.calculateTotalItems.bind(this);
  }

  showCurrencyModal() {
    const {
      isShowCurrencyModal,
    } = this.state;

    this.setState({ isShowCurrencyModal: !isShowCurrencyModal });
  }

  showBasketModal() {
    const {
      isShowBasketModal,
    } = this.state;

    this.setState({ isShowBasketModal: !isShowBasketModal });
  }

  calculateTotalPrice() {
    const {
      basketItems,
      basketItemCollection,
      activeCurrency,
    } = this.props;

    let totalPrice = 0;
    basketItems.forEach((elem) => {
      totalPrice += filterPriceBySelectedCurrency(
        activeCurrency,
        elem.prices,
      ).amount
        * basketItemCollection[elem.id]
          .find((e) => attributesCompare(e.attributes, elem.activeAttributes)).counte;
    });
    return totalPrice.toFixed(2);
  }

  calculateTotalItems() {
    const {
      basketItemCollection,
    } = this.props;

    let totalCounte = 0;

    const values = Object.values(basketItemCollection);

    for (let j = 0; j < values.length; j += 1) {
      for (let i = 0; i < values[j].length; i += 1) {
        totalCounte += values[j][i].counte;
      }
    }
    return totalCounte;
  }

  render() {
    const {
      currencyList,
      activeCurrency,
      basketItems,
    } = this.props;
    const {
      isShowBasketModal,
      isShowCurrencyModal,
    } = this.state;
    return (
      <div className={classes.rightMenuContent}>
        <div
          aria-hidden
          className={classes.currencyIcon}
          onClick={this.showCurrencyModal}
        >
          <span className={classes.activeCurrencyBlock}>
            <span className={classes.activeCurrencyMargin}>
              {activeCurrency}
            </span>
            {isShowCurrencyModal
              ? <img src="/ArrowUp.svg" alt="arrowDown" />
              : <img src="/ArrowDown.svg" alt="arrowDown" />}
          </span>
          <CurrencyModal showModal={this.showCurrencyModal} isShow={isShowCurrencyModal}>
            <div>
              <div className={classes.currencyModalBlock}>
                {currencyList.map((e) => (
                  <div
                    aria-hidden
                    className={classes.currencyElem}
                    key={e.label}
                    onClick={() => store.dispatch(setActiveCurrencyAction(e.symbol))}
                  >
                    {e.symbol}
                    {e.label}
                  </div>
                ))}
              </div>
            </div>
          </CurrencyModal>
        </div>
        <div aria-hidden onClick={this.showBasketModal}>
          <span className={classes.basketIcon}>
            <img src="/Basket.svg" alt="basket" />
            {basketItems.length > 0
              && (
                <span className={classes.basketCounter}>
                  {this.calculateTotalItems()}
                </span>
              )}
          </span>
          <BasketModal showModal={this.showBasketModal} isShow={isShowBasketModal}>
            <div className={classes.basketModalBlock}>
              <div className={classes.basketModalBlockParams}>
                <div className={classes.modalTitleBlock}>
                  My Bag,
                  <span>
                    <span className={classes.basketLength}>
                      {this.calculateTotalItems()}
                    </span>
                    <span>
                      items
                    </span>
                  </span>
                </div>
                <div className={classes.modalContentBlock}>
                  <div className={classes.modalContent}>
                    <BasketList basketItems={basketItems} />
                  </div>
                </div>
                <div className={classes.modalTotalBlock}>
                  <div className={classes.modalContent}>
                    <div className={classes.modalContentTotal}>
                      Total
                    </div>
                    <div className={classes.modalContentPrice}>
                      {activeCurrency}
                      {this.calculateTotalPrice()}
                    </div>
                  </div>
                </div>
                <div className={classes.modalBtnsBlock}>
                  <div className={classes.modalBtns}>
                    <Link to="/basket">
                      <Button className={classes.viewBagBtn}>
                        VIEW BAG
                      </Button>
                    </Link>
                    <Button className={classes.checkoutBtn}>
                      CHECK OUT
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </BasketModal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCurrency: state.currencyReducer.activeCurrency,
  currencyList: state.currencyReducer.currencyList,
  basketItems: state.basketReducer.basketItems,
  basketItemCollection: state.basketReducer.basketItemCollection,
});

export default connect(mapStateToProps, null)(RightMenu);
