import React, { PureComponent } from 'react';

import classes from './ItemList.module.css';

import ItemFlow from '../ItemComponent/ItemComponent';

export default class ItemList extends PureComponent {
  render() {
    const {
      itemList,
    } = this.props;
    return (
      <div className={classes.itemListWrapper}>
        <ul className={classes.itemList}>
          {itemList.map((elem) => (
            <ItemFlow item={elem} key={elem.id} />
          ))}
        </ul>
      </div>
    );
  }
}
