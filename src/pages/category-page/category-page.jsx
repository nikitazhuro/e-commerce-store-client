import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import classes from './category-page.module.css';

import ItemList from '../../components/ItemFlow/ItemList/ItemList';
import NavBar from '../../components/UI/NavBar/NavBar';
import withRouter from '../../components/withRouter';

import client from '../..';
import { getItemListByCategory } from '../../query/items';

class CategoryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
    };
  }

  componentDidMount() {
    const {
      categoryList,
      params,
    } = this.props;
    const {
      category,
    } = params;
    client.query({
      query: getItemListByCategory,
      variables: { id: (categoryList.some((e) => e.name === category) && category) || 'all' },
    }).then((response) => {
      this.setState({
        itemList: [...response.data.category.products],
      });
    });
  }

  componentDidUpdate(prevProps) {
    const {
      activeCategory,
      params,
    } = this.props;
    const {
      category,
    } = params;

    if (prevProps.params.category !== category) {
      client.query({
        query: getItemListByCategory,
        variables: { id: activeCategory },
      }).then((response) => {
        this.setState({
          itemList: [...response.data.category.products],
        });
      });
    }
  }

  render() {
    const {
      itemList,
    } = this.state;
    const {
      activeCategory,
    } = this.props;
    return (
      <div>
        <NavBar />
        <div className={classes.categoryTitle}>
          <div className={classes.categoryTitleWrapper}>
            {activeCategory}
          </div>
        </div>
        <div>
          <ItemList itemList={itemList} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.categoryReducer.activeCategory,
  categoryList: state.categoryReducer.categoryList,
});

export default withRouter(connect(mapStateToProps, null)(CategoryPage));
