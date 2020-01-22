import React from 'react';
import QRCode from 'qrcode.react';
import copy from 'copy-to-clipboard';
import Typography from 'material-ui/Typography';
import Input, { InputAdornment } from 'material-ui/Input';
import CopyIcon from 'material-ui-icons/ContentCopy';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import Hidable from 'components/common/Hidable';

class Deposit extends React.Component {
  state = {
    open: false
  };
  onCopy(address) {
    copy(address);
    this.setState({
      open: true
    });
  }
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  }
  render() {
    const { address } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Typography type="title" gutterBottom>Deposit Address</Typography>
        <div
          style={{
            display: 'inline-block',
            margin: '0.5em',
            background: 'white',
            padding: '0.5em'
          }}>
          <QRCode value={address} />
        </div>
        <div>
          <Input
            id="address"
            type="text"
            value={address}
            disabled
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => this.onCopy(address)}>
                  <CopyIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={open}
            autoHideDuration={6000}
            SnackbarContentProps={{
              'aria-describedby': 'message-id'
            }}
            onClose={() => this.handleClose()}
            message={<span id="message-id">Address Copied!</span>}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Hidable(Deposit);
