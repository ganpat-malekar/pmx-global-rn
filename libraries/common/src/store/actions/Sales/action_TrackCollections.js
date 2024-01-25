import _ from 'underscore';

import errorAlertHandler from '../../../helper/errorAlertHandler';

import api from '../../../apimiddleware';
import { config } from '../../../config';

import { showAlert } from '../UIActions';
import { LOADING, LOADED } from '../types';
import {
  STORE_PENDING_REQUESTS,
  STORE_PENDING_VENDOR_PAYMENTS,
} from '../types';

/**
 * [POST request]
 * A request to fetch the Records for the Table
 * trackCollectionsList: state.trackCollections.pendingRequestsList,
 *
 * @param {Object} data - Mandatory
 * @param {number} data.CompanyId - sample value:270476 (Mandatory)
 * @returns {undefined}
 */
export const getPendingRequests = (data) => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_PENDING_REQUESTS, data);
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
    type: STORE_PENDING_REQUESTS,
    payload: responseData,
  });
};

/**
 * [POST request]
 * A request to send a reminder on Mail
 *
 * @param {Object} data - Mandatory
 * @param {string} data.RequestIds - Hardcoded: 0-Delete, 1-Approve (Mandatory)
 * @param {string} data.Mode - Hardcoded: "reminder" (Mandatory)
 * @returns {undefined}
 */
export const sendRequestPaymentEmail = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SEND_REQUEST_PAYMENT_MAIL, data);
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

  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );
};

// FOR VENDOR TABLE

/**
 * [POST request]
 * A request to fetch the Records for the Table
 * pendingVendorPaymentsList: state.trackCollections.pendingVendorPaymentsList
 *
 * @param {Object} data - Mandatory
 * @param {} data.PaymentFrom - null (Mandatory)
 * @param {} data.PaymentTo - null (Mandatory)
 * @returns {undefined}
 */
export const getPendingVendorPayments =
  (data) => async (dispatch, getState) => {
    let responseData = null;
    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_PENDING_VENDOR_PAYMENTS,
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
      type: STORE_PENDING_VENDOR_PAYMENTS,
      payload: responseData,
    });
  };

// Send Mail for Vendor
/**
 * [POST request]
 * A request to send a reminder on Mail
 *
 * @param {Object} data - Mandatory
 * @param {string} data.RequestIds - Hardcoded: Encrypted RequestId  (Mandatory)
 * @param {string} data.Mode - Hardcoded: "resend" (Mandatory)
 * @returns {undefined}
 */
export const sendVendorPaymentEmail = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SEND_VENDOR_PAYMENT_EMAIL, data);
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

  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );
};
