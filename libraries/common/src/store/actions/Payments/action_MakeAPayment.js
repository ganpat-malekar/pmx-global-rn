import {
  STORE_MAKE_A_PAYMENT_TABLE_DATA,
  STORE_PAYMENT_EDIT_DATA,
  FLUSH_PAYMENT_EDIT_DATA,
  LOADED,
  LOADING,
} from '../types';
import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';
import { showAlert } from '../UIActions';
import _ from 'underscore';

/**
 * [POST request]
 * Saves make a payment form data to the backend -
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {boolean}
 */
export const submitPaymentData =
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
 * @param {number} data.PaymentType - 1 (hardcoded) (MANDATORY)
 * @param {string} data.RequestIds - comma separated list of encrypted Ids of the rows (MANDATORY)
 * @returns {boolean}
 */
export const confirmMakeAPaymentBookedPayments =
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
 * @param {number} data.PaymentType - 1 (hardcoded) (MANDATORY)
 * @param {string} data.RequestIds - comma separated list of encrypted Ids of the rows (MANDATORY)
 * @returns {boolean}
 */
export const deleteMakeAPaymentBookedTransactions =
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
 * Api to Get all the data for Processing Payments (Table) -
 * paymentsTableData: state.makeAPayment.paymentsTableData
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {number} data.PaymentType - Plaintext, hardcoded - 1 for MakePayment (MANDATORY)
 * @returns {undefined}
 */
export const getMakeAPaymentBookedTransactionsTableData =
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
      type: STORE_MAKE_A_PAYMENT_TABLE_DATA,
      payload: responseData,
    });
  };

/**
 * [Normal Action]
 * Store data of the row in reducer for editing -
 * editData: state.makeAPayment.editData
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */
export const storeMakeAPaymentEditData = (data) => (dispatch, getState) => {
  dispatch({
    type: STORE_PAYMENT_EDIT_DATA,
    payload: data,
  });
};

/**
 * [Normal Action]
 * Removes editData from store on -
 * 1. Successful update
 * 2. Page reload
 * editData: state.makeAPayment.editData
 *
 * @returns {undefined}
 */
export const flushMakeAPaymentEditData = () => (dispatch, getState) => {
  dispatch({
    type: FLUSH_PAYMENT_EDIT_DATA,
  });
};
