import React from 'react';
import Typography from 'material-ui/Typography';

export default ({ price, symbol }) => (
  <React.Fragment>
    <Typography type="title">{`1 ETH = ${price ? price : '...'} ${symbol}`}</Typography>
  </React.Fragment>
);
