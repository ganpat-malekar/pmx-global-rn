import axios from 'axios';
import moment from 'moment';
import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from './UIActions';
import { LOADED, LOADING, LOGIN_SUCCESS } from './types';

/**
 * [POST request]
 * Authenticates user from the authentication url received in the email for checkout -
 * saves state in: state.admin.user
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.Guid - guid received from the url param, Encrypted
 * @param {string} data.Process - prakriya received from the url param, Encrypted
 * @param {string} data.PaymentType - bhugtanprakriya received from the url param, Encrypted
 * @param {string} data.SenderUpdatedEmailId - "" pass empty string
 * @param {string} data.Status - null
 * @returns {undefined}
 */
export const authenticateSender = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.AUTHENTICATE_SENDER, data);
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

  if (Data?.ErrorCode === '999') {
    dispatch(
      showAlert({
        type: 'danger',
        message: 'Payment already processed',
      })
    );
    return;
  } else if (Data?.ErrorCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: 'Sorry, something went wrong',
      })
    );
    return;
  }

  // Fixing date format
  Data.TokenIssuedOn = moment(Data.TokenIssuedOn).format();
  Data.TokenExpiresOn = moment(Data.TokenExpiresOn).format();

  // Finally, store in reducer

  dispatch({
    type: LOGIN_SUCCESS,
    payload: { Data, AuthToken: Data.AuthToken },
  });

  return {
    RequestId: Data.RequestId,
    RequestRefNo: Data.RequestRefNo,
    AvailableTransactionType: Data.AvailableTransactionType,
  };
};
