import fetch, { unregisterToken, registerToken } from 'utils/fetch';
import { push } from 'redux-little-router';
import { getWalletInfo } from './wallet';
import alertify from 'alertifyjs';
import speakeasy from 'speakeasy';

const RECEIVE_REFERRAL_CODE_FROM_URL =
  'cfx/auth/RECEIVE_REFERRAL_CODE_FROM_URL';

const SIGNUP = 'cfx/auth/SIGNUP';
const SIGNUP_SUCCESS = 'cfx/auth/SIGNUP_SUCCESS';
const SIGNUP_FAILED = 'cfx/auth/SIGNUP_FAILED';
const LOGOUT = 'cfx/auth/LOGOUT';
const LOGIN = 'cfx/auth/LOGIN';
const LOGIN_SUCCESS = 'cfx/auth/LOGIN_SUCCESS';
const LOGIN_FAILED = 'cfx/auth/LOGIN_FAILED';
const CHECKING_TOKEN = 'cfx/auth/CHECKING_TOKEN';
const CHECKING_TOKEN_SUCCESS = 'cfx/auth/CHECKING_TOKEN_SUCCESS';
const TFA_ENABLED = 'cfx/auth/TFA_ENABLED';
const TFA_DISABLED = 'cfx/auth/TFA_DISABLED';
const NEW_TFA = 'cfx/auth/NEW_TFA';
const CHANGE_PASSWORD = 'cfx/auth/CHANGE_PASSWORD';
const CHANGE_PASSWORD_SUCCESS = 'cfx/auth/CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAILED = 'cfx/auth/CHANGE_PASSWORD_FAILED';
const SEND_RESET_PASSWORD_REQUEST_SUCCESSFULLY =
  'cfx/auth/SEND_RESET_PASSWORD_REQUEST_SUCCESSFULLY';
const SEND_RESET_PASSWORD_REQUEST_FAILED =
  'cfx/auth/SEND_RESET_PASSWORD_REQUEST_FAILED';
const SEND_ACTIVATION_EMAIL_SUCCESSFULL =
  'cfx/auth/SEND_ACTIVATION_EMAIL_SUCCESSFULL';
const SEND_ACTIVATION_EMAIL_FAILED = 'cfx/auth/SEND_ACTIVATION_EMAIL_FAILED';

export default (
  state = {
    loggedIn: false,
    sendingRegistration: false,
    changingPassword: false
  },
  action
) => {
  switch (action.type) {
    case CHECKING_TOKEN:
      return {
        ...state,
        checkingToken: true
      };
    case CHECKING_TOKEN_SUCCESS:
      return {
        ...state,
        checkingToken: false
      };
    case RECEIVE_REFERRAL_CODE_FROM_URL:
      return {
        ...state,
        referralCode: action.payload.referralCode
      };
    case SIGNUP:
      return {
        ...state,
        sendingRegistration: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        sendingRegistration: false
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        sendingRegistration: false,
        registrationError: action.message
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        userId: action.userId,
        email: action.email,
        myReferralCode: action.referralCode,
        tfaEnabled: action.tfaEnabled,
        loggingIn: false,
        kycStatus: action.kycStatus
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginError: action.message,
        unactivated: action.unactivated,
        loggingIn: false
      };
    case LOGOUT:
      return { ...state, loggedIn: false, loginError: '' };
    case TFA_ENABLED:
      return {
        ...state,
        tfaEnabled: true
      };
    case TFA_DISABLED:
      return {
        ...state,
        tfaEnabled: false
      };
    case NEW_TFA:
      return {
        ...state,
        tempTfa: action.tempTfa
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        changingPassword: true
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        message: action.message
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changingPassword: false,
        changeError: action.message
      };
    case SEND_RESET_PASSWORD_REQUEST_SUCCESSFULLY:
    case SEND_RESET_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        resetMessage: action.message
      };
    case SEND_ACTIVATION_EMAIL_SUCCESSFULL:
      return {
        ...state,
        loginError: '',
        unactivated: false
      };
    case SEND_ACTIVATION_EMAIL_FAILED:
      return {
        ...state,
        loginError: action.message
      };
    default:
  }
  return state;
};

export const receiveReferralCodeFromUrl = referralCode => ({
  type: RECEIVE_REFERRAL_CODE_FROM_URL,
  payload: {
    referralCode
  }
});

