import _ from 'underscore';

import errorAlertHandler from '../../../helper/errorAlertHandler';

import api from '../../../apimiddleware';
import { config } from '../../../config';

import { showAlert } from '../UIActions';
import { LOADING, LOADED } from '../types';
import {
  STORE_BUSINESS_TRANSACTION_CHARGES,
  SET_TABLE_REFRESH_FLAG,
} from '../types';

/**
 * [POST request]
 * A request fetch the Transaction Charges List
 *
 * @param {}  - No Payload Required
 * @returns {undefined}
 */
export const getTransactionCharges_new =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_BUSINESS_TRANSACTION_CHARGES,
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
      type: STORE_BUSINESS_TRANSACTION_CHARGES,
      payload: responseData,
    });
  };

/**
 * [POST request]
 * To save the MDR changes
 *
 * @param {Object} data  - (Mandatory)
 * @param {string} data.Id  - CBID of the Selected record (Mandatory)
 * @param {number} data.Status  - Hardcoded : 1 (Mandatory)
 * @param {number} data.BusinessCharge  - Data from the Business Charge Field (Mandatory)
 * @param {number} data.ClientCharge  - Data from the Client Charge Field (Mandatory)
 * @returns {}
 */
export const saveMDRCharges = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SAVE_MDR_CHARGES, data);
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
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });

  return true;
};

/**
 * [POST request]
 * To Delete the MDR charges
 *
 * @param {Object} data  - (Mandatory)
 * @param {string} data.ID  - CBID of the Selected record (Mandatory)
 * @returns {}
 */
export const getMDRChargesConfiguration =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.MDR_CHARGES_CONFIGURATION, data);
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
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });

    return true;
  };
