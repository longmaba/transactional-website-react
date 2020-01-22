import axios from 'axios';

import { logout } from 'ducks/auth';
import alertify from './alertify-promise';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

let interceptor = null;

export const registerToken = token => {
  if (interceptor !== null) {
    instance.interceptors.request.eject(interceptor);
  }
  interceptor = instance.interceptors.request.use(async config => {
    if (config.requireTfa) {
      try {
        const tfa = await alertify.prompt(
          'Two factor authentication',
          'Enter the number displayed on your authenticator!'
        );
        config.headers = {
          ...config.headers,
          'tfa-token': tfa
        };
      } catch (e) {
        const error = new Error('User did not enter anything!');
        error.tfa = true;
        throw error;
      }
    } else if (config.needConfirm) {
      try {
        await alertify.confirm('Are you sure?', 'This action cannot be undone');
      } catch (e) {
        const error = new Error('User canceled!');
        throw error;
      }
    }
    config.headers = {
      ...config.headers,
      'x-access-token': token
    };
    return config;
  });
};

export const logoutWhen403 = dispatch => {
  instance.interceptors.response.use(
    res => {
      return res;
    },
    err => {
      if (err.response && err.response.status === 403) {
        dispatch(logout());
      }
      return Promise.reject(err);
    }
  );
};

export const unregisterToken = () => {
  if (interceptor !== null) {
    instance.interceptors.request.eject(interceptor);
  }
};

// instance.interceptors.response.use(
//   res => res,
//   e => originalAlertify.error((e.response && e.response.message) || e.message)
// );

export default instance;
