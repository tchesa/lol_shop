import React from 'react';

import classes from './Root.module.css';
import Shop from '../shop/Shop';

function Root() {
  return (
    <div className={classes.Root}>
      <Shop />
    </div>
  );
}

export default Root;
