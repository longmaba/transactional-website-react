import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {
  routerForBrowser,
  initializeCurrentLocation,
  LOCATION_CHANGED,
  push
} from 'redux-little-router';

import routes from 'utils/routes';

import thunk from 'redux-thunk';
import auth, { checkToken } from './auth';
import wallet from './wallet';
import price from './price';
import user from './user';
import admin from './admin';

const { reducer, enhancer, middleware } = routerForBrowser({
  routes
});

const routerMiddleware = store => next => action => {
  if (
    action.type === LOCATION_CHANGED &&
    action.payload &&
    !action.payload.result
  ) {
    store.dispatch(push('/404'));
    return null;
  }
  if (
    action.type === LOCATION_CHANGED &&
    action.payload &&
    action.payload.result &&
    !action.resolved
  ) {
    if (!store.getState().auth.loggedIn && !action.payload.result.isPublic) {
      store.dispatch(push('/login'));
      return null;
    }
    if (action.payload.result.thunk) {
      const thunk = action.payload.result.thunk(action.payload);
      Promise.resolve(store.dispatch(thunk)).then(() => {
        action.resolved = true;
        next(action);
      });
      return null;
    }
  }
  return next(action);
};

export default () => {
  const rootReducer = combineReducers({
    router: reducer,
    auth,
    wallet,
    price,
    user,
    admin
  });

  const store = createStore(
    rootReducer,
    window.__INITIAL_STATE || {},
    compose(
      enhancer,
      applyMiddleware(thunk, middleware, routerMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  store.dispatch(checkToken()).then(() => {
    const initialLocation = store.getState().router;
    if (initialLocation) {
      store.dispatch(initializeCurrentLocation(initialLocation));
    }
  });

  return store;
};
