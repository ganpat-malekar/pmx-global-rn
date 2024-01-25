import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../../UIActions';
import { LOADED, LOADING } from '../../../types';
import {
  STORE_DATA_TABLE_INFORMATION,
  STORE_GIBAN_BUSINESS,
  RESET_REMARK_PROMPT_DATA,
  RESET_CONFIRM_PROMPT_DATA,
  SET_TABLE_REFRESH_FLAG,
} from '../../../types';

export const getGIBANList =
  // (data, apiToFetchData) => async (dispatch, getState) => {
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_GIBAN_REPORT, data);
      // const response = await api.post(apiToFetchData, data);

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
      dispatch({
        type: STORE_DATA_TABLE_INFORMATION,
        payload: {},
      });
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

      dispatch({
        type: STORE_DATA_TABLE_INFORMATION,
        payload: {},
      });
      return;
    }

    // Finally, store in reducer
    dispatch({
      type: STORE_DATA_TABLE_INFORMATION,
      payload: responseData,
    });
    // console.log("Action: ", responseData);
  };

export const fetchGIBANBusiness = (CompanyId) => async (dispatch, getState) => {
  const data = {
    CompanyId,
  };
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_GIBAN_BUSINESS, data);
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

  // Finally, store in reducer
  dispatch({
    type: STORE_GIBAN_BUSINESS,
    payload: responseData,
  });
  // console.log("Action: ", responseData);
};

// the following can be used for both Approve and Delete
export const updateGIBANStatus = (data) => async (dispatch, getState) => {
  // const data = {
  //   GBanId: "", // GibanId which record to be delete
  //   Status: "0", // Delete(Status = 0)
  //   Remarks: "",
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.UPDATE_GIBAN_STATUS, data);
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
    type: RESET_CONFIRM_PROMPT_DATA,
  });
  dispatch({
    type: RESET_REMARK_PROMPT_DATA,
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
};
