import React, { Component } from 'react';

import classes from './basketPageCarousel.module.css';

class BasketCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next() {
    const {
      currentIndex,
    } = this.state;
    const {
      children,
    } = this.props;

    if (currentIndex < (children.props.children.length - 1)) {
      this.setState({
        currentIndex: currentIndex + 1,
      });
    }
  }

  prev() {
    const {
      currentIndex,
    } = this.state;
    if (currentIndex > 0) {
      this.setState({
        currentIndex: currentIndex - 1,
      });
    }
  }

  render() {
    const {
      currentIndex,
    } = this.state;
    const {
      children,
    } = this.props;

    return (
      <div className={classes.carouselContainer}>
        <div className={classes.carouselWrapper}>
          <div className={classes.carouselContentWrapper}>
            <div
              className={classes.carouselContent}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {children}
            </div>
          </div>
          {children.props.children.length > 1
            && (
              <div className={classes.navArrows}>
                <div
                  aria-hidden
                  onClick={this.prev}
                  className={classes.leftArrow}
                >
                  <span>
                    &lt;
                  </span>
                  <span className={classes.leftArrowMargin} />
                </div>
                <div
                  aria-hidden
                  onClick={this.next}
                  className={classes.rightArrow}
                >
                  <span className={classes.rightArrowMargin} />
                  <span>&gt;</span>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default BasketCarousel;
