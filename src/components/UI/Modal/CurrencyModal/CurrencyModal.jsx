import React, { PureComponent } from 'react';

import classes from './CurrencyModal.module.css';

class CurrencyModal extends PureComponent {
  render() {
    const {
      isShow,
      showModal,
      children,
    } = this.props;
    const mixStyles = [classes.Modal];
    if (isShow) {
      mixStyles.push(classes.Active);
    }
    return (
      <div
        aria-hidden
        className={mixStyles.join(' ')}
        onClick={() => showModal()}
      >
        <div className={classes.ModalContent}>
          {children}
        </div>
      </div>
    );
  }
}

export default CurrencyModal;
