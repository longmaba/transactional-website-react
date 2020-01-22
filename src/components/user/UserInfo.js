import React from 'react';
import Blockies from 'react-blockies';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

const styles = {
  bigAvatar: {
    width: 60,
    height: 60,
  },
  textWhite: {
    color: 'white'
  }
};

const UserInfo = ({ auth, classes }) => (
  <React.Fragment>
    <List>
      {auth &&
        <React.Fragment>
          <ListItem>
            <Avatar
              className={classNames(classes.bigAvatar)}
            >
              <Blockies seed={auth.username} size={10} scale={6} />
            </Avatar>
          </ListItem>
          <ListItem>
            <ListItemText
              disableTypography
              primary={
                <Typography className={classNames(classes.textWhite)} type="subheading">
                  {auth.username}
                </Typography>
              }
              secondary={
                <Typography className={classNames(classes.textWhite)} type="body1">
                  {auth.email}
                </Typography>
              }
            />
          </ListItem>
        </React.Fragment>
      }
    </List>
  </React.Fragment>
);

export default withStyles(styles)(UserInfo);
