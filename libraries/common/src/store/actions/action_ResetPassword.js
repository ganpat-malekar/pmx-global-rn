import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from './UIActions';
import { LOADED, LOADING } from './types';

/**
 * Stores currency list in reducer -
 * basicUserInfoResponse: state.resetPassword.basicUserInfoResponse,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.Email - From activation code (MANDATORY)
 * @param {number} data.UserId - From activation code (MANDATORY)
 * @returns {undefined}
 */
export const getUserBasicInfoResetPassword =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.GET_USER_BASIC_INFO, data);
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

    dispatch({
      type: 'STORE_USER_BASIC_INFO_RESPONSE',
      payload: { response: responseData },
    });
  };

/**
 * Stores currency list in reducer -
 * signupDetailsResponse: state.resetPassword.signupDetailsResponse,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.ClientId - Encrypted UserId From activation code (MANDATORY)
 * @returns {undefined}
 */
export const getDetailsForSignUp =
  (data, redirect) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_VENDOR_DETAILS_FOR_SIGNUP,
        data
      );
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
      redirect();
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

    // Finally, store in reducer
    dispatch({
      type: 'STORE_SIGNUP_DETAILS_RESPONSE',
      payload: { response: responseData },
    });
  };

export const savePassword = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.API_CHANGE_PASSWORD, data);
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

  // Finally, store in reducer
  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );

  return true;
};
