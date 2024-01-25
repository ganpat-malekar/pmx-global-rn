import { config } from '@paymate/common/config';
import api from '@paymate/common/apimiddleware';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../../UIActions';
import {
  STORE_COMPANY_DETAILS,
  STORE_BASIC_INFO_RESPONSE,
  STORE_INTERNAL_KYC_API_RESPONSE,
  STORE_EXTERNAL_KYC_API_RESPONSE,
  LOADING,
  LOADED,
} from '../../types';
import { pick } from 'lodash';
import axios from 'axios';
import _ from 'underscore';
import {
  fetchAndStoreVendorInformation,
  flushVendorInformation,
} from '../../BusinessManagement/ManageBusinessContacts/action_AddContact';

export const storeCompanyDetails = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: STORE_COMPANY_DETAILS,
    payload: data,
  });
};

export const submitVendorBasicInformation =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.SUBMIT_VENDOR_BASIC_INFO, data);
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

    // Finally, store reponse in reducer
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return Data.ClientId;
  };

export const submitKycToInternalApi = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SAVE_AML_DETAILS, data);
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

  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );

  // Finally, store reponse in reducer
  dispatch({
    type: STORE_INTERNAL_KYC_API_RESPONSE,
    TaskId: Data.TaskId,
  });
};

export const submitKycToExternalApi = (data) => async (dispatch, getState) => {
  const headers = {
    Accept: 'application/json charset=utf-8',
    ClientAuthCode: config.AMLClientAuthCode,
  };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await axios(config.AMLAPIUrl, {
      method: 'POST',
      headers,
      data,
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
    console.log('No response.data: ', responseData);
    return;
  }

  const { statuscode, statusdesc, caseid } = responseData;
  if (statuscode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: statusdesc || 'Something went wrong',
      })
    );
    return;
  }

  dispatch(
    showAlert({
      type: 'success',
      message: statusdesc,
    })
  );

  // Finally, store reponse in reducer
  dispatch({
    type: STORE_EXTERNAL_KYC_API_RESPONSE,
    CaseId: caseid,
  });
};

export const resubmitKycToInternalApi =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.SAVE_AML_DETAILS, data);
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
  };
