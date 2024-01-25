import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import {
  CLOSE_APPROVE_VAT_PAYMENT_DIALOG,
  LOADED,
  LOADING,
  OPEN_APPROVE_VAT_PAYMENT_DIALOG,
  STORE_VAT_PAYMENTS,
  SET_TABLE_REFRESH_FLAG,
} from '../types';

export const getVATPayments = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_VAT_PAYMENTS, data);
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
    type: STORE_VAT_PAYMENTS,
    payload: responseData,
  });
};

/**
 * [POST request]
 * A request to Approve or Reject a Transaction
 * apTransactionList: state.workflowList.apTransactionList,
 *
 * @param {Object} data - Mandatory
 * @param {string} data.RequestId - RequestId of the Record (Multiple - comma Seperated) (Mandatory)
 * @param {string} data.RemitterAccountNo - Hashed RemitterAccountNo from the Dropdown in the Modal (Mandatory)
 * @param {string} data.RemitID - Encrupted CardDetailsId of the Selected Card from the Pay Through Dropdown (Mandatory)
 * @param {string} data.ReferenceNos - ReferenceNos of the Record (Multiple - comma Seperated) (Mandatory)
 * @param {string} data.PayMateMode - PayMateMode of the Record from the Dropdown in the Modal (Mandatory)
 * @param {string} data.Message - Hardcoded: Approve:"Approved", Reject:"Rejected"(Mandatory)
 * @param {string} data.Status - Hardcoded: "001": Approve, "031": Reject(Mandatory)
 * @param {string} data.Remarks - "null": Aprpove, Remarks of the Prompt: Reject (Mandatory)
 * @param {string} data.ServiceType - Hardcoded : "web" (Mandatory)
 * @param {string} data.isPayer - Hardcoded: "false" (Mandatory)
 * @param {string} data.isApproval - Hardcoded: Approve:"true", Reject:"false" (Mandatory)
 *
 * @returns {undefined}
 */
export const processAPTransaction = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_PROCESS_APTRANSACTIONS, data);
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
    type: 'RESET_REMARK_PROMPT_DATA',
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
  return true;
};

/**
 * To Open The Approve Modal
 * openApproveDialog: state.vatPayments.openApproveVatPaymentDialog,
 *
 * @param {}
 * @returns {undefined}
 */
export const openApproveDialog = (data) => async (dispatch, getState) => {
  dispatch({
    type: OPEN_APPROVE_VAT_PAYMENT_DIALOG,
  });
};

/**
 * To Close The Approve Modal
 *
 * @param {}
 * @returns {undefined}
 */
export const closeApproveDialog = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_APPROVE_VAT_PAYMENT_DIALOG,
  });
};
