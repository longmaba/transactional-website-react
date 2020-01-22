import React from 'react';

import CfxBalance from 'containers/CfxBalance';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import EthDeposit from 'containers/EthDeposit';
import Withdraw from 'components/wallet/Withdraw';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const Wallet = ({ classes }) => (
  <div>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}><CfxBalance /></Paper>
        <Paper className={classes.paper}><EthDeposit /></Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}><Withdraw /></Paper>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(Wallet);
