import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { closeViewVendorDialogFn } from '../ManageBusinessContacts/action_ManageContacts';
import { showAlert } from '../../UIActions';
import {
  STORE_BANK_ACCOUNT_COUNTRIES,
  STORE_BANK_ACCOUNT_BANKS,
  STORE_BANK_ACCOUNT_TABLE_DATA,
  LOADING,
  LOADED,
  SET_TABLE_REFRESH_FLAG,
} from '../../types';

export const getCountryList = (status) => async (dispatch, getState) => {
  const data = {
    Status: status ?? true,
  };

  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
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
    type: STORE_BANK_ACCOUNT_COUNTRIES,
    payload: { Data },
  });
};

export const getBankList = (CountryId) => async (dispatch, getState) => {
  const data = {
    CountryId,
  };

  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_BANKS, data);
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
    type: STORE_BANK_ACCOUNT_BANKS,
    payload: { Data },
  });
};

export const getBankAccountTableData =
  (ClientId) => async (dispatch, getState) => {
    const data = {
      ClientId,
      CheckStatus: '1,5', // Put in config
    };
    console.log(ClientId);
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.FETCH_BANK_ACCOUNT_TABLE_DATA,
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
      type: STORE_BANK_ACCOUNT_TABLE_DATA,
      payload: { Data },
    });
  };

export const flushBankAccountTable = () => (dispatch) => {
  dispatch({
    type: 'FLUSH_BANK_ACCOUNT_TABLE_DATA',
  });
};

export const submitBankAccountDetails =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.SUBMIT_BANK_ACCOUNT_DETAIL, data);
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

    return Data.ClientId;
  };

export const deleteBankAccount = (data) => async (dispatch, getState) => {
  let responseData = null;

  // export const deleteBankAccount = (AccountId) => async (dispatch, getState) => {
  // const data = {
  //   AccountId,
  //   Status: "0",
  // };

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.DELETE_BANK_ACCOUNT, data);
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

  dispatch(closeViewVendorDialogFn());

  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
  return true;
};
