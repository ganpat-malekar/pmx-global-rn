import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import { LOADED, LOADING, STORE_PAY_FROM_TYPES } from '../types';

/**
 * [POST request]
 * Saves make a payment form data to the backend -
 * If success, saves the response in reducer
 * bulkPayment: state.bulkPayment.bulkPaymentTableData
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {boolean}
 */
export const submitBulkPaymentData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.VALIDATE_UPLOADED_FILE, data);
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
    return false;
  }

  const { StatusCode, Description, Data } = responseData;

  if (StatusCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return false;
  }

  // Finally
  dispatch({ type: 'STORE_BULK_PAYMENT_TABLE_DATA', payload: responseData });

  return true;
};

/**
 * [POST request]
 * Send confirmation to server, to save the 'correct' bulk contacts records -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.lstSession - Array received form the response of submitBulkPaymentData() api (MANDATORY)
 * @returns {boolean}
 */
export const confirmBulkPayments = (data) => async (dispatch, setState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.CONFIRM_BULK_PAYMENTS, data);
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
    return false;
  }

  const { StatusCode, Description, Data } = responseData;

  if (StatusCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return false;
  }

  // Finally
  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );
  return true;
};

export const clearBulkPaymentsTableData = () => (dispatch, setState) => {
  dispatch({
    type: 'CLEAR_BULK_PAYMENT_TABLE_DATA',
  });
};

/**
 * [GET request]
 * Stores types in reducer -
 * payFromTypeList: state.bulkPayment.payFromTypeList,
 *
 * @param {Object} params - payload (MANDATORY)
 * @param {string | number} params.objTypeName - Hardcoded - 121, Plaintext
 * @param {string | number} params.CompanyId - Hardcoded - 121, Plaintext
 *
 * @returns {undefined}
 */
export const getPayFromList = (params) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.get(config.GET_PAY_FROM_TYPE, { params });
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

  // Finally, store in reducer
  dispatch({
    type: STORE_PAY_FROM_TYPES,
    payload: responseData,
  });
};
