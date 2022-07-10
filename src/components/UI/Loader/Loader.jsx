import React from 'react';

import classes from './Loader.module.css';

export default function Loader() {
  return (
    <div className={classes.loaderWrapper}>
      <div className={classes.loaderOut}>
        <div className={classes.loaderIn} />
      </div>
    </div>
  );
}
