import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from '../NavBar.module.css';

import store from '../../../../store';
import { setActiveCategoryAction } from '../../../../store/reducers/category-reducer/category-actions';

import withRouter from '../../../withRouter';

class CategoriesMenu extends PureComponent {
  componentDidMount() {
    const {
      params,
      categoryList,
    } = this.props;
    const {
      category,
    } = params;

    store.dispatch(setActiveCategoryAction((categoryList.some((e) => e.name === category) && category) || 'all'));
  }

  render() {
    const {
      activeCategory,
      categoryList,
    } = this.props;

    return (
      <div className={classes.navBarContentCategories}>
        {categoryList.map((e) => (
          <Link
            key={e.name}
            to={`/${e.name}`}
            className={activeCategory === e.name ? classes.item_Active : classes.item}
            onClick={() => store.dispatch(setActiveCategoryAction(e.name))}
          >
            {e.name}
          </Link>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.categoryReducer.activeCategory,
  categoryList: state.categoryReducer.categoryList,
});

export default withRouter(connect(mapStateToProps, null)(CategoriesMenu));
