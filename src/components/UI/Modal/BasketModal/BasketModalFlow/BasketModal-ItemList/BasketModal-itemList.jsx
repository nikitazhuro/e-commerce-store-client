import React, { PureComponent } from 'react';
import { v4 } from 'uuid';

import classes from './BasketModal-itemList.module.css';

import BasketModalItem from '../BasketModal-Item/BasketModal-item';

class BasketList extends PureComponent {
  render() {
    const {
      basketItems,
    } = this.props;

    return (
      <div className={classes.basketListWrapper}>
        <ul className={classes.basketList}>
          {basketItems.map((elem) => (
            <BasketModalItem item={elem} key={v4()} />
          ))}
        </ul>
      </div>
    );
  }
}

export default BasketList;
