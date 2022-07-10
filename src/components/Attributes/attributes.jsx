import React, { PureComponent } from 'react';

import classes from './attributes.module.css';

class Attributes extends PureComponent {
  render() {
    const {
      activeAttributes,
      attributes,
      setAttributes,
      canChoose,
      attributeItemStyle,
      attributeItemStyleActive,
      attributeTitle,
      type,
    } = this.props;
    return (
      <div className={classes.attributes}>
        {attributes.map((e) => (
          <div key={e.name}>
            <h2 className={attributeTitle}>
              {e.name.toUpperCase()}
              :
            </h2>
            <div className={canChoose ? classes.attributeListCanChoose : classes.attributeList}>
              {e.name.toLowerCase() === 'color'
                ? e.items.map((elem) => (
                  <div
                    aria-hidden
                    key={elem.value}
                    onClick={setAttributes && (() => setAttributes(elem))}
                    className={canChoose
                      ? classes.attributeColorWrapper_canSelect
                      : classes.attributeColorWrapper}
                    style={{
                      border: activeAttributes.Color === elem.value && '1px gold solid',
                    }}
                  >
                    <div
                      style={{
                        background: `${elem.value}`,
                        border: ['#FFF', '#FFFFFF', 'white'].some((item) => item === elem.value)
                          ? '1px solid #e8e8e8'
                          : `1px solid ${elem.value}`,
                      }}
                      className={type === 'modal' ? classes.attributeColorModal : classes.attributeColor}
                    />

                  </div>
                ))
                : e.items.map((elem) => (
                  <div
                    aria-hidden
                    onClick={setAttributes && (() => setAttributes(elem))}
                    key={elem.value}
                    className={activeAttributes[e.name] === elem.value
                      ? attributeItemStyleActive
                      : attributeItemStyle}
                  >
                    {elem.value}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Attributes;
