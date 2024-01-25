import {
  STORE_BUSINESS_USER_BUSINESS_LIST,
  STORE_BUSINESS_USER_COUNTRY_LIST,
  STORE_BUSINESS_USER_DEPARTMENTS_MAPPED_ROLE,
  STORE_BUSINESS_USER_DATA,
  LOADING,
  LOADED,
} from '../../types';
import { config } from '@paymate/common/config';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../../UIActions';
import _ from 'underscore';
import api from '@paymate/common/apimiddleware';

export const getUserData_new = (UserId) => async (dispatch, getState) => {
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
    type: STORE_BUSINESS_USER_DATA,
    payload: { Data },
  });
};

// Dropdowns for IsdCode
export const getCountryList_new2 = (status) => async (dispatch, getState) => {
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
    type: STORE_BUSINESS_USER_COUNTRY_LIST,
    payload: { Data },
  });
};

export const getDepartmentsMappedRoles_new =
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
      type: STORE_BUSINESS_USER_DEPARTMENTS_MAPPED_ROLE,
      payload: { Data },
    });
  };

export const submitUserData_new = (data) => async (dispatch, getState) => {
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
