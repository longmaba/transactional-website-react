import React from 'react';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'redux-little-router';

export default () => (
  <div>
    <Typography type="headline" gutterBottom>
      Link Expired!
    </Typography>
    <Typography gutterBottom>
      The confirmation link has been expired. Please try again.
    </Typography>
    <Button component={Link} href="/login" raised>Back</Button>
  </div>
);
