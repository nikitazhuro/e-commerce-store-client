import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './NavBar.module.css';

import CategoriesMenu from './NavBar-components/categories-menu';
import RightMenu from './NavBar-components/right-menu';

class NavBar extends PureComponent {
  render() {
    const {
      activeCategory,
    } = this.props;

    return (
      <div className={classes.navBar}>
        <div className={classes.navBarWrapper}>
          <div className={classes.navBarcontent}>
            <CategoriesMenu />
            <Link to={`/${activeCategory}`} className={classes.navBarContentLogo}>
              <img src="/a-logo.svg" alt="logo" />
            </Link>
            <RightMenu />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.categoryReducer.activeCategory,
});

export default connect(mapStateToProps, null)(NavBar);
