import React from 'react';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { Link } from 'redux-little-router';

export default () => (
  <div>
    <Typography type="headline" gutterBottom>
      404
    </Typography>
    <Typography gutterBottom>
      The page you are looking for doesn't exist!
    </Typography>
    <Button component={Link} href="/">Go Back</Button>
  </div>
);
