import React from 'react';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'redux-little-router';

export default () => (
  <div>
    <Typography type="headline" gutterBottom>
      Confirm Email Address
    </Typography>
    <Typography gutterBottom>
      We've sent a confimation email to your address. We need to verify that this email address belongs to you. Check your email and follow the instructions.
    </Typography>
    <Button component={Link} href="/" raised>Go Back</Button>
  </div>
);
