import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import OpenInNewIcon from 'material-ui-icons/OpenInNew';

export default ({ kycStatus, email }) => (
  <React.Fragment>
    <Typography gutterBottom>{`KYC Status: ${kycStatus}`}</Typography>
    {' '}
    {kycStatus === 'Unverified' &&
      <Button
        raised
        color="primary"
        component="a"
        target="_blank"
        href={`https://docs.google.com/forms/d/e/1FAIpQLScyBlo9DxisF1CVPoPGPlnHqf8qzY69VepSrUGPREVmX3vv_w/viewform?usp=pp_url&entry.129047446=${email}&entry.1723056142&entry.479567595&entry.139857698&entry.1811480627`}>
        Go to KYC Form <OpenInNewIcon />
      </Button>}
  </React.Fragment>
);
