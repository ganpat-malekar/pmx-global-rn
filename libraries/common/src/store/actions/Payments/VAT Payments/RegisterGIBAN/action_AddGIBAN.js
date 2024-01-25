import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../../UIActions';
import { LOADED, LOADING } from '../../../types';

/**
 * [POST request]
 * Saves GIBAN data to the backend -
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {boolean}
 */
export const submitGibanData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.SAVE_GIBAN;
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
 * Fetches data for the Giban form during edit.
 * Store in the reducer:
 * formEditData: state.addGiban.formEditData
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */
export const fetchEditFormData = (data) => async (dispatch) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.FETCH_GIBAN_REPORT;
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
  dispatch({
    type: 'STORE_EDIT_GIBAN_FORM_DATA',
    payload: { Data: Data[0] },
  });
};

export const flushEditFormData = () => (dispatch) => {
  dispatch({
    type: 'FLUSH_EDIT_GIBAN_FORM_DATA',
  });
};
