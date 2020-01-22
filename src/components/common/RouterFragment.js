import React from 'react';

import { Fragment } from 'redux-little-router';

export default ({ children, ...props }) => (
  <Fragment {...props}>
    <React.Fragment>{children}</React.Fragment>
  </Fragment>
);
