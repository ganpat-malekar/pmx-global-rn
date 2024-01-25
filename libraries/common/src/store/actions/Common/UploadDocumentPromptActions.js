import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import { LOADING, LOADED, STORE_SAVE_SINGLE_DOCUMENT_FILE } from '../types';

/**
 * [POST request]
 * Upload a Verified KYC Document-
 * saveSingleDocument: state.uploadDocumentPrompt.saveSingleDocument
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {Object} data.DocumentDetiailId - Encrypted DocumentDetiailId (MANDATORY)
 * @param {Object} data.DocumentContentstring - base64 (MANDATORY)
 * @param {Object} data.DocumentFileName - eg: three plus.pdf  (MANDATORY)
 * @param {Object} data.DocumentFileExtension - eg: .pdf  (MANDATORY)
 * @param {Object} data.UserId -  (OPTIONAL)
 * @param {Object} data.DocumentUploadFile - null (OPTIONAL)
 * @returns {undefined}
 */
export const saveSingleDocumentFile = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SAVE_SINGLE_DOCUMENT_FILE, data);
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
  dispatch({
    type: 'SET_TABLE_REFRESH_FLAG',
  });

  return true;
};

export const openUploadDocumentPrompt =
  (payload) => async (dispatch, getState) => {
    dispatch({
      type: 'STORE_UPLOAD_DOCUMENT_PROMPT_DATA',
      payload,
    });
  };

export const closeUploadDocumentPrompt = () => async (dispatch, getState) => {
  dispatch({
    type: 'RESET_UPLOAD_DOCUMENT_PROMPT_DATA',
  });
};
