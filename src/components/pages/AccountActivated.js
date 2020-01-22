import React from 'react';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'redux-little-router';

export default () => (
  <div>
    <Typography type="headline" gutterBottom>
      Account Activated!
    </Typography>
    <Typography gutterBottom>
      You've successfully activated your email. You can now login.
    </Typography>
    <Button component={Link} href="/" raised>Login</Button>
  </div>
);
