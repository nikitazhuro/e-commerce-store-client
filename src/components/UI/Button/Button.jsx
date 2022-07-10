import React, { PureComponent } from 'react';

class Button extends PureComponent {
  render() {
    const {
      children,
    } = this.props;
    return (
      <button
        type="button"
        {...this.props}
      >
        {children}
      </button>
    );
  }
}

export default Button;
