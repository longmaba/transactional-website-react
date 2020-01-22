import React from 'react';

import Fragment from 'components/common/RouterFragment';
import NotFound from 'components/pages/404';
import CfxWallet from 'components/pages/CfxWallet';
import EthWallet from 'components/pages/EthWallet';
import Presale from 'components/pages/Presale';
import Transactions from 'containers/Transactions';
import Admin from 'components/pages/Admin';
import Security from 'components/pages/Security';
import Referral from 'components/pages/Referral';
import Typography from 'material-ui/Typography';

export default () => (
  <React.Fragment>
    <Fragment forRoute="/"><Presale /></Fragment>
    <Fragment forRoute="/wallet/cfx"><CfxWallet /></Fragment>
    <Fragment forRoute="/wallet/eth"><EthWallet /></Fragment>
    <Fragment forRoute="/transfer/cfx">
      <Typography type="headline">Coming soon</Typography>
    </Fragment>
    <Fragment forRoute="/transactions"><Transactions /></Fragment>
    <Fragment forRoute="/admin"><Admin /></Fragment>
    <Fragment forRoute="/profile">Profile</Fragment>
    <Fragment forRoute="/exchange">
      <Typography type="headline">Coming soon</Typography>
      <Typography type="subheading">Right after ICO</Typography>
    </Fragment>
    <Fragment forRoute="/affiliate"><Referral /></Fragment>
    <Fragment forRoute="/security"><Security /></Fragment>
    <Fragment forRoute="/404"><NotFound /></Fragment>
  </React.Fragment>
);
