import React from 'react';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      repassword: ''
    };
  }
  handleChange(field, value) {
    this.setState({
      [field]: value
    });
  }
  render() {
    const {
      classes,
      changeError,
      onSubmit,
      changingPassword,
      message
    } = this.props;
    const { oldPassword, newPassword, repassword } = this.state;
    return (
      <form
        autoComplete="off"
        className={classes.container}
        onSubmit={evt => {
          evt.preventDefault();
          oldPassword &&
            newPassword &&
            repassword === newPassword &&
            onSubmit &&
            onSubmit(oldPassword, newPassword);
        }}>
        <Typography type="headline" gutterBottom>
          Change Password
        </Typography>
        <Typography type="subheading" color="primary">
          {message}
        </Typography>
        <TextField
          fullWidth
          id="oldPassword"
          helperText={changeError}
          error={changeError}
          label="Current Password"
          type="password"
          value={oldPassword}
          required={true}
          onChange={evt => this.handleChange('oldPassword', evt.target.value)}
          margin="normal"
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="newPassword"
          label="Enter New Password"
          error={
            (newPassword.length < 7 && newPassword.length > 0) ||
              newPassword.length > 100
          }
          helperText={
            ((newPassword.length < 7 && newPassword.length > 0) ||
              newPassword.length > 100) &&
              'Password length should only be between 7 and 100 characters!'
          }
          type="password"
          required={true}
          value={newPassword}
          onChange={evt => this.handleChange('newPassword', evt.target.value)}
          margin="normal"
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="repassword"
          label="Retype Password"
          type="password"
          error={repassword !== newPassword}
          helperText={repassword !== newPassword && 'Does not match!'}
          required={true}
          value={repassword}
          onChange={evt => this.handleChange('repassword', evt.target.value)}
          margin="normal"
          className={classes.textField}
        />
        <div>
          <Button
            raised
            color="primary"
            className={classes.button}
            type="submit">
            {changingPassword
              ? <CircularProgress size={20} color="white" /> // Size 14 works pretty well
              : 'Change Password'}
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
}))(ChangePassword);
