import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import {
  LOADING,
  LOADED,
  SEARCH_ALL_BUSINESS,
  STORE_COLLECTION_PAYMENTS,
  STORE_PAYABLE_PAYMENTS,
  SET_TABLE_REFRESH_FLAG,
  STORE_TAXABLE_PAYMENTS,
  CLOSE_VIEW_DIALOG_BOX,
  STORE_SETTLEMENT_TRANSACTION_VIEW_HISTORY,
  OPEN_VIEW_SETTLEMENT_DIALOG,
  CLOSE_VIEW_SETTLEMENT_DIALOG,
} from '../types';

/**
 * [POST request]
 * Api to Fetch All The Businessess for the Dropdown -
 * searchAllBusinessList: state.settlementsReducer.searchAllBusinessList,
 *
 * @param {}
 * @returns {undefined}
 */
export const getSearchAllBusiness = () => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_SEARCH_ALL_BUSINESS);
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

  // Finally
  dispatch({
    type: SEARCH_ALL_BUSINESS,
    payload: { Data },
  });
};

// COLLECTION PAYMENTS
// DATA TABLE
/**
 * [POST request]
 * Api to Fetch The Data for the DataTable
 * collectionPaymentList: state.settlementsReducer.collectionPaymentList,
 *
 * @param {Object} data - (MANDATORY)
 * @param {object} data.TransactionStatus - "null" Hardcoded (MANDATORY)
 * @returns {undefined}
 */
export const getCollectionPayments = (data) => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.FETCH_PENDING_RECEIVED_PAYMENTS_TRANSACTION,
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

  // Finally
  dispatch({
    type: STORE_COLLECTION_PAYMENTS,
    payload: responseData,
  });
};

// TABLE ACTIONS

/**
 * [POST request]
 * Api to Send a Transaction for Settlement
 *
 * @param {Object} data - (MANDATORY)
 * @param {string} data.DebitIds - Comma Seperated List of DebitIds of the Selected Rows(MANDATORY)
 * @param {string} data.EventId - "SettlementManagement/ConfirmPGTransaction" - HardCoded (MANDATORY)
 *
 * @returns {undefined}
 */
export const settlePGTransactions = (data) => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_SETTLE_PG_TRANSACTIONS, data);
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
  dispatch({
    type: CLOSE_VIEW_DIALOG_BOX,
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
};

// PAYABLE PAYMENTS
// DATA TABLE
/**
 * [POST request]
 * Api to Fetch Data for the Data Table
 * payablePaymentList: state.settlementsReducer.payablePaymentList,
 *
 * @param {Object} data - (MANDATORY)
 * @param {Number} data.TransactionStatus - Value - 012 , Hardcoded (MANDATORY)
 * @returns {undefined}
 */
export const getPayablePayments = (data) => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.FETCH_PENDING_PAYABLE_PAYMENTS_TRANSACTION,
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

  // Finally
  dispatch({
    type: STORE_PAYABLE_PAYMENTS,
    payload: responseData,
  });
};

/**
 * [POST request]
 * Api to Hold and Unhold a particular Transaction in Review Actions
 * No Need to Store Data in the Reducer
 *
 * @param {Object} data - (MANDATORY)
 * @param {string} data.ReferenceNos - Encrypted (eg: "EEC7EEBC1D2F5753C05EE6E611EAFE48") (MANDATORY), Take DebitId of the row
 * @param {string} data.Status - Hardcoded ( 036-Refund to Xpress Account, 037-Release Hold, 038-Hold) (MANDATORY)
 * @param {string} data.Remarks - Remark (MANDATORY)
 *
 * @returns {undefined}
 */

export const updateSettlementTransactionStatus =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_SETTLEMENT_TRANSACTION_STATUS,
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
      type: 'RESET_CONFIRM_PROMPT_DATA',
    });
    dispatch({
      type: 'RESET_REMARK_PROMPT_DATA',
    });
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
  };

// TAXABLE PAYMENTS
// DATA TABLE
/**
 * [POST request]
 * Api to Fetch Data for the Data Table
 * taxablePaymentList: state.settlementsReducer.taxablePaymentList,
 *
 * @param {Object} data - (MANDATORY)
 * @param {Number} data.TransactionStatus - Value - 012 , Hardcoded (MANDATORY)
 * @returns {undefined}
 */
export const getTaxablePayments = (data) => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.FETCH_VAT_PENDING_PAYABLE_PAYMENT_TRANSACTIONS,
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

  // Finally
  dispatch({
    type: STORE_TAXABLE_PAYMENTS,
    payload: responseData,
  });
};

/**
 * [POST request]
 * Api to Hold and Unhold a particular Transaction Record
 * No Need to Store Data in the Reducer
 *
 * @param {Object} data - (MANDATORY)
 * @param {string} data.DebitIds -Take DebitId of the row (MANDATORY)
 * @param {string} data.Status - Hardcoded(Hold: 035, Unhold: 012) (MANDATORY)
 * @param {string} data.Remarks - Remark (MANDATORY)
 *
 * @returns {undefined}
 */
export const updateTransactionHoldStatus =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.UPDATE_TRANSACTION_HOLD_STATUS,
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
  };

// Action Column - View Action
/**
 * To store the Settlement View History
 * viewSettlementHistoryList: state.settlementsReducer.settlementTransactionViewHistoryList,
 *
 * @param {Object} data - (Mandatory)
 * @param {Object} data.RequestId - Debit Id (Mandatory)
 * @returns {undefined}
 */
export const getSettlementTransactionViewHistory =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_SETTLEMENT_TRANSACTION_VIEW_HISTORY,
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

    // Finally, store in reducer
    dispatch({
      type: STORE_SETTLEMENT_TRANSACTION_VIEW_HISTORY,
      payload: responseData,
    });
  };

/**
 * To Open The View Settlement Modal
 * openViewSettlementDialog: state.settlementsReducer.openViewSettlementDialog,
 *
 * @param {}
 * @returns {undefined}
 */
export const openViewSettlementDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_VIEW_SETTLEMENT_DIALOG,
  });
};

/**
 * To Close The View Settlement Modal
 *
 * @param {}
 * @returns {undefined}
 */
export const closeViewSettlementDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VIEW_SETTLEMENT_DIALOG,
  });
};
