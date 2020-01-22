import React from 'react';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import BonusRate from 'utils/BonusRate';
import Snackbar from 'material-ui/Snackbar';
import Stepper, { Step, StepButton } from 'material-ui/Stepper';
import { InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import CameraIcon from 'material-ui-icons/Camera';
import CloseIcon from 'material-ui-icons/Close';
import Dialog, { DialogContent } from 'material-ui/Dialog';

import QrReader from 'react-qr-reader';

class QuickBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      address: '',
      total: 0,
      openSnackbar: !!props.buyError
    };
  }
  set(field, value) {
    this.setState({
      ...this.state,
      [field]: value
    });
  }
  componentWillReceiveProps(props) {
    if (props.btcPrice) {
      this.set('price', props.btcPrice);
    }
  }
  openQR() {
    this.setState({
      showQR: true
    });
  }
  closeQR() {
    this.setState({
      showQR: false
    });
  }
  handleScan(data) {
    if (data) {
      this.setState({
        address: data,
        showQR: false
      });
    }
  }
  handleError(err) {
    console.error(err);
  }
  setTotal(total) {
    const { ethToUsd } = this.props;
    this.setState({
      total: total / ethToUsd
    });
  }
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbar: false });
  }
  render() {
    let { total, address, openSnackbar, showQR } = this.state;
    let {
      classes,
      onSubmit,
      buyError,
      message,
      buyingCFX,
      cfxPrice,
      ethToUsd
    } = this.props;
    const totalInUsd = total * ethToUsd;
    let bonusPercent = 0;
    let amount = total * cfxPrice;
    let bonusLevel = -1;
    for (let rate of BonusRate) {
      if (totalInUsd >= rate.threshold) {
        bonusPercent = rate.bonus;
        bonusLevel++;
      } else {
        break;
      }
    }

    const bonus = amount * bonusPercent / 100;

    if (!buyError) buyError = {};
    return (
      <form
        autoComplete="off"
        className={classes.container}
        onSubmit={evt => {
          evt.preventDefault();
          cfxPrice && total && onSubmit && onSubmit(total, address);
        }}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          onClose={() => this.handleClose()}
          message={<span id="message-id">{buyError}</span>}
        />
        <Typography type="headline">
          Buy CFX
        </Typography>
        <Stepper alternativeLabel nonLinear>
          {BonusRate.map((rate, i) => (
            <Step key={i}>
              <StepButton
                onClick={() => this.setTotal(rate.threshold)}
                completed={
                  i <= bonusLevel
                }>{`$${rate.threshold} (+${rate.bonus}%)`}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Typography type="subheading" color="error">
          {message}
          {(typeof buyError === 'string' || buyError instanceof String) &&
            buyError}
        </Typography>
        <TextField
          fullWidth
          id="total"
          helperText={buyError.balance}
          error={!!buyError.balance}
          label="Invest"
          type="number"
          value={total}
          required={true}
          onChange={evt => this.set('total', evt.target.value)}
          margin="normal"
          className={classes.textField}
          disabled={buyingCFX}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                ETH
              </InputAdornment>
            )
          }}
        />
        <Typography color="secondary">{totalInUsd.toFixed(4)} USD</Typography>
        <TextField
          fullWidth
          disabled
          id="total"
          label="Amount"
          value={amount.toFixed(8)}
          margin="normal"
          className={classes.textField}
        />
        <Typography color="primary">+{bonus.toFixed(4)} CFX</Typography>
        <TextField
          fullWidth
          id="address"
          helperText={buyError.address}
          error={!!buyError.address}
          label="Buy for address (optional)"
          value={address}
          onChange={evt => this.set('address', evt.target.value)}
          margin="normal"
          className={classes.textField}
          disabled={buyingCFX}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => this.openQR()}>
                  <CameraIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Dialog
          fullScreen
          open={!!showQR}
          onClose={() => this.closeQR()}
          aria-labelledby="responsive-dialog-title">
          <DialogContent>
            <IconButton onClick={() => this.closeQR()}>
              <CloseIcon />
            </IconButton>
            <QrReader
              onError={this.handleError}
              onScan={data => this.handleScan(data)}
              style={{ width: '100%' }}
            />
          </DialogContent>
        </Dialog>
        <div>
          <Button
            raised
            color="primary"
            className={classes.button}
            type="submit">
            {buyingCFX
              ? <CircularProgress size={20} color="accent" /> // Size 14 works pretty well
              : 'Submit'}
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
}))(QuickBuy);
