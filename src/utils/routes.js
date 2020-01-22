import { receiveReferralCodeFromUrl, generateTfa } from 'ducks/auth';
import { getWalletInfo, getTransactions } from 'ducks/wallet';
import { getCurrentPrice } from 'ducks/price';
import { getDownlineList } from 'ducks/user';
import { getKYCPendingUsers } from 'ducks/admin';

export default {
  '/signup/:referralCode': {
    isPublic: true,
    thunk: route => {
      return async dispatch => {
        dispatch(receiveReferralCodeFromUrl(route.params.referralCode));
      };
    }
  },
  '/login': {
    isPublic: true
  },
  '/signup': {
    isPublic: true
  },
  '/resetPassword/request': {
    isPublic: true
  },
  '/resetPassword/success': {
    isPublic: true
  },
  '/': {
    thunk: route => {
      return async dispatch => {
        dispatch(getCurrentPrice());
      };
    }
  },
  '/wallet/eth': {
    thunk: route => {
      return async dispatch => {
        await dispatch(getWalletInfo());
      };
    }
  },
  '/wallet/cfx': {
    thunk: route => {
      return async dispatch => {
        await dispatch(getWalletInfo());
      };
    }
  },
  '/transfer/cfx': {},
  '/exchange': {},
  '/transactions': {
    thunk: route => {
      return async dispatch => {
        await dispatch(getTransactions());
      };
    }
  },
  '/affiliate': {
    thunk: route => {
      return async dispatch => {
        await dispatch(getDownlineList());
      };
    }
  },
  '/admin': {
    thunk: route => {
      return async dispatch => {
        await dispatch(getKYCPendingUsers());
      };
    }
  },
  '/404': {
    isPublic: true
  },
  '/registrationSuccess': {
    isPublic: true
  },
  '/resendActivationEmailSuccess': {
    isPublic: true
  },
  '/tokenExpired': {
    isPublic: true
  },
  '/activationSuccess': {
    isPublic: true
  },
  '/security': {
    thunk: route => {
      return async dispatch => {
        await dispatch(generateTfa());
      };
    }
  }
};
