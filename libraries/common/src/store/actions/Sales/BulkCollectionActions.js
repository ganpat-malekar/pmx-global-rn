import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import { LOADING, LOADED } from '../types';

export const submitBulkCollectionData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.UPLOAD_BULK_COLLECTIONS, data);
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

    // Finally
    dispatch({
      type: 'STORE_BULK_COLLECTION_TABLE_DATA',
      payload: responseData,
    });

    return true;
  };

/**
 * [POST request]
 * Send confirmation to server, to save the 'correct' bulk collection records -
 * This api is same for bulk collection and payments. For collections, PaymentType should be 2
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.lstSession - Array received form the response of submitBulkPaymentData() api (MANDATORY)
 * @returns {boolean}
 */
export const confirmBulkCollection = (data) => async (dispatch, setState) => {
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

export const clearBulkCollectionActionsTableData =
  () => (dispatch, setState) => {
    dispatch({
      type: 'CLEAR_BULK_COLLECTION_TABLE_DATA',
    });
  };
