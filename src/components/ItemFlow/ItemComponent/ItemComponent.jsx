import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './ItemComponent.module.css';

import store from '../../../store';
import filterPriceBySelectedCurrency from '../../../ulits/filterPriceBySelectedCurrency';
import { setBasketItemAction } from '../../../store/reducers/basket-reducer/basket-actions';

class ItemFlow extends PureComponent {
  constructor(props) {
    super(props);
    this.addToBasket = this.addToBasket.bind(this);
  }

  addToBasket(e) {
    e.preventDefault();
    const {
      item,
    } = this.props;
    const {
      id,
      name,
      brand,
      gallery,
      prices,
      attributes,
    } = item;
    const chooseAttributes = () => {
      const newAttributes = {};
      attributes.forEach((elem) => {
        newAttributes[elem.name] = elem.items[0].value;
      });
      return newAttributes;
    };

    const newBasketItem = {
      id,
      name,
      brand,
      gallery,
      prices,
      attributes,
      activeAttributes: attributes.length > 0 ? chooseAttributes() : {},
    };
    store.dispatch(setBasketItemAction(newBasketItem));
  }

  render() {
    const {
      activeCategory,
      activeCurrency,
      item,
    } = this.props;
    const {
      id,
      name,
      inStock,
      gallery,
      prices,
      brand,
    } = item;

    return (
      <li className={classes.mainBlockOfItem}>
        <Link
          to={`/${activeCategory}/${name}/${id}`}
          className={inStock
            ? classes.itemElem
            : classes.itemElemOpacity}
        >
          <div className={classes.itemBlock}>
            <div className={classes.image}>
              <div className={classes.imageContent}>
                <img src={gallery[0]} alt="img" />
                {!inStock
                  ? (
                    <div className={classes.outOfStock}>
                      OUT OF STOCK
                    </div>
                  )
                  : (
                    <div
                      aria-hidden
                      onClick={(e) => this.addToBasket(e)}
                      className={classes.addToBasketBtn}
                    >
                      <img src="/BasketWhite.svg" alt="basket" />
                    </div>
                  )}
              </div>
            </div>
            <div className={classes.itemName}>
              <div>
                {`${brand} ${name}`}
              </div>
              <div className={classes.itemPrice}>
                {activeCurrency}
                {filterPriceBySelectedCurrency(activeCurrency, prices)?.amount}
              </div>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.categoryReducer.activeCategory,
  activeCurrency: state.currencyReducer.activeCurrency,
});

export default connect(mapStateToProps, null)(ItemFlow);
