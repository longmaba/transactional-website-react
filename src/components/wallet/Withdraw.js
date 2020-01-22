import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

export default () => (
  <div>
    <form>
      <Typography type="title">Withdraw (Coming soon)</Typography>
      <TextField
        fullWidth
        id="address"
        label="Address"
        required={true}
        margin="normal"
        disabled
      />
      <TextField
        fullWidth
        id="amount"
        label="Amount"
        required={true}
        margin="normal"
        disabled
      />
      <TextField disabled fullWidth id="2fa" label="2FA" margin="normal"/>
      <Button color="primary" raised>
        Submit
      </Button>
    </form>
  </div>
);
