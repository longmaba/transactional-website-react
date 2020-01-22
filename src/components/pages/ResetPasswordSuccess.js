import React from 'react';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'redux-little-router';

export default () => (
  <div>
    <Typography type="headline" gutterBottom>
      Your password has been reset!
    </Typography>
    <Typography gutterBottom>
      Please check your email for your new password.
    </Typography>
    <Button component={Link} href="/login" raised>Login</Button>
  </div>
);
