import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';
import { showAlert } from '../UIActions';

/**
 * for getting subscription payment transaciton summary
 * Reducer: state.transactionSummary
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.OrderId - Plaintext, XpressId which we get after clicking the Pay Now button
 *
 * @returns
 */
export const fetchTransactionSummary = (data) => async (dispatch) => {
  let responseData = null;
  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_TRANSACTION_SUMMARY, data);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    // dispatch({
    //   type: LOADED,
    // });
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
    type: 'STORE_TRANSACTION_SUMMARY_RESPONSE',
    payload: responseData,
  });

  return true;
};
export const getTransactionSummary = (data) => async (dispatch) => {
  let responseData = null;
  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.GET_TRANSACTION_SUMMARY, data);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    // dispatch({
    //   type: LOADED,
    // });
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
    type: 'STORE_TRANSACTION_SUMMARY_RESPONSE',
    payload: responseData,
  });

  return true;
};

export const storeCheckoutSessionData = (data) => (dispatch) => {
  dispatch({
    type: 'STORE_CHECKOUT_SESSION_DATA',
    payload: { ...data },
  });
};

export const clearCheckoutSessionData = () => (dispatch) => {
  dispatch({ type: 'CLEAR_CHECKOUT_SESSION_DATA' });
};

export const clearRegisteredUser = () => (dispatch) => {
  dispatch({ type: 'CLEAR_CHECKOUT_SESSION_DATA' });
  dispatch({ type: 'LOGOUT_SUCCESS' });
};
