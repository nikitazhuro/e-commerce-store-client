import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './basket-page-item.module.css';

import BasketCarousel from '../basket-page-carousel/basket-page-carousel';
import Button from '../../../components/UI/Button/Button';

import store from '../../../store';
import { setBasketItemDicrementAction, setBasketItemIncrementAction } from '../../../store/reducers/basket-reducer/basket-actions';
import attributesCompare from '../../../ulits/AttributesCompare';
import filterPriceBySelectedCurrency from '../../../ulits/filterPriceBySelectedCurrency';
import Attributes from '../../../components/Attributes/attributes';

class BasketPageItem extends Component {
  constructor(props) {
    super(props);
    this.incrementCount = this.incrementCount.bind(this);
    this.dicrementCount = this.dicrementCount.bind(this);
  }

  incrementCount() {
    const {
      basketItem,
    } = this.props;
    const {
      id,
      activeAttributes,
    } = basketItem;

    store.dispatch(setBasketItemIncrementAction({
      id,
      activeAttributes,
    }));
  }

  dicrementCount() {
    const {
      basketItem,
    } = this.props;
    const {
      id,
      activeAttributes,
    } = basketItem;

    store.dispatch(setBasketItemDicrementAction({
      id,
      activeAttributes,
    }));
  }

  render() {
    const {
      basketItem,
      activeCategory,
      basketItemCollection,
      activeCurrency,
    } = this.props;
    const {
      id,
      attributes,
      activeAttributes,
      brand,
      name,
      prices,
      gallery,
    } = basketItem;

    return (
      <li className={classes.mainBlockOfItem}>
        <div className={classes.itemBlock}>
          <div className={classes.infoAndCounterBlock}>
            <div className={classes.infoBlock}>
              <Link to={`/${activeCategory}/${name}/${id}`}>
                <div className={classes.brand}>
                  {brand}
                </div>
                <div className={classes.name}>
                  {name}
                </div>
              </Link>
              <div className={classes.price}>
                {activeCurrency}
                {filterPriceBySelectedCurrency(
                  activeCurrency,
                  prices,
                ).amount}
              </div>
              <Attributes
                attributes={attributes}
                activeAttributes={activeAttributes}
                attributeItemStyle={classes.attributesElem_medium}
                attributeItemStyleActive={classes.attributesElem_medium_Active}
                attributeTitle={classes.attributeTitleMedium}
              />
            </div>
            <div className={classes.counterBlock}>
              <div className={classes.counterBlockContent}>
                <div>
                  <Button
                    className={classes.counteChangeButton}
                    onClick={this.incrementCount}
                  >
                    +
                  </Button>
                </div>
                <div>
                  {basketItemCollection[id]
                    .filter((e) => attributesCompare(e.attributes, activeAttributes))[0].counte}
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
            </div>
          </div>
          <div className={classes.image}>
            <BasketCarousel>
              <>
                {gallery.map((elem) => (
                  <div
                    key={elem}
                    className={classes.basketCarouselItem}
                  >
                    <img src={elem} alt="basketImg" />
                  </div>
                ))}
              </>
            </BasketCarousel>
          </div>
        </div>
      </li>
    );
  }
}
const mapStateToProps = (state) => ({
  activeCurrency: state.currencyReducer.activeCurrency,
  basketItemCollection: state.basketReducer.basketItemCollection,
  activeCategory: state.categoryReducer.activeCategory,
});

export default connect(mapStateToProps, null)(BasketPageItem);
