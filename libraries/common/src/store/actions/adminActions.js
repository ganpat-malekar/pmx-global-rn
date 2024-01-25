import axios from 'axios';
import _ from 'underscore';
import { showAlert, showLoginPopup, showSessionPopup } from './UIActions';
import {
  LOADING,
  LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_USER_IP,
  SAVE_EXISTING_AUTH_TOKEN,
  EXTEND_SESSION,
  SAVE_TOKEN_DATA,
  SAVE_USER_BASIC_INFORMATION,
  STORE_MULTIPLE_ACCOUNTS,
  UPDATE_BUSINESS_USER,
  STORE_GEOGRAPHIC_DETAILS,
  STORE_REGION_CODE,
} from './types';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

// IP

const randomSessionId = () =>
  Array.from({ length: Math.floor(Math.random() * 6) + 25 }, () =>
    'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(
      Math.floor(Math.random() * 36)
    )
  ).join('');

// Fetch Geographic Details
export const fetchGeographicDetails = (data) => async (dispatch) => {
  let responseData = null;
  console.log(data);
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.GEOGRAPHIC_DETAILS, data, {
      headers: {
        BrowserSessionID: randomSessionId(),
        MMID: 'CAE6AF7B-90C0-4A8D-ADAE-B9ADDB39A1A5',
        MTID: '4FFDDEA8-6EE0-4934-B85C-4E8E75B99237',
        XpressID: 'SHRIAUCPONE',
        IPAdress: '110.224.118.142',
        MethodName: 'all',
      },
    });
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    dispatch({
      type: LOADED,
    });
  }

  if (_.isEmpty(responseData)) {
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

  //Finally, store in reducer;
  dispatch({
    type: STORE_GEOGRAPHIC_DETAILS,
    payload: JSON.parse(Data),
  });
};

export const storeRegionCode = (data) => (dispatch) => {
  dispatch({ type: STORE_REGION_CODE, payload: data });
};

// Sign In User
export const signIn = (data) => async (dispatch) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.API_LOGIN, data, {
      headers: { BrowserSessionID: randomSessionId() },
    });
    responseData = response.data;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });

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

  const { Status, AuthToken, Data, Description } = responseData;

  if (Status === false && AuthToken === '') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description,
      })
    );

    dispatch({
      type: LOGIN_FAIL,
    });
  } else if (Status === false && AuthToken !== '') {
    // Meaning, user is logged in from another machine
    // Ask if user wants to continue from this Machine i.e., Show a prompt popup
    dispatch({
      type: SAVE_EXISTING_AUTH_TOKEN,
      payload: { AuthToken },
    });
    dispatch(
      showLoginPopup({
        message: Description,
      })
    );
  } else if (Status === true && AuthToken !== '') {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { Data, AuthToken },
    });
    // TODO: uncomment this once this api is given for apac
    dispatch(getDataOfToken());
  }
};

export const continueSignIn = (data) => async (dispatch) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });

  try {
    const response = await api.get(config.API_LOGOUT);
    responseData = response.data;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    errorAlertHandler(error, dispatch);
  } finally {
    dispatch({
      type: LOADED,
    });
  }

  dispatch(signIn(data));
};

export const signOut = () => async (dispatch, getState) => {
  let responseData = null;
  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.get(config.API_LOGOUT);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    // dispatch({
    //   type: LOADED,
    // });
  }
  // Finally, store in reducer
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const extendSession = () => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.get(config.API_EXTEND_SESSION);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    // dispatch({
    //   type: LOADED,
    // });
  }

  if (_.isEmpty(responseData)) {
    console.log('No response.data: ', responseData);
    return;
  }

  const { AuthToken, IssuedOn, ExpiresOn } = response.data;

  // Finally, store in reducer
  dispatch({
    type: EXTEND_SESSION,
    payload: { AuthToken, IssuedOn, ExpiresOn },
  });
};

export const getDataOfToken = () => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.get(config.GET_DATA_AGAINST_TOKEN);
    responseData = { ...response.data };
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    // dispatch({
    //   type: LOADED,
    // });
  }

  const { Status, Data } = responseData;
  if (Status === true) {
    dispatch({
      type: SAVE_TOKEN_DATA,
      payload: { Data },
    });
    dispatch(getUserBasicInfo({ UserId: Data.UserId }));
  } else {
    // Show can't fetch session data
  }
};

export const getUserBasicInfo = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.GET_USER_BASIC_INFO, data);
    responseData = { ...response.data };
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    // dispatch({
    //   type: LOADED,
    // });
  }

  const { TotalRecords, Status, PartialUserData } = responseData;
  if (PartialUserData) {
    dispatch({
      type: SAVE_USER_BASIC_INFORMATION,
      payload: PartialUserData,
    });
  } else {
    // Show can't fetch session data
  }
};

/**
 * [POST request]
 * To check if a particular user has multiple businessess-
 * multipleAccountsData: state.admin.multipleAccountsData
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.UserId  - Encrypted UserId tokenData (MANDATORY)
 * @returns {undefined}
 */
export const getMultipleAccounts = (data) => async (dispatch, getState) => {
  let responseData = null;
  //   dispatch({
  //     type: LOADING,
  //   });
  try {
    const response = await api.post(config.GET_MULTIPLE_ACCOUNTS, data);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    // dispatch({
    //   type: LOADED,
    // });
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
    type: STORE_MULTIPLE_ACCOUNTS,
    payload: responseData,
  });
};

/**
 * [POST request]
 * Used to Identify and switch between two businessess of the same user-
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.UserId  - Encrypted UserId (MANDATORY)
 * @param {string} data.CompanyId   - Encrypted CompanyId  (MANDATORY)
 * @returns {undefined}
 */
export const getDashboardMultipleAccounts =
  (data) => async (dispatch, getState) => {
    let responseData = null;
    //   dispatch({
    //     type: LOADING,
    //   });
    try {
      const response = await api.post(
        config.GET_DASHBOARD_MULTIPLE_ACCOUNTS,
        data
      );
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
      // dispatch({
      //   type: LOADED,
      // });
    }

    if (_.isEmpty(responseData)) {
      console.log('No response.data: ', responseData);
      return;
    }

    const { StatusCode, Description, Data } = responseData;

    // if (StatusCode !== "000") {
    //   dispatch(
    //     showAlert({
    //       type: "danger",
    //       message: Description || "Something went wrong",
    //     })
    //   );
    //   return;
    // }

    // Finally, store in reducer
    dispatch({
      type: UPDATE_BUSINESS_USER,
      payload: { ...Data },
    });
    dispatch(getDataOfToken());
    return true;
  };

export const clearLoggedInUser = () => (dispatch) => {
  dispatch({ type: 'LOGOUT_SUCCESS' });
};
