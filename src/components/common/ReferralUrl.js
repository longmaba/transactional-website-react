import React from 'react';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import CopyIcon from 'material-ui-icons/ContentCopy';
import IconButton from 'material-ui/IconButton';
import copy from 'copy-to-clipboard';

import Snackbar from 'material-ui/Snackbar';

class ReferralUrl extends React.Component {
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
    const { open } = this.state;
    const { referralCode } = this.props;
    const referralUrl = `${process.env.REACT_APP_WEB_URL}/signup/${referralCode}`;
    return (
      <FormControl fullWidth>
        <InputLabel>Referral Link</InputLabel>
        <Input
          id="referralCode"
          type="text"
          value={referralUrl}
          disabled
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => this.onCopy(referralUrl)}>
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
      </FormControl>
    );
  }
}

export default ReferralUrl;
