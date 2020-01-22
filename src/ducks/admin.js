import fetch from 'utils/fetch';

const GET_KYC_DATA_SUCCESSFUL = 'cfx/admin/GET_KYC_DATA_SUCCESSFUL';
const GET_KYC_DATA_FAILED = 'cfx/admin/GET_KYC_DATA_FAILED';

export default (state = { kycPendingUsers: [] }, action) => {
  switch (action.type) {
    case GET_KYC_DATA_SUCCESSFUL:
      return {
        ...state,
        kycPendingUsers: action.kycPendingUsers
      };
    case GET_KYC_DATA_FAILED:
      return {
        ...state,
        kycPendingUsers: [],
        message: action.message
      };
    default:
  }
  return state;
};

export const getKYCPendingUsers = () => async dispatch => {
  try {
    const res = await fetch.get('/auth/getKYCPendingUsers');
    const kycPendingUsers = res.data;
    dispatch({
      type: GET_KYC_DATA_SUCCESSFUL,
      kycPendingUsers
    });
  } catch (e) {
    dispatch({
      type: GET_KYC_DATA_FAILED,
      message: (e.response && e.response.data) || e.message
    });
  }
};

export const approveKYC = email => async dispatch => {
  await fetch.post('/auth/setKYCStatus', {
    email,
    kycStatus: 'Verified'
  });
  dispatch(getKYCPendingUsers());
};

export const rejectKYC = email => async dispatch => {
  await fetch.post('/auth/setKYCStatus', {
    email,
    kycStatus: 'Unverified'
  });
  dispatch(getKYCPendingUsers());
};
