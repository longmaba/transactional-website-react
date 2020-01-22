import React from 'react';

export default Component => props =>
  (props.hidden ? null : <Component {...props} />);
