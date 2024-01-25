import _ from 'underscore';

import errorAlertHandler from '../../../../helper/errorAlertHandler';

import api from '../../../../apimiddleware';
import { config } from '../../../../config';

import { showAlert } from '../../UIActions';
import {
  STORE_USER_COUNTRY_LIST,
  STORE_USER_CHANNEL_PARTNER_LIST,
  STORE_USER_DEPARTMENTS_MAPPED_ROLE,
  STORE_USER_DATA,
  LOADING,
  LOADED,
} from '../../types';

export const getUserData = (UserId) => async (dispatch, getState) => {
  const data = {
    UserId,
  };
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_BUSINESS_USER_DATA, data);
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
  dispatch({
    type: STORE_USER_DATA,
    payload: { Data },
  });
};

// Dropdowns for IsdCode
export const getCountryList_new = (status) => async (dispatch, getState) => {
  const data = {
    Status: status ?? true,
  };

  let responseData = null;

  //   dispatch({
  //     type: LOADING,
  //   });
  try {
    const response = await api.post(config.FETCH_COUNTRIES, data);
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
    type: STORE_USER_COUNTRY_LIST,
    payload: { Data },
  });
};

export const getChannelPartnerList =
  (ChannelPartnerTypeId) => async (dispatch, getState) => {
    const data = {
      ChannelPartnerTypeId,
    };

    let responseData = null;

    //   dispatch({
    //     type: LOADING,
    //   });
    try {
      const response = await api.post(config.FETCH_CHANNEL_PARTNER_LIST, data);
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
      type: STORE_USER_CHANNEL_PARTNER_LIST,
      payload: { Data },
    });
  };

export const getDepartmentsMappedRoles =
  (status) => async (dispatch, getState) => {
    const data = {};

    let responseData = null;

    //   dispatch({
    //     type: LOADING,
    //   });
    try {
      const response = await api.post(
        config.FETCH_DEPARTMENTS_MAPPED_ROLES,
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
      type: STORE_USER_DEPARTMENTS_MAPPED_ROLE,
      payload: { Data, UserType: getState().admin.tokenData.UserType },
    });
  };

export const submitUserData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SAVE_USER, data);
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
  console.log(responseData);
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

  return true;
};
