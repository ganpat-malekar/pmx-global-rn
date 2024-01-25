import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../../UIActions';
import { LOADED, LOADING } from '../../../types';

/**
 * [POST request]
 * Saves make a payment form data to the backend -
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {boolean}
 */
export const submitTaxPaymentData =
  (data, isEdit) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const url = !isEdit ? config.BOOK_PAYMENT : config.UPDATE_BOOK_PAYMENT;

      const response = await api.post(url, data);
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

/**
 * [POST request]
 * Api to Confirm Booked transaction -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {number} data.PaymentType - 1 for make payment (hardcoded), 2 for taxpayment (MANDATORY)
 * @param {string} data.RequestIds - comma separated list of encrypted Ids of the rows (MANDATORY)
 * @returns {boolean}
 */
export const confirmPayTaxBookedPayments =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.CONFIMR_BOOKED_TRANSACTIONS, data);
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
/**
 * [POST request]
 * Api to Delete Booked transaction -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {number} data.PaymentType - 1 (hardcoded) (MANDATORY), try 7 from PayTax or don't send at all
 * @param {string} data.RequestIds - comma separated list of encrypted Ids of the rows (MANDATORY)
 * @returns {boolean}
 */
export const deletePayTaxBookedTransactions =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.DELETE_BOOKED_TRANSACTIONS, data);
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

/**
 * [POST request]
 * Api to Get all the data for Processing Tax Payments (Table) -
 * payTaxTableData: state.payTax.payTaxTableData
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {number} data.PaymentType - Plaintext, hardcoded - 1 for MakePayment, 7 for Paytax (MANDATORY)
 * @param {string} data.CompanyIds - Comma separated string of companyid (OPTIONAL)
 * @param {string} LoginID - UserId from tokenData
 * @returns {undefined}
 */
export const getPayTaxBookedTransactionsTableData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_BOOKED_TRANSACTIONS_TABLE_DATA,
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
      type: 'STORE_TAX_PAYMENT_TABLE_DATA',
      payload: responseData,
    });
  };

/**
 * [POST request]
 * API to get list of businesses for the dropdown -
 * businessDropdown: state.payTax.businessDropdown
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {number} data.CompanyId - Encrypted, Get from tokenData (MANDATORY)
 * @returns {undefined}
 */
export const getPayTaxBusinessList = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_GIBAN_DETAILS, data);
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
    type: 'STORE_PAYTAX_BUSINESS_DROPDOWN',
    payload: { Data },
  });
};

/**
 * [Normal Action]
 * Store data of the row in reducer for editing -
 * editData: state.payTax.editData
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */
export const storePayTaxEditData = (data) => (dispatch, getState) => {
  dispatch({
    type: 'STORE_TAX_PAYMENT_EDIT_DATA',
    payload: data,
  });
};

/**
 * [Normal Action]
 * Removes editData from store on -
 * 1. Successful update
 * 2. Page reload
 * editData: state.payTax.editData
 *
 * @returns {undefined}
 */
export const flushPayTaxEditData = () => (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_TAX_PAYMENT_EDIT_DATA',
  });
};
