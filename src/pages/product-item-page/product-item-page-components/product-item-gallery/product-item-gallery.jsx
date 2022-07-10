import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import classes from './product-item-gallery.module.css';

import Loader from '../../../../components/UI/Loader/Loader';

import store from '../../../../store';
import { setActiveImgAction } from '../../../../store/reducers/itemElem-reducer/itemElem-actions';

class ProductItemCarousel extends PureComponent {
  render() {
    const {
      itemGallery,
    } = this.props;

    return (
      <div className={classes.productItemGallery}>
        {itemGallery
          ? (
            <div className={classes.productItemImgList}>
              {itemGallery.map((e) => (
                <div
                  aria-hidden
                  onClick={() => store.dispatch(setActiveImgAction(e))}
                  className={classes.imgBlock}
                  key={e}
                >
                  <img src={e} alt="img" />
                </div>
              ))}
            </div>
          )
          : <Loader />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itemElem: state.itemElemReducer.itemElem,
});

export default connect(mapStateToProps, null)(ProductItemCarousel);
