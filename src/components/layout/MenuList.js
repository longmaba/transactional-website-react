import React from 'react';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import StarIcon from 'material-ui-icons/Stars';
import WalletIcon from 'material-ui-icons/AccountBalanceWallet';
import TransactionIcon from 'material-ui-icons/YoutubeSearchedFor';
import TransferIcon from 'material-ui-icons/SettingsEthernet';
// import ProfileIcon from 'material-ui-icons/AssignmentInd';
import ReferralIcon from 'material-ui-icons/FormatListNumbered';
import ExchangeIcon from 'material-ui-icons/Shuffle';
import SecurityIcon from 'material-ui-icons/Security';
import LogoutButton from 'containers/LogoutButton';
import Divider from 'material-ui/Divider';
import Collapse from 'material-ui/transitions/Collapse';
import { withStyles } from 'material-ui/styles';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import { Link } from 'redux-little-router';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const MenuLink = ({ href, onClick, children, text }) => (
  <Link href={href} style={{ textDecoration: 'none' }}>
    <ListItem button onClick={onClick}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </Link>
);

class MenuList extends React.Component {
  state = { openWallet: true, openTransfer: false };

  onWalletClick = () => {
    this.setState({ openWallet: !this.state.openWallet });
  };

  onTransferClick = () => {
    this.setState({ openTransfer: !this.state.openTransfer });
  };

  render() {
    const { itemClick, classes } = this.props;

    const UniformMenuLink = props => (
      <MenuLink {...props} onClick={itemClick} />
    );
    return (
      <React.Fragment>
        <UniformMenuLink href="/" text="Presale">
          <StarIcon />
        </UniformMenuLink>
        <ListItem button onClick={() => this.onWalletClick()}>
          <ListItemIcon>
            <WalletIcon />
          </ListItemIcon>
          <ListItemText inset primary="Wallet" />
          {this.state.openWallet ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          component="li"
          in={this.state.openWallet}
          timeout="auto"
          unmountOnExit>
          <Link href="/wallet/cfx" style={{ textDecoration: 'none' }}>
            <List disablePadding>
              <ListItem button className={classes.nested} onClick={itemClick}>
                <ListItemText inset primary="CFX" />
              </ListItem>
            </List>
          </Link>
          <Link href="/wallet/eth" style={{ textDecoration: 'none' }}>
            <List disablePadding>
              <ListItem button className={classes.nested} onClick={itemClick}>
                <ListItemText inset primary="ETH" />
              </ListItem>
            </List>
          </Link>
        </Collapse>
        <ListItem button onClick={() => this.onTransferClick()}>
          <ListItemIcon>
            <TransferIcon />
          </ListItemIcon>
          <ListItemText inset primary="Transfer" />
          {this.state.openTransfer ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          component="li"
          in={this.state.openTransfer}
          timeout="auto"
          unmountOnExit>
          <Link href="/transfer/cfx" style={{ textDecoration: 'none' }}>
            <List disablePadding>
              <ListItem button className={classes.nested} onClick={itemClick}>
                <ListItemText inset primary="CFX" />
              </ListItem>
            </List>
          </Link>
        </Collapse>
        <UniformMenuLink href="/transactions" text="Transactions">
          <TransactionIcon />
        </UniformMenuLink>
        <UniformMenuLink href="/exchange" text="Exchange">
          <ExchangeIcon />
        </UniformMenuLink>
        <UniformMenuLink href="/affiliate" text="Affiliate">
          <ReferralIcon />
        </UniformMenuLink>
        <UniformMenuLink href="/security" text="Security">
          <SecurityIcon />
        </UniformMenuLink>
        <Divider />
        <LogoutButton />
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(MenuList);
