import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import {
  LOADED,
  LOADING,
  SET_TABLE_REFRESH_FLAG,
  STORE_COMPANY_BALANCE,
  STORE_CONFIRM_RECEIVED_REQUESTS,
  STORE_REQUESTS_RECEIVED,
  STORE_SEARCH_BUSINESS,
  STORE_SENDER_REQUESTS_RECEIVED,
} from '../types';

/**
 * API To fetch the Table Data
 * requestsReceivedList: state.requestsReceived.requestsReceivedList,
 *
 * @param {Object} data
 * @param {string} data.status - Hardcoded: "'030'" (MANDATORY)
 * @param {string} data.PaymentType - Hardcoded: "('2')" (MANDATORY)
 * @param {number} data.PaymentFrom - ClientId of the Logged in User (Mandatory)
 * @param {string} data.LoginID - UserId of the Logged in User (Mandatory)
 * @returns
 */
export const getRequestsReceived = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_REQUESTS_RECEIVED, data);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    dispatch({
      type: LOADED,
    });
  }

  if (_.isEmpty(responseData)) {
    console.log('No response.data: ', responseData);
    return;
  }

  const { StatusCode, Description } = responseData;

  if (StatusCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return;
  }
  // Finally, store in reducer
  dispatch({
    type: STORE_REQUESTS_RECEIVED,
    payload: responseData,
  });
};

export const getConfirmReceivedRequests =
  (data) => async (dispatch, getState) => {
    let responseData = null;
    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_CONFIRM_RECEIVED_REQUESTS,
        data
      );
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
      dispatch({
        type: LOADED,
      });
    }

    if (_.isEmpty(responseData)) {
      console.log('No response.data: ', responseData);
      return;
    }

    const { StatusCode, Description } = responseData;

    if (StatusCode !== '000') {
      dispatch(
        showAlert({
          type: 'danger',
          message: Description || 'Something went wrong',
        })
      );
      return;
    }

    // Finally, store in reducer
    // Does this flow require saving into the reducer?
    // check the flow once there is data in the table
    // the reducer is yet to be created
    dispatch({
      type: STORE_CONFIRM_RECEIVED_REQUESTS,
      payload: responseData,
    });
  };

export const submitAcceptRequestForm = (data) => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.FETCH_CONFIRM_RECEIVED_REQUESTS,
      data
    );
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    dispatch({
      type: LOADED,
    });
  }

  if (_.isEmpty(responseData)) {
    console.log('No response.data: ', responseData);
    return;
  }

  const { StatusCode, Description } = responseData;

  if (StatusCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return;
  }

  // Finally
  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });

  return true;
};

// export const getCompanyBalance = (data) => async (dispatch, getState) => {
//   let responseData = null;
//   dispatch({
//     type: LOADING,
//   });
//   try {
//     const response = await api.post(config.FETCH_COMPANY_BALANCE, data);
//     responseData = response.data;
//   } catch (error) {
//     errorAlertHandler(error, dispatch);
//   } finally {
//     dispatch({
//       type: LOADED,
//     });
//   }

//   if (_.isEmpty(responseData)) {
//     console.log("No response.data: ", responseData);
//     return;
//   }

//   const { StatusCode, Description, Data } = responseData;

//   if (StatusCode !== "000") {
//     dispatch(
//       showAlert({
//         type: "danger",
//         message: Description || "Something went wrong",
//       })
//     );
//     return;
//   }

//   dispatch({
//     type: STORE_COMPANY_BALANCE,
//     payload: { Data },
//   });
// };

// FOR VENDOR
/**
 *  API To fetch the Table Data
 * senderRequestsReceivedList: state.requestsReceived.senderRequestsReceivedList,
 *
 * @param {Object} data
 * @param {string} data.PaymentType - Hardcoded: "('2')" (MANDATORY)
 * @param {number} data.PaymentFrom - ClientId of the Logged in User (Mandatory)
 * @param {string} data.LoginID - UserId of the Logged in User (Mandatory)
 * @returns
 */
export const getSenderRequestsReceived =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_SENDER_REQUESTS_RECEIVED,
        data
      );
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
      dispatch({
        type: LOADED,
      });
    }

    if (_.isEmpty(responseData)) {
      console.log('No response.data: ', responseData);
      return;
    }

    const { StatusCode, Description } = responseData;

    if (StatusCode !== '000') {
      dispatch(
        showAlert({
          type: 'danger',
          message: Description || 'Something went wrong',
        })
      );
      return;
    }

    // Finally, store in reducer
    dispatch({
      type: STORE_SENDER_REQUESTS_RECEIVED,
      payload: responseData,
    });
  };

// FOR VENDOR
/**
 *  API To fetch the Table Data
 * senderRequestsReceivedList: state.requestsReceived.senderRequestsReceivedList,
 *
 * @param {Object} data
 * @param {string} data.RequestIds - Encrypted, RequestId of the row (MANDATORY)
 * @param {number} data.AprovalAction - 1 - submit, "Reject" - Reject hardcoded (Mandatory)
 * @param {string} data.Remarks - Plaintext (Mandatory)
 * @param {number} data.UserId - 0, hardcoded
 * @returns
 */
export const submitAction = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.FETCH_APPROVE_REJECT_REQUEST_PAYMENT,
      data
    );
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    dispatch({
      type: LOADED,
    });
  }

  if (_.isEmpty(responseData)) {
    console.log('No response.data: ', responseData);
    return;
  }

  const { StatusCode, Description } = responseData;

  if (StatusCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return;
  }
  // Finally, store in reducer
  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
  dispatch({
    type: 'RESET_REMARK_PROMPT_DATA',
  });
};

/**
 *  API To fetch the Table Data
 * searchBusinessList: state.requestsReceived.searchBusinessList,
 *
 * @param {Object} data
 * @param {string} data.ContactType - hardcoded - "null" (MANDATORY)
 * @returns
 */
export const getSearchBusiness = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });

  try {
    const response = await api.post(config.FETCH_SEARCH_BUSINESS, data);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    dispatch({
      type: LOADED,
    });
  }

  if (_.isEmpty(responseData)) {
    console.log('No response.data: ', responseData);
    return;
  }

  const { StatusCode, Description, Data } = responseData;

  if (StatusCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return;
  }

  // Finally, store in reducer
  dispatch({
    type: STORE_SEARCH_BUSINESS,
    payload: { Data },
  });
};
