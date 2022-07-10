import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import xss from 'xss';

import classes from './product-item-content.module.css';

import Button from '../../../../components/UI/Button/Button';
import BasketCarousel from '../../../basket-page/basket-page-carousel/basket-page-carousel';
import withRouter from '../../../../components/withRouter';

import store from '../../../../store';
import filterPriceBySelectedCurrency from '../../../../ulits/filterPriceBySelectedCurrency';
import {
  setBasketItemAction,
} from '../../../../store/reducers/basket-reducer/basket-actions';
import { setActiveImgAction } from '../../../../store/reducers/itemElem-reducer/itemElem-actions';
import Attributes from '../../../../components/Attributes/attributes';

class ProductItemContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeImg: '',
      attributes: [],
      activeAttributes: {},
    };
    this.addToBasket = this.addToBasket.bind(this);
    this.setAttributes = this.setAttributes.bind(this);
    this.setStartAttributes = this.setStartAttributes.bind(this);
  }

  componentDidMount() {
    const {
      itemElem,
    } = this.props;
    const {
      gallery,
      attributes,
    } = itemElem;

    if (gallery.length) {
      this.setState({
        activeImg: gallery[0],
      });
    }
    if (attributes.length) {
      this.setStartAttributes();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      itemElem,
      params,
      activeImg,
    } = this.props;
    const {
      id,
      attributes,
      gallery,
    } = itemElem;

    if (prevProps.itemElem.id !== id) {
      if (attributes.length) {
        this.setStartAttributes();
      }
    }
    if (prevProps.params.id !== params.id) {
      if (attributes.length) {
        this.setStartAttributes();
      }
      this.setState({
        activeImg: gallery[0],
        activeAttributes: {},
      });
      store.dispatch(setActiveImgAction(''));
    } else {
      this.setState({
        activeImg: activeImg || gallery[0],
      });
    }
  }

  componentWillUnmount() {
    store.dispatch(setActiveImgAction(''));
  }

  setStartAttributes() {
    const {
      itemElem,
    } = this.props;
    const {
      attributes,
    } = itemElem;

    const arr = JSON.parse(JSON.stringify(attributes));

    arr.forEach((e) => {
      e.items.forEach((elem) => {
        const el = elem;
        el.id = e.name;
        return el;
      });
    });

    this.setState({
      attributes: [...arr],
    });
  }

  setAttributes(e) {
    const {
      activeAttributes,
    } = this.state;

    this.setState({
      activeAttributes: { ...activeAttributes, [e.id]: e.value },
    });
  }

  addToBasket() {
    const {
      itemElem,
    } = this.props;
    const {
      activeAttributes,
      attributes,
    } = this.state;
    const {
      id,
      name,
      brand,
      gallery,
      prices,
    } = itemElem;

    const newBasketItem = {
      id,
      name,
      brand,
      gallery,
      prices,
      attributes,
      activeAttributes,
    };
    if (Object.keys(activeAttributes).length === attributes.length) {
      store.dispatch(setBasketItemAction(newBasketItem));
    }
  }

  render() {
    const {
      activeAttributes,
      activeImg,
      attributes,
    } = this.state;
    const {
      itemElem,
      activeCurrency,
    } = this.props;
    const {
      name,
      brand,
      gallery,
      prices,
      inStock,
      description,
    } = itemElem;

    const html = xss(description);

    return (
      <div className={classes.productItemContent}>
        <div className={classes.productItemImage}>
          <div className={classes.productItemImageContent}>
            <div className={classes.imgBlock}>
              <img src={activeImg} alt="img" />
            </div>
            <div className={classes.productItemCarousel}>
              <BasketCarousel>
                <>
                  {gallery.map((elem) => (
                    <div
                      key={elem}
                      className={classes.carouselItemBlock}
                    >
                      <img src={elem} alt="basketImg" />
                    </div>
                  ))}
                </>
              </BasketCarousel>
            </div>
          </div>
        </div>
        <div className={classes.infoCard}>
          <div className={classes.infoCardContent}>
            <div className={classes.infoCardTitle}>
              <div className={classes.brandName}>
                {brand}
              </div>
              <div className={classes.titleName}>
                {name}
              </div>
            </div>
            <div>
              <Attributes
                canChoose
                attributes={attributes}
                activeAttributes={activeAttributes}
                attributeItemStyle={classes.attributesElem_large}
                attributeItemStyleActive={classes.attributesElem_large_Active}
                attributeTitle={classes.attributeTitleLarge}
                setAttributes={this.setAttributes}
              />
            </div>
            <div>
              <div>
                <h2 className={classes.priceName}>
                  PRICE:
                </h2>
                <h2 className={classes.selectedCurrency}>
                  {activeCurrency}
                  {filterPriceBySelectedCurrency(activeCurrency, prices).amount}
                </h2>
              </div>
            </div>
            <div className={classes.addBtn}>
              {inStock
                ? (
                  <Button
                    className={classes.confirmButton}
                    onClick={this.addToBasket}
                  >
                    ADD TO CART
                  </Button>
                )
                : (
                  <h2 className={classes.outOfStock}>
                    OUT OF STOCK
                  </h2>
                )}
            </div>
            <div
              className={classes.innerHTML}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCurrency: state.currencyReducer.activeCurrency,
  itemElem: state.itemElemReducer.itemElem,
  activeImg: state.itemElemReducer.activeImg,
  basketItemCollection: state.basketReducer.basketItemCollection,
  basketItems: state.basketReducer.basketItems,
});

export default withRouter(connect(mapStateToProps, null)(ProductItemContent));
