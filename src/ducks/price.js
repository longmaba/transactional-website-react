import fetch from 'utils/fetch';

const GET_PRICE_SUCCESS = 'cfx/price/GET_PRICE_SUCCESS';
const GET_PRICE = 'cfx/price/GET_PRICE';
const GET_PRICE_FAILED = 'cfx/price/GET_PRICE_FAILED';

export default (
  state = {
    cfxPrice: 0,
    ethRate: 0,
    btcToUsd: 0,
    ethToUsd: 0,
    btcRate: 0,
    gettingPrice: false
  },
  action
) => {
  switch (action.type) {
    case GET_PRICE_SUCCESS:
      return {
        ...state,
        cfxPrice: action.cfxPrice,
        ethRate: action.ethRate,
        btcRate: action.btcRate,
        btcToUsd: action.btcToUsd,
        ethToUsd: action.ethToUsd,
        gettingPrice: false
      };
    case GET_PRICE_FAILED:
      return {
        ...state,
        gettingPrice: false
      };
    case GET_PRICE:
      return {
        ...state,
        gettingPrice: true
      };
    default:
  }
  return state;
};

export const getCurrentPrice = () => async dispatch => {
  try {
    dispatch({
      type: GET_PRICE
    });
    const res = await fetch.get('/price/currentPrice');
    const { cfxPrice, ethRate, btcRate, btcToUsd, ethToUsd } = res.data;
    dispatch({
      type: GET_PRICE_SUCCESS,
      cfxPrice,
      ethRate,
      btcRate,
      btcToUsd,
      ethToUsd
    });
  } catch (e) {
    dispatch({
      type: GET_PRICE_FAILED,
      message: (e.response && e.response.data) || e.message
    });
  }
};
