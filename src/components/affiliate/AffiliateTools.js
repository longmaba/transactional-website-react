import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

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

const AffiliateTool = ({ url, refCode }) => (
  <React.Fragment>
    <div>
      <img src={url} alt="banner"/>
    </div>
    <div>
      <textarea
        value={`<a href="${process.env.REACT_APP_WEB_URL}/signup/${refCode}"><img src=${url}></a>`}
        readOnly
        rows={4}
        cols={40}
      />
    </div>
  </React.Fragment>
);

export default withStyles(styles)(({ classes, refCode }) => {
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography type="title" gutterBottom>
          Affiliate Tool
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <AffiliateTool
              url={
                'https://coinforex.io/wp-content/uploads/2018/02/CFX-banner.jpg'
              }
              refCode={refCode}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AffiliateTool
              url={
                'https://coinforex.io/wp-content/uploads/2018/02/CFX-leaderboard.jpg'
              }
              refCode={refCode}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AffiliateTool
              url={
                'https://coinforex.io/wp-content/uploads/2018/02/CFX-HalfPage.jpg'
              }
              refCode={refCode}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AffiliateTool
              url={
                'https://coinforex.io/wp-content/uploads/2018/02/CFX-Skyscrapper.jpg'
              }
              refCode={refCode}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AffiliateTool
              url={
                'https://coinforex.io/wp-content/uploads/2018/02/CFX-Rectangle.jpg'
              }
              refCode={refCode}
            />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
});
