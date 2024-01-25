import _ from 'underscore';
import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import { LOADING, LOADED } from '../types';
import {
  STORE_PENDING_APPROVAL,
  STORE_SENDER_RECEIVED_REQUEST,
  SET_TABLE_REFRESH_FLAG,
} from '../types';

/**
 * [POST request]
 * Store the Pending Approval List in the Reducer -
 * pendingApprovalList: state.pendingApproval.pendingApprovalList,
 *
 * @param {Object} data - payload (Optional)
 * @returns {undefined}
 */
export const getPendingApproval = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_PENDING_APPROVAL, data);
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
    type: STORE_PENDING_APPROVAL,
    payload: responseData,
  });
};

/**
 * [POST request]
 * Action to Call onClick of Pay Now -
 * senderReceivedRequest: state.pendingApproval.senderReceivedRequest,
 *
 * @param {Object} data - payload (Mandatory)
 * @param {string} data.PaymateMode - The "Pay From" value selected in the Modal (Mandatory)
 * @param {string} data.RemittorAccountID - Encrypted "RemittorAccountID" of the selected Card (Mandatory)
 * @param {string} data.RemittorAccountNo - Masked Card No selected in the Modal (Mandatory)
 * @param {string} data.RequestIds - Encrypted "RequestId" of the selected record (Mandatory)
 *
 * @returns {undefined}
 */
export const getSenderReceivedRequest =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_CONFIRM_SENDER_RECEIVED_REQUEST,
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

    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });

    // check if there is any need to store it in the reducer
    // if not Delete it from the reducer and types too
    // dispatch({
    //   type: STORE_SENDER_RECEIVED_REQUEST,
    //   payload: responseData,
    // });

    return true;
  };
