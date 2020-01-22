import fetch from 'utils/fetch';

const GET_REFERRAL_LIST_SUCCESSFUL = 'cfx/user/GET_REFERRAL_LIST_SUCCESSFUL';

export default (state = { refs: {} }, action) => {
  switch (action.type) {
    case GET_REFERRAL_LIST_SUCCESSFUL:
      return {
        ...state,
        refs: action.refs
      };
    default:
  }
  return state;
};

export const getDownlineList = () => async dispatch => {
  const res = await fetch.get('/auth/getDownline');
  const refs = res.data;
  dispatch({
    type: GET_REFERRAL_LIST_SUCCESSFUL,
    refs
  });
};