export const login = (email, password, tfa) => async dispatch => {
  try {
    dispatch({
      type: LOGIN
    });
    const res = await fetch.post('/auth/login', {
      email,
      password,
      tfa
    });
    const { token } = res.data;
    const ok = await dispatch(authenticated(token));
    if (ok) dispatch(push('/'));
  } catch (e) {
    dispatch({
      type: LOGIN_FAILED,
      message: (e.response && e.response.data) || e.message,
      unactivated: e.response.status === 403
    });
  }
};

const authenticated = token => async dispatch => {
  try {
    registerToken(token);
    sessionStorage.setItem('cfx_access_token', token);
    const res = await fetch.get(`/auth/userInfo`);
    const {
      id,
      email,
      referralCode,
      username,
      tfaEnabled,
      kycStatus
    } = res.data;
    dispatch({
      type: LOGIN_SUCCESS,
      id,
      email,
      referralCode,
      username,
      tfaEnabled,
      kycStatus
    });
    dispatch(getWalletInfo());
    return true;
  } catch (e) {
    dispatch(logout(true));
  }
};

export const checkToken = () => async dispatch => {
  const token = sessionStorage.getItem('cfx_access_token');
  if (!token) return;
  dispatch({
    type: CHECKING_TOKEN
  });
  await dispatch(authenticated(token));
  dispatch({
    type: CHECKING_TOKEN_SUCCESS
  });
};

export const signup = (
  email,
  password,
  username,
  referralCode
) => async dispatch => {
  try {
    dispatch({
      type: SIGNUP
    });
    await fetch.post('/auth/signup', {
      email,
      password,
      username,
      referralCode
    });
    dispatch({
      type: SIGNUP_SUCCESS
    });
    dispatch(push('/registrationSuccess'));
  } catch (e) {
    dispatch({
      type: SIGNUP_FAILED,
      message: (e.response && e.response.data) || e.message
    });
  }
};

export const logout = silent => async dispatch => {
  sessionStorage.clear();
  unregisterToken();
  dispatch({
    type: LOGOUT
  });
  !silent && dispatch(push('/'));
};

export const generateTfa = () => async (dispatch, getState) => {
  const state = getState();
  if (state.auth.tfaEnabled) {
    return;
  }
  const { ascii, base32, hex, otpauth_url } = speakeasy.generateSecret({
    length: 8,
    name: `Cfx.io-${state.auth.email}`
  });
  dispatch({
    type: NEW_TFA,
    tempTfa: { ascii, base32, hex, otpauthURL: otpauth_url }
  });
};

export const enableTfa = (base32, token) => async dispatch => {
  try {
    await fetch.post('/auth/enableTwoFactor', { base32, token });
    dispatch({
      type: TFA_ENABLED
    });
  } catch (e) {
    alertify.error((e.response && e.response.data) || e.message);
  }
};

export const disableTfa = () => async dispatch => {
  try {
    await fetch.post(
      '/auth/disableTwoFactor',
      {},
      {
        requireTfa: true
      }
    );
    dispatch({
      type: TFA_DISABLED
    });
    await dispatch(generateTfa());
  } catch (e) {
    alertify.error((e.response && e.response.data) || e.message);
  }
};

export const resetPassword = email => async dispatch => {
  try {
    await fetch.post('/auth/resetPassword', { email });
    dispatch({
      type: SEND_RESET_PASSWORD_REQUEST_SUCCESSFULLY,
      message: 'An email with instruction has been sent to your address.'
    });
  } catch (e) {
    dispatch({
      type: SEND_RESET_PASSWORD_REQUEST_FAILED,
      message: (e.response && e.response.data) || e.message
    });
  }
};

export const resendActivationEmail = email => async dispatch => {
  try {
    await fetch.post('auth/resendActivationEmail', { email });
    dispatch({
      type: SEND_ACTIVATION_EMAIL_SUCCESSFULL
    });
    dispatch(push('/resendActivationEmailSuccess'));
  } catch (e) {
    dispatch({
      type: SEND_ACTIVATION_EMAIL_FAILED,
      message: (e.response && e.response.data) || e.message
    });
  }
};

export const changePassword = (oldPassword, newPassword) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CHANGE_PASSWORD
    });
    await fetch.post(
      '/auth/changePassword',
      {
        oldPassword,
        newPassword
      },
      { requireTfa: getState().auth.tfaEnabled, needConfirm: true }
    );
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      message: 'Successfully changed password'
    });
  } catch (e) {
    dispatch({
      type: CHANGE_PASSWORD_FAILED,
      message: (e.response && e.response.data) || e.message
    });
  }
};
