import React from 'react';
import Tree from 'components/common/Tree';

import Avatar from 'material-ui/Avatar';
import Blockies from 'react-blockies';

export default ({ refs }) => {
  return (
    <Tree
      dataKey="username"
      iconRender={node => (
        <Avatar>
          {node.username && <Blockies seed={node.username} size={16} />}
        </Avatar>
      )}
      root={refs}
    />
  );
};
