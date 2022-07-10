import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import classes from './BasketModal-item.module.css';

import Button from '../../../../Button/Button';

import store from '../../../../../../store';
import filterPriceBySelectedCurrency from '../../../../../../ulits/filterPriceBySelectedCurrency';
import attributesCompare from '../../../../../../ulits/AttributesCompare';
import {
  setBasketItemDicrementAction,
  setBasketItemIncrementAction,
}
  from '../../../../../../store/reducers/basket-reducer/basket-actions';
import Attributes from '../../../../../Attributes/attributes';

class BasketModalItem extends PureComponent {
  constructor(props) {
    super(props);

    this.incrementCount = this.incrementCount.bind(this);
    this.dicrementCount = this.dicrementCount.bind(this);
  }

  incrementCount() {
    const {
      item,
    } = this.props;
    const {
      id,
      activeAttributes,
    } = item;

    store.dispatch(setBasketItemIncrementAction({
      id,
      activeAttributes,
    }));
  }

  dicrementCount() {
    const {
      item,
    } = this.props;
    const {
      id,
      activeAttributes,
    } = item;

    store.dispatch(setBasketItemDicrementAction({
      id,
      activeAttributes,
    }));
  }

  render() {
    const {
      item,
      basketItemCollection,
      activeCurrency,
    } = this.props;
    const {
      id,
      name,
      gallery,
      brand,
      attributes,
      activeAttributes,
      prices,
    } = item;
    return (
      <li className={classes.mainBlockOfItem}>
        <div className={classes.itemBlock}>
          <div className={classes.infoBlock}>
            <div className={classes.infoBlockTitle}>
              <div>
                {brand}
              </div>
              <div>
                {name}
              </div>
            </div>
            <div className={classes.price}>
              {activeCurrency}
              {filterPriceBySelectedCurrency(
                activeCurrency,
                prices,
              ).amount}
            </div>
            <Attributes
              activeAttributes={activeAttributes}
              attributes={attributes}
              attributeItemStyle={classes.attributesElem_small}
              attributeItemStyleActive={classes.attributesElem_small_Active}
              type="modal"
              attributeTitle={classes.attributeTitleSmall}

            />
          </div>
          <div className={classes.counterBlock}>
            <div>
              <Button
                className={classes.counteChangeButton}
                onClick={this.incrementCount}
              >
                +
              </Button>
            </div>
            <div className={classes.counter}>
              {basketItemCollection[id]
                .find((e) => attributesCompare(e.attributes, activeAttributes)).counte}
            </div>
            <div>
              <Button
                className={classes.counteChangeButton}
                onClick={this.dicrementCount}
              >
                -
              </Button>
            </div>
          </div>
          <div className={classes.imageBlock}>
            <div className={classes.image}>
              <img src={gallery[0]} alt="img" />
            </div>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.categoryReducer.activeCategory,
  activeCurrency: state.currencyReducer.activeCurrency,
  basketItemCollection: state.basketReducer.basketItemCollection,
});

export default connect(mapStateToProps, null)(BasketModalItem);
