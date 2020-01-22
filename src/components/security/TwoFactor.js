import React from 'react';
import QRCode from 'qrcode.react';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center'
  }),
  container: {
    textAlign: 'center'
  },
  qrWrapper: {
    background: 'white',
    padding: '0.5em',
    margin: '0.5em',
    display: 'inline-block'
  }
});

const EnableTwoFactor = ({
  tfa,
  onEnable,
  performingAction,
  enableError,
  classes
}) => {
  let token;
  return (
    <React.Fragment>
      <Typography type="headline" gutterBottom>
        Two Factor Setup
      </Typography>
      <Typography gutterBottom type="subheading">
        Scan the following QRCode with your authenticator:
      </Typography>
      <div className={classes.container}>
        <div className={classes.qrWrapper}>
          <QRCode value={tfa.otpauthURL} />
        </div>
      </div>
      <div>
        <Paper className={classes.root}>
          Secret Key: {tfa.base32}
        </Paper>
      </div>
      <form
        autoComplete="off"
        onSubmit={evt => {
          evt.preventDefault();
          token && onEnable && onEnable(tfa.base32, token);
        }}>
        <TextField
          fullWidth
          id="token"
          helperText={enableError}
          error={enableError}
          label="2FA token"
          type="number"
          value={token}
          required={true}
          onChange={evt => (token = evt.target.value)}
          margin="normal"
        />
        <div>
          <Button raised color="primary" type="submit">
            {performingAction
              ? <CircularProgress size={20} color="white" /> // Size 14 works pretty well
              : 'Enable 2FA'}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

const DisableTwoFactor = ({ onDisable, performingAction }) => (
  <React.Fragment>
    <Typography type="title" gutterBottom>
      Two Factor Authentication Setup
    </Typography>
    <Typography gutterBottom>Disable 2FA verification</Typography>
    <Button
      raised
      color="primary"
      type="submit"
      onClick={() => onDisable && onDisable()}>
      {performingAction
        ? <CircularProgress size={20} color="white" /> // Size 14 works pretty well
        : 'Disable 2FA'}
    </Button>
  </React.Fragment>
);

export default withStyles(
  styles
)(({ classes, tfa, tfaEnabled, onEnable, onDisable }) => {
  if (!tfaEnabled) {
    if (!tfa) return null;
    return <EnableTwoFactor tfa={tfa} onEnable={onEnable} classes={classes} />;
  } else {
    return <DisableTwoFactor onDisable={onDisable} />;
  }
});
