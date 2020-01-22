import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

export default ({ startPrice, endPrice, packageName }) => (
  <Paper>
    <Typography>
      {packageName}
    </Typography>
    <Divider />
    <Typography>
      Price Range
    </Typography>
    <Typography>
      {startPrice} - {endPrice}
    </Typography>
  </Paper>
);
