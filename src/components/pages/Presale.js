import React from 'react';

import CfxPresalePrice from 'containers/CfxPresalePrice';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import EthBalance from 'containers/EthBalance';
import QuickBuy from 'containers/QuickBuy';
import { LinearProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import KYCStatus from 'containers/KYCStatus';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary
  },
  countdown: {
    padding: 16,
    textAlign: 'center'
  }
});

const Presale = ({ classes, gettingPrice }) => (
  <div>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12}>
        <Paper className={classes.countdown}>
          <Typography>
            Presale: Feb 15th - April 15th | Total CFX Token Distribution: 700,000 | Price: 1 ETH = 1,100 CFX
          </Typography>
          <Typography>
            Initial Coin Offering (ICO) Round 1: April 16th - May 11th | Total CFX Token Distribution: 1,600,000 | Price: 1 ETH = 1,000 CFX
          </Typography>
          <Typography>
            Initial Coin Offering (ICO) Round 2: May 12th - June 2nd | Total CFX Token Distribution: 1,400,000 | Price: 1 ETH = 900 CFX
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        {gettingPrice && <LinearProgress mode="query" />}
        <Paper className={classes.paper}><EthBalance /></Paper>
        <Paper className={classes.paper}><CfxPresalePrice /></Paper>
        <Paper className={classes.paper}><KYCStatus /></Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper className={classes.paper}><QuickBuy /></Paper>
      </Grid>
    </Grid>
  </div>
);

const mapStateToProps = state => ({
  gettingPrice: state.price.gettingPrice
});

export default connect(mapStateToProps)(withStyles(styles)(Presale));
