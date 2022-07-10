import React, { lazy, PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';

import classes from './product-page.module.css';

import withRouter from '../../components/withRouter';
import Loader from '../../components/UI/Loader/Loader';
import NavBar from '../../components/UI/NavBar/NavBar';

import client from '../..';
import { getItemById } from '../../query/items';
import store from '../../store';
import { setItemElem } from '../../store/reducers/itemElem-reducer/itemElem-actions';

const ProductItemContent = lazy(() => import('./product-item-page-components/product-item-content/product-item-content'));
const ProductItemCarousel = lazy(() => import('./product-item-page-components/product-item-gallery/product-item-gallery'));

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.setItemAction = this.setItemAction.bind(this);
  }

  componentDidMount() {
    this.setItemAction()
      .then(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(prevProps) {
    const {
      params,
    } = this.props;
    const {
      id,
    } = params;

    if (prevProps.params.id !== id) {
      this.setItemAction();
    }
  }

  setItemAction() {
    const {
      params,
    } = this.props;
    const {
      id,
    } = params;

    return new Promise((res) => {
      res(client.query({ query: getItemById, variables: { id } }));
    }).then((response) => {
      store.dispatch(setItemElem(response.data.product));
    });
  }

  render() {
    const {
      isLoading,
    } = this.state;
    const {
      itemElem,
    } = this.props;
    const {
      gallery,
    } = itemElem;

    if (isLoading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <NavBar />
        <div className={classes.itemElemContainer}>
          <Suspense fallback={<Loader />}>
            <ProductItemCarousel itemGallery={gallery} />
            <ProductItemContent />
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itemElem: state.itemElemReducer.itemElem,
});

export default withRouter(connect(mapStateToProps, null)(ProductPage));
