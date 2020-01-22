import React from 'react';

import Fragment from 'components/common/RouterFragment';

import { Provider } from 'react-redux';
import createStore from 'ducks';

import Main from 'containers/Main';
import WithTheme from './WithTheme';
const store = createStore();

const App = WithTheme(() => (
  <Fragment forRoute="/">
    <Main />
  </Fragment>
));

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
