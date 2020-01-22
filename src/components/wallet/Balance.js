import React from 'react';
import Typography from 'material-ui/Typography';

export default ({ name, balance, symbol }) => (
  <React.Fragment>
    <Typography type="subheading" gutterBottom>{`${name} Balance`}</Typography>
    <Typography type="title">{`${balance ? balance : '...'} ${symbol}`}</Typography>
  </React.Fragment>
);
