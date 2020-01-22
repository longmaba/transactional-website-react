import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import LogoutIcon from 'material-ui-icons/ExitToApp';
import { connect } from 'react-redux';
import { logout } from 'ducks/auth';

const LogoutButton = ({ onLogout }) => (
  <ListItem button onClick={onLogout}>
    <ListItemIcon><LogoutIcon /></ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItem>
);

export default connect(null, dispatch => ({
  onLogout: () => dispatch(logout())
}))(LogoutButton);
