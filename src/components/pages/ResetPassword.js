import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { Link } from 'redux-little-router';

const ResetPasswordForm = ({ classes, fullScreen, onSubmit, resetMessage }) => {
  let email;
  return (
    <React.Fragment>
      <form
        style={{
          minWidth: !fullScreen ? '450px' : undefined
        }}
        autoComplete="off"
        className={classes.container}
        onSubmit={evt => {
          evt.preventDefault();
          email && onSubmit && onSubmit(email);
        }}>
        <Typography type="headline" gutterBottom>
          Reset Password
        </Typography>
        <Typography type="subheading" color="error">
          {resetMessage}
        </Typography>
        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
          value={email}
          required={true}
          onChange={evt => (email = evt.target.value)}
          margin="normal"
          className={classes.textField}
        />
        <div>
          <Button
            dense
            component={Link}
            href="/login"
            className={classes.button}>
            Back to Login
          </Button>
        </div>
        <div>
          <Button
            raised
            color="primary"
            className={classes.button}
            type="submit">
            Reset Password
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default withStyles(theme => ({
  button: {
    margin: theme.spacing.unit
  }
}))(ResetPasswordForm);
