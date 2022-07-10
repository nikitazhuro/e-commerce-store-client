import React, { PureComponent } from 'react';
import { v4 } from 'uuid';

import classes from './basket-page-list.module.css';

import BasketPageItem from '../basket-page-item/basket-page-item';

class BasketPageItemList extends PureComponent {
  render() {
    const {
      basketItems,
    } = this.props;

    return (
      <div className={classes.basketPageItemList}>
        <ul className={classes.basketList}>
          {basketItems.map((e) => (
            <BasketPageItem key={v4()} basketItem={e} />
          ))}
        </ul>
      </div>
    );
  }
}

export default BasketPageItemList;
