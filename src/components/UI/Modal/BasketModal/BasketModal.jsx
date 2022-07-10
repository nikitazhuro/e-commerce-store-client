import React, { PureComponent } from 'react';

import classes from './BasketModal.module.css';

class BasketModal extends PureComponent {
  render() {
    const {
      isShow,
      showModal,
      children,
    } = this.props;
    const mixStyles = [classes.modal];
    if (isShow) {
      mixStyles.push(classes.Active);
    }
    return (
      <div
        aria-hidden
        className={mixStyles.join(' ')}
        onClick={() => showModal()}
      >
        <div
          aria-hidden
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default BasketModal;
