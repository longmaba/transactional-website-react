import React from 'react';
import Referral from 'containers/Referral';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import ReferralUrl from 'containers/ReferralUrl';
import AffiliateTools from 'containers/AffiliateTools';

export default () => (
  <React.Fragment>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12}>
        <ReferralUrl />
        <Paper><Referral /></Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <AffiliateTools />
      </Grid>
    </Grid>
  </React.Fragment>
);
