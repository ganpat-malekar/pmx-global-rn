import {
  STORE_ALL_BANK_ACCOUNT_LIST,
  STORE_ALL_BANK_ACCOUNT_LIST_EXPORT,
  LOADING,
  LOADED,
  CLOSE_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG,
  OPEN_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG,
  SET_TABLE_REFRESH_FLAG,
} from '../../types';
import { config } from '@paymate/common/config';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../../UIActions';
import _ from 'underscore';
import api from '@paymate/common/apimiddleware';

export const getAllBankAccountList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   CompanyId: "", // decrypted, eg: decryptAES("8B24709A368F7B6AD0350E7985A0DBA8")
    //   CurrencyId: "", // encrypted, eg: "B8EB2D571FB2A28C88FFABD809CE1D4F"
    //   Status: "", // decrypted, eg: "2", Hardcode: "Deleted", "Active", "Regected", "Deactive", "Awating to appove" for 0, 1, 2, 4, 5 Respectively
    //   FromDate: "", // eg "09/12/2021"
    //   ToDate: "", // eg "09/04/2022"
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
      const response = await api.post(config.FETCH_ALL_BANK_ACCOUTNS, data);
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
    if (filename) {
      dispatch({
        type: STORE_ALL_BANK_ACCOUNT_LIST_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_ALL_BANK_ACCOUNT_LIST,
        payload: responseData,
      });
    }
  };

// For table actions
export const manageSettlementBank = (data) => async (dispatch, getState) => {
  // const data = {
  //   AccountType: "", // fixed
  //   CompanyBankId: "", // eg "08169464DA7BA465624ECDC193B149AF", encrypted CompanyBankId from the row
  //   CompanyId: "", // eg "8B24709A368F7B6AD0350E7985A0DBA8", encrypted CompanyId from the row
  //   Remarks: "", // eg "test delete"
  //   Status: 0, // eg 0 for delete, 1 for approve, 2 for reject, 4 for deactivate
  //   VanAccountNo: null, // fixed
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.SET_COMPANY_BANK_DETAIL_DEFAULT,
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
    type: 'RESET_REMARK_PROMPT_DATA',
  });
  dispatch({
    type: CLOSE_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG,
  });
};

export const openDeleteDialog = (data) => (dispatch) => {
  dispatch({
    type: OPEN_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG,
    payload: data,
  });
};

export const closeDeleteDialog = () => (dispatch) => {
  dispatch({
    type: CLOSE_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG,
  });
};

/**
 * [POST request]
 * Saves subscription to the backend -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyBankId - Encrypted, take from the row (MANDATORY)
 * @param {string} data.CompanyId - Encrypted, take from the row (MANDATORY)
 * @param {string} data.AccountType - Plaintext, take BranchAddress from the row (MANDATORY)
 * @param {number} data.Status - 3, Hardcoded (MANDATORY)
 *
 * @returns {boolean}
 */
export const submitDefaultBank = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.SET_DEFAULT_BANK;
    const response = await api.post(url, data);
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
