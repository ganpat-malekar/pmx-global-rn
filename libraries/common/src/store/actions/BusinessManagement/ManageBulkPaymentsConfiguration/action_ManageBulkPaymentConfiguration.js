import _ from 'underscore';

import { encryptAES, errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../UIActions';
import {
  STORE_DESTINATION_FIELDS,
  STORE_BULK_CONFIGURATION_LIST_EXPORT,
  STORE_BULK_CONFIGURATION_LIST,
  LOADING,
  LOADED,
  CLOSE_BULK_PAYMENT_DELETE_DIALOG,
  OPEN_BULK_PAYMENT_DELETE_DIALOG,
  SET_TABLE_REFRESH_FLAG,
} from '../../types';

export const getDestinationFieldList = () => async (dispatch, getState) => {
  const data = {
    ClientId: encryptAES(0),
    Status: encryptAES(1),
  };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_COMPANY_FILE_SETTINGS, data);
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
    type: STORE_DESTINATION_FIELDS,
    payload: { Data },
  });
};

export const getBulkConfigurationList =
  (data) => async (dispatch, getState) => {
    // const data = {
    //   ClientId: "8026797F07FE87FC9845356D4E392875", // if no filter/default then encrypted "-1" eg "8026797F07FE87FC9845356D4E392875", else respective value
    //   Status: "7822DB5A03A9F7B910CE8C7417ABDEDE", // if no filter/default then encrypted "1" eg "7822DB5A03A9F7B910CE8C7417ABDEDE", else respective value
    //   DestinationFieldName: "", // decrypted, eg "Amount", dropdown /CommonManagement/FetchCompanyFileSettings, take DestinationFieldName for text and value
    //   PaymentType: "", // encrypted, eg "B8EB2D571FB2A28C88FFABD809CE1D4F", hardcode 1, 2 for "Make Payment", "Request Payment"
    //   SourceFieldName: "", // plain text
    //   FromRecord: "0",
    //   ToRecord: "10",
    //   PageNumber: "1",
    //   PageSize: "10",
    // };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_COMPANY_FILE_SETTINGS, data);
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
      // Finally, store in reducer
      dispatch({
        type: STORE_BULK_CONFIGURATION_LIST,
        payload: {},
      });
      return;
    }

    // Finally, store in reducer
    dispatch({
      type: STORE_BULK_CONFIGURATION_LIST,
      payload: responseData,
    });
  };

// For table actions
export const deleteCompanyFileSettings =
  (data) => async (dispatch, getState) => {
    // const data = {
    //   ClientId: "", // eg "34E1AE91662D4466D7C687EFE1CDA72D" from row
    //   Id: "", // eg "F49260DEB5DB364D208F6670906D50DC" from row
    // };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.UPDATE_COMPANY_FILE_SETTING, data);
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
    // dispatch({
    //   type: CLOSE_BULK_PAYMENT_DELETE_DIALOG,
    // });
  };

export const openDeleteDialog_new = (data) => (dispatch) => {
  dispatch({
    type: OPEN_BULK_PAYMENT_DELETE_DIALOG,
    payload: data,
  });
};

export const closeDeleteDialog_new = () => (dispatch) => {
  dispatch({
    type: CLOSE_BULK_PAYMENT_DELETE_DIALOG,
  });
};
