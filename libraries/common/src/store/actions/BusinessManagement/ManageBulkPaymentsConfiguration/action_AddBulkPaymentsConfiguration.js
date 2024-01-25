import _ from 'underscore';

import { encryptAES, errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../UIActions';
import {
  STORE_BUSINESS_LIST,
  STORE_COMPANY_FILE_SETTINGS,
  LOADING,
  LOADED,
} from '../../types';

export const getDestinationFields = () => async (dispatch, getState) => {
  const data = {
    ClientId: encryptAES(0),
    Status: encryptAES(1),
  };

  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_COMPANY_FILE_SETTINGS, data);
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
    type: STORE_COMPANY_FILE_SETTINGS,
    payload: { Data },
  });
};

export const submitCompanyFileSettings =
  (fileSettings) => async (dispatch, getState) => {
    const data = [{ ...fileSettings }];

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.SUBMIT_COMPANY_FILE_SETTINGS,
        data
      );
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
      return false;
    }

    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };
