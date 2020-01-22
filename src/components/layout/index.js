import React from 'react';
import Authenticated from './Authenticated';
import Unauthenticated from './Unauthenticated';

export default ({ loggedIn, checkingToken }) =>
  (checkingToken ? null : loggedIn ? <Authenticated /> : <Unauthenticated />);
