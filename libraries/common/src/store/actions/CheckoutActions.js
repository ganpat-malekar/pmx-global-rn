import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from './UIActions';
import { LOADED, LOADING, STORE_PAYMENT_CHARGES } from './types';

/**
 * [POST request]
 * Stores pay Charges in the reducer -
 * paymentChargesList: state.checkout.paymentChargesList,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Plaintext, take CompanyId from tokenData (OPTIONAL)
 * @param {string} data.RequestRefNo - encrypted RequestId (MANDATORY)
 * @returns {undefined}
 */
export const getPaymentCharges = (data) => async (dispatch, getState) => {
  let responseData = null;
  //   dispatch({
  //     type: LOADING,
  //   });
  try {
    const response = await api.post(config.FETCH_PAYMENT_CHARGES, data);
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
    type: STORE_PAYMENT_CHARGES,
    payload: responseData,
  });
};

/**
 * [POST request]
 * Submit the data to Make the Payment
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Plaintext, take CompanyId from tokenData
 * @param {string} data.RequestIds - RequestIds (MANDATORY)
 * @returns {undefined}
 */
export const submitCheckoutData = (url, data) => async (dispatch, getState) => {
  let responseData = null;
  //   dispatch({
  //     type: LOADING,
  //   });

  try {
    const response = await api.post(url, data);

    responseData = response.data;

    return responseData;
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
};

/**
 *
 * @param {Object} data
 * @param {string} data.OrderID - Encrypted XpressId from the submit checkout response
 * @returns
 */
export const update3dsResponse = (data) => async (dispatch, getState) => {
  let responseData = null;
  //   dispatch({
  //     type: LOADING,
  //   });

  try {
    const response = await api.post(config.UPDATE_3DS_RESPONSE, data);

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
  // Finally
};

/**
 *
 * @param {Object} data
 * @param {string} data.OrderId - Encrypted XpressId from the submit checkout response
 * @returns
 */
export const getCheckoutTransactionSummary =
  (data) => async (dispatch, getState) => {
    let responseData = null;
    //   dispatch({
    //     type: LOADING,
    //   });

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
    // Finally

    dispatch({
      type: 'STORE_TRANSACTION_SUMMARY_RESPONSE',
      payload: responseData,
    });
  };

/**
 *
 * @param {Object} data
 * @param {string} data.Status - Plaintext, "4,0,1", hardcoded
 * @param {string} data.SubscriptionId - Encrypted from the row
 * @returns
 */
export const getSubscriptionCharges = (data) => async (dispatch, getState) => {
  let responseData = null;
  //   dispatch({
  //     type: LOADING,
  //   });

  try {
    const response = await api.post(config.GET_SUBSCRIPTION_CHARGES, data);

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
  // Finally

  dispatch({
    type: 'STORE_SUBSCRIPTION_CHARGES_RESPONSE',
    payload: responseData,
  });
};

export const saveSubscriptionRequest = (data) => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });

  try {
    const response = await api.post(config.SAVE_SUBSCRIPTION_REQUEST, data);

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

  return responseData;
};

export const store3dsOrderId = (OrderID) => (dispatch) => {
  dispatch({ type: 'STORE_3DS_ORDER_ID', payload: { OrderID } });
};

export const clear3dsOrderId = () => (dispatch) => {
  dispatch({ type: 'CLEAR_3DS_ORDER_ID' });
};
