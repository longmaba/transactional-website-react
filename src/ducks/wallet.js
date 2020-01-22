import fetch from 'utils/fetch';

const GET_WALLET_INFO_SUCCESSFUL = 'cfx/wallet/GET_WALLET_INFO_SUCCESSFUL';
const GET_BALANCE_SUCCESSFUL = 'cfx/wallet/GET_BALANCE_SUCCESSFUL';
const BUY_CFX_FAILED = 'cfx/wallet/BUY_CFX_FAILED';
const BUY_CFX = 'cfx/wallet/BUY_CFX';
const BUY_CFX_SUCCESS = 'cfx/wallet/BUY_CFX_SUCCESS';
// const GET_TRANSATIONS = 'cfx/wallet/GET_TRANSATIONS';
const GET_TRANSATIONS_SUCCESS = 'cfx/wallet/GET_TRANSATIONS_SUCCESS';
// const GET_TRANSATIONS_FAILED = 'cfx/wallet/GET_TRANSATIONS_FAILED';

export default (state = { buyingCFX: false, transactions: [] }, action) => {
  switch (action.type) {
    case GET_WALLET_INFO_SUCCESSFUL:
      return {
        ...state,
        address: action.address,
        btcAddress: action.btcAddress
      };
    case GET_BALANCE_SUCCESSFUL:
      return {
        ...state,
        ethBalance: action.ethBalance,
        cfxBalance: action.cfxBalance,
        btcBalance: action.btcBalance
      };
    case BUY_CFX:
      return {
        ...state,
        buyingCFX: true,
        message: ''
      };
    case BUY_CFX_SUCCESS:
      return {
        ...state,
        buyError: undefined,
        buyingCFX: false,
        message: action.message
      };
    case BUY_CFX_FAILED:
      return {
        ...state,
        buyError: action.message,
        buyingCFX: false
      };
    case GET_TRANSATIONS_SUCCESS:
      return {
        ...state,
        transactions: action.transactions
      };
    default:
  }
  return state;
};

export const getWalletInfo = () => async dispatch => {
  const res = await fetch.get('/wallet/info');
  const { address, btcAddress } = res.data;
  dispatch({
    type: GET_WALLET_INFO_SUCCESSFUL,
    address,
    btcAddress
  });
  dispatch(getBalance());
};

export const getBalance = () => async dispatch => {
  const res = await fetch.get('/wallet/balance');
  const { ethBalance, cfxBalance, btcBalance } = res.data;
  dispatch({
    type: GET_BALANCE_SUCCESSFUL,
    ethBalance,
    cfxBalance,
    btcBalance
  });
};

export const buyCFX = (total, address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUY_CFX
    });
    await fetch.post(
      '/wallet/buyCFX',
      {
        total,
        address
      },
      {
        requireTfa: getState().auth.tfaEnabled,
        needConfirm: true
      }
    );
    dispatch({
      type: BUY_CFX_SUCCESS,
      message: 'Successfully purchased!'
    });
    dispatch(getBalance());
  } catch (e) {
    dispatch({
      type: BUY_CFX_FAILED,
      message: (e.response && e.response.data) || e.message
    });
  }
};

export const getTransactions = () => async dispatch => {
  const res = await fetch.get('/wallet/transactions');
  const transactions = res.data;
  dispatch({
    type: GET_TRANSATIONS_SUCCESS,
    transactions
  });
};
