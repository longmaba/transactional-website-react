import React from 'react';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { Link } from 'redux-little-router';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    tfa: ''
  };
  handleChange(field, value) {
    this.setState({
      [field]: value
    });
  }
  render() {
    const {
      classes,
      fullScreen,
      onSubmit,
      loginError,
      unactivated,
      onResendActivation,
      loggingIn
    } = this.props;
    const { email, password, tfa } = this.state;
    return (
      <form
        style={{
          minWidth: !fullScreen ? '450px' : undefined
        }}
        autoComplete="off"
        className={classes.container}
        onSubmit={evt => {
          evt.preventDefault();
          email && password && onSubmit && onSubmit(email, password, tfa);
        }}>
        <Typography type="headline" gutterBottom>
          Login
        </Typography>
        <Typography type="subheading" color="error">
          {loginError}
          {unactivated &&
            <Button onClick={() => onResendActivation(email)}>
              Resend Activation
            </Button>}
        </Typography>
        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
          value={email}
          required={true}
          onChange={evt => this.handleChange('email', evt.target.value)}
          margin="normal"
          className={classes.textField}
          disabled={loggingIn}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          required={true}
          value={password}
          onChange={evt => this.handleChange('password', evt.target.value)}
          margin="normal"
          className={classes.textField}
          disabled={loggingIn}
        />
        <TextField
          fullWidth
          id="2fa"
          label="2FA (If enabled)"
          type="number"
          required={false}
          value={tfa}
          onChange={evt => this.handleChange('tfa', evt.target.value)}
          margin="normal"
          className={classes.textField}
          disabled={loggingIn}
        />
        <Typography gutterBottom noWrap>
          Don't have an account?
          {` `}
          <Button
            className={classes.button}
            dense
            component={Link}
            href="/signup">
            Signup
          </Button>
        </Typography>
        <Typography gutterBottom noWrap>
          Forgot your password?
          {` `}
          <Button
            className={classes.button}
            dense
            component={Link}
            href="/resetPassword/request">
            Reset
          </Button>
        </Typography>
        <div>
          <Button
            raised
            color="primary"
            className={classes.button}
            type="submit">
            {loggingIn
              ? <CircularProgress size={20} color="accent" /> // Size 14 works pretty well
              : 'Login'}
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(theme => ({
  button: {
    margin: theme.spacing.unit
  }
}))(LoginForm);
