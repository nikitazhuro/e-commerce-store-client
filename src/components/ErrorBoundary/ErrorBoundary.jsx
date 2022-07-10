import React, { Component } from 'react';

class ErrorDefender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  componentDidCatch() {
    this.setState({ isError: true });
  }

  render() {
    const {
      isError,
    } = this.state;
    const {
      children,
    } = this.props;

    if (
      isError) {
      return (
        <div>
          Error
        </div>
      );
    }
    return children;
  }
}

export default ErrorDefender;
