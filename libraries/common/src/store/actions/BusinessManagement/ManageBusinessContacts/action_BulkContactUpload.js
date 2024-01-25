import {
  LOADING,
  LOADED,
  STORE_BULK_CONTACT_TABLE_DATA,
  CLEAR_BULK_CONTACT_TABLE_DATA,
} from '../../types';
import { config } from '@paymate/common/config';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../../UIActions';
import _ from 'underscore';
import api from '@paymate/common/apimiddleware';

/**
 * [POST request]
 * Sends data for validation and stores validation reponse in store -
 * bulkContactTableData: state.bulkContact.bulkContactTableData.Data
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - The companyid of the business of the selected dropdown item (MANDATORY)
 * @param {Array.<Object>} data.lstBulkContact - Rows extracted from the excel file (MANDATORY)
 * @param {string} data.UploadedBy - userid from the tokenData, plaintext
 * @returns {boolean}
 */
export const sendBulkContactFileForValidation =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.UPLOAD_BULK_CONTACTS, data);
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
    dispatch({
      type: STORE_BULK_CONTACT_TABLE_DATA,
      payload: responseData,
    });

    return true;
  };

/**
 * [POST request]
 * Send confirmation to server, to save the 'correct' bulk contacts records -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Encrypted. Received form the response of sendBulkContactFileForValidation() api (MANDATORY)
 * @param {string} data.UploadedBy - Encrypted. Received form the response of sendBulkContactFileForValidation() api (MANDATORY)
 * @returns {boolean}
 */
export const confirmBulkContact = (data) => async (dispatch, setState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.CONFIRM_BULK_UPLOAD_CONTACTS, data);
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

export const clearTableData = () => (dispatch, setState) => {
  dispatch({
    type: CLEAR_BULK_CONTACT_TABLE_DATA,
  });
};
