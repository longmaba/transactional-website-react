import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';

const styles = theme => {
  const nested = {};
  for (let i = 0; i < 10; i++) {
    nested[`nested-${i}`] = {
      paddingLeft: theme.spacing.unit * 4 * (i + 1)
    };
  }
  return {
    root: {
      width: '100%',
      maxWidth: '100%'
    },
    ...nested
  };
};

class Node extends React.Component {
  state = {
    open: false
  };
  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    const { node, dataKey, classes, iconRender, depth } = this.props;
    return (
      <React.Fragment>
        <ListItem
          className={classes[`nested-${depth}`]}
          button
          onClick={this.handleClick.bind(this)}>
          <ListItemIcon>
            {iconRender(node)}
          </ListItemIcon>
          <ListItemText inset primary={node[dataKey]} />
          {node.children &&
            <Chip
              label={node.children ? node.children.length : 0}
              onDelete={this.handleClick.bind(this)}
              deleteIcon={this.state.open ? <ExpandLess /> : <ExpandMore />}
            />}
        </ListItem>
        {node.children &&
          <Collapse
            component="li"
            in={this.state.open}
            timeout="auto"
            unmountOnExit>
            <List disablePadding>
              {node.children.map((child, i) => (
                <Node
                  key={i}
                  node={child}
                  dataKey={dataKey}
                  iconRender={iconRender}
                  depth={depth + 1}
                  classes={classes}
                />
              ))}
            </List>
          </Collapse>}
      </React.Fragment>
    );
  }
}

class Tree extends React.Component {
  render() {
    const { root, classes, dataKey, iconRender } = this.props;
    return (
      <List className={classes.root}>
        <Node
          node={root}
          depth={0}
          iconRender={iconRender}
          dataKey={dataKey}
          classes={classes}
        />
      </List>
    );
  }
}

export default withStyles(styles)(Tree);
