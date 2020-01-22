import React from 'react';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import ChangePassword from 'containers/ChangePassword';
import TwoFactor from 'containers/TwoFactor';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary
  }
});

const Presale = ({ classes }) => (
  <div>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}><ChangePassword /></Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}><TwoFactor /></Paper>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(Presale);
