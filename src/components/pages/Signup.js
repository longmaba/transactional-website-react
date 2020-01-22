import React from 'react';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'redux-little-router';
import { CircularProgress } from 'material-ui/Progress';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      repassword: '',
      referralCode: ''
    };
  }
  componentWillReceiveProps(props) {
    if (props.referralCode) {
      this.set('referralCode', props.referralCode);
    }
  }
  set(field, value) {
    this.setState({
      ...this.state,
      [field]: value
    });
  }
  render() {
    let { email, password, username, repassword, referralCode } = this.state;
    let {
      classes,
      fullScreen,
      onSubmit,
      registrationError,
      sendingRegistration
    } = this.props;

    if (!registrationError) registrationError = {};

    return (
      <form
        style={{
          minWidth: !fullScreen ? '450px' : undefined
        }}
        autoComplete="off"
        className={classes.container}
        onSubmit={evt => {
          evt.preventDefault();
          email &&
            password &&
            password === repassword &&
            username &&
            onSubmit &&
            onSubmit(email, password, username, referralCode);
        }}>
        <Typography type="headline">
          Signup
        </Typography>
        <TextField
          fullWidth
          helperText={registrationError.username}
          error={registrationError.username}
          id="username"
          label="Username"
          value={username}
          required={true}
          onChange={evt => this.set('username', evt.target.value)}
          margin="normal"
          className={classes.textField}
          disabled={sendingRegistration}
        />
        <TextField
          fullWidth
          helperText={registrationError.email}
          error={registrationError.email}
          id="email"
          label="Email"
          type="email"
          value={email}
          required={true}
          onChange={evt => this.set('email', evt.target.value)}
          margin="normal"
          disabled={sendingRegistration}
          className={classes.textField}
        />
        <TextField
          fullWidth
          helperText={registrationError.password}
          error={registrationError.password}
          id="password"
          label="Password"
          type="password"
          required={true}
          value={password}
          onChange={evt => this.set('password', evt.target.value)}
          margin="normal"
          disabled={sendingRegistration}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="repassword"
          label="Retype Password"
          type="password"
          error={repassword !== password}
          helperText={repassword !== password && 'Does not match!'}
          required={true}
          value={repassword}
          onChange={evt => this.set('repassword', evt.target.value)}
          margin="normal"
          disabled={sendingRegistration}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="referral"
          label="Referral Code (Optional)"
          type="text"
          error={registrationError.referralCode}
          helperText={registrationError.referralCode}
          value={referralCode}
          onChange={evt => this.set('referralCode', evt.target.value)}
          margin="normal"
          disabled={sendingRegistration}
          className={classes.textField}
        />
        <input type="hidden" value={referralCode} />
        <Typography gutterBottom noWrap>
          Already have an account?
          {` `}
          <Button
            disabled={sendingRegistration}
            dense
            component={Link}
            href="/login"
            className={classes.button}>
            Login
          </Button>
        </Typography>
        <div>
          <Button
            disabled={sendingRegistration}
            raised
            color="primary"
            className={classes.button}
            type="submit">
            {sendingRegistration
              ? <CircularProgress size={20} color="accent" /> // Size 14 works pretty well
              : 'Signup'}
          </Button>
          <Button
            disabled={sendingRegistration}
            raised
            className={classes.button}
            onClick={() =>
              this.setState({
                username: '',
                email: '',
                password: '',
                repassword: ''
              })}>
            Reset
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
}))(SignupForm);
