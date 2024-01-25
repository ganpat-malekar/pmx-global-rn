import _ from 'underscore';

import errorAlertHandler from '../../../helper/errorAlertHandler';

import api from '../../../apimiddleware';
import { config } from '../../../config';

import { showAlert } from '../UIActions';
import { LOADING, LOADED } from '../types';

/**
 *
 * @param {*} data
 * @returns
 */
export const submitLimitData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SAVE_LIMIT, data);
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
  console.log(responseData);
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

  return true;
};

/**
 * [POST request]
 * Api to Get all the data for Processing Payments (Table) -
 * paymentLimitTableData: state.paymentLimits.paymentLimitTableData
 *
 * @param {Object} data - payload (Optional)
 * @returns {undefined}
 */
export const getPaymentLimitsTableData =
  (data = {}) =>
  async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.MANAGE_LIMIT, data);
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
      type: 'STORE_PAYMENT_LIMIT_TABLE_DATA',
      payload: responseData,
    });
  };

/**
 * [Normal Action]
 * Store data of the row in reducer for editing -
 * editData: state.paymentLimits.editData
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */
export const storePaymentLimitsEditData = (data) => (dispatch, getState) => {
  dispatch({
    type: 'STORE_PAYMENT_LIMIT_EDIT_DATA',
    payload: data,
  });
};

/**
 * [Normal Action]
 * Removes editData from store on -
 * 1. Successful update
 * 2. Page reload
 * editData: state.paymentLimits.editData
 *
 * @returns {undefined}
 */
export const flushPaymentLimitsEditData = () => (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_PAYMENT_LIMIT_EDIT_DATA',
  });
};
