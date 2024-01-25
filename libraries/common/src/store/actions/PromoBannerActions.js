import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from './UIActions';
import {
  STORE_PROMO_CODE_DATA,
  LOADED,
  LOADING,
  SET_TABLE_REFRESH_FLAG,
} from './types';

/**
 * [POST REQUEST]
 * Stores PromoBanner table data -
 * promoCodeDataList: state.promoBanner.promoCodeDataList,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.Status - null (OPTIONAL)
 * @returns {undefined}
 */
export const getPromoCodeData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_PROMO_CODE_DATA, data);
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

  dispatch({
    type: STORE_PROMO_CODE_DATA,
    payload: responseData,
  });
};

/**
 * [POST request]
 * Saves promo banner to the backend -
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {boolean}
 */
export const submitPromoBanner = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SUBMIT_PROMO_CODE_DATA, data);
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
 * [POST request]
 * To Change the Status Code of the Record
 * Used for Approve, Deactivate, Delete Actions
 *
 * @param {Object} data - Mandatory
 * @param {string} data.Status - Hardcoded: 0-Delete, 1-Approve, 2-Deactivate (Mandatory)
 * @param {number} data.PromoId - PromoId of the selected Record (Mandatory)
 * @returns {undefined}
 */
export const managePromoConfiguration =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.MANAGE_PROMO_CONFIGURATION, data);
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
    dispatch({
      type: 'RESET_CONFIRM_PROMPT_DATA',
    });
  };
