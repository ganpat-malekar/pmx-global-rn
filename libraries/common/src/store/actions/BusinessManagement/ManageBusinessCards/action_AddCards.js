import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../UIActions';
import { LOADING, LOADED } from '../../types';

/**
 * Submits card data to the api
 * @param {Object} data
 * @param {string} data.CardVerificationValue - Encrypted
 * @param {string} data.DetailId - Encrypted
 * @param {string} data.CardTypeId - Encrypted
 * @param {string} data.CardNumber - Plaintext, with dashes
 * @param {string} data.IssueBankId - Encrypted
 * @param {string} data.CurrencyId - Encrypted
 * @param {string} data.CardNo - Encrypted, without dashes
 * @param {string} data.CardHoldername - Encrypted
 * @param {string} data.ExpiryDate - Encrypted, "mm/yyyy"
 * @param {string} data.ExpiryMonth - Encrypted
 * @param {string} data.ExpiryYear - Encrypted
 * @param {string} data.Status - Hardcoded, value = 5
 * @returns {boolean}
 */

// For table actions
export const submitCardDetails = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.ADD_CARD, data);
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

  // Finally
  if (responseData.strResponse !== null) {
    document.write(responseData.strResponse);
  }

  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );

  return true;
};
