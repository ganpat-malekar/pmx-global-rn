import axios from 'axios';
import _ from 'underscore';

import { handleFileModal, closeFileModal } from './Common/filePopupActions';
import { showAlert } from './UIActions';
import {
  STORE_REPORTS_STATUS_CODES,
  STORE_PAYMENT_RECEIVED_REPORT,
  STORE_PAYMENT_RECEIVED_REPORT_EXPORT,
  STORE_MAKE_PAYMENTS_REPORT,
  STORE_MAKE_PAYMENTS_REPORT_EXPORT,
  STORE_GATEWAY_TRANSACTION_BUSINESS_REPORT,
  STORE_GATEWAY_TRANSACTION_BUSINESS_REPORT_EXPORT,
  STORE_BUSINESS_SUBSCRIPTION_REPORT,
  STORE_BUSINESS_SUBSCRIPTION_REPORT_EXPORT,
  STORE_ACCOUNT_BALANCE_HISTORY_REPORT,
  STORE_ACCOUNT_BALANCE_HISTORY_REPORT_EXPORT,
  STORE_VENDOR_SUBSCRIPTION_REPORT,
  STORE_VENDOR_SUBSCRIPTION_REPORT_EXPORT,
  STORE_SETTLEMENT_TRANSACTION_REPORT,
  STORE_SETTLEMENT_TRANSACTION_REPORT_EXPORT,
  STORE_RECEIVED_PAYMENT_VIEW_SUMMARY_REPORT,
  STORE_MAKE_PAYMENT_HISTORY,
  STORE_MAKE_PAYMENT_HISTORY_GRID,
  STORE_INVOICE_ATTACHMENT,
  LOADING,
  LOADED,
  FETCH_VENDORS_BY_COMPANY,
  OPEN_VIEW_COLLECTION_DIALOG,
  CLOSE_VIEW_COLLECTION_DIALOG,
  CLOSE_VIEW_PAYMENT_DIALOG,
  OPEN_VIEW_PAYMENT_DIALOG,
  OPEN_VIEW_GATEWAY_SUMMARY_DIALOG,
  CLOSE_VIEW_GATEWAY_SUMMARY_DIALOG,
  STORE_TAX_PAYMENT_REPORT,
  STORE_REGISTERED_BUSINESS_REPORT,
  STORE_MADE_PAYMENTS_REPORT,
  OPEN_DOWNLOAD_ATTACHMENT_DIALOG,
  CLOSE_DOWNLOAD_ATTACHMENT_DIALOG,
  SET_TABLE_REFRESH_FLAG,
  STORE_GIBAN_DETAILS,
  STORE_DISCOUNTING_REPORTS,
  STORE_MANAGE_CONTRACTS,
  STORE_PAYMENT_RECEIVED_VENDOR_REPORTS,
  STORE_RENT_COLLECTION_REPORTS,
} from './types';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

export const getStatusCodes = (data, type) => async (dispatch, getState) => {
  // data = {
  //   Status: "'005','023','000','019','010','014'", // Put in config for collections
  //   Status: "'000','001','005','008','031','010','013','014','023','019'", // Put in config for payments
  //   Status: "'010','013','000'", // Put in config for gateway transactions
  //   Status: "'000','010','012','023','032'", // Put in config for settlement transaction report
  //   SortExpression: "",
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_REPORT_STATUS_DROPDOWN, data);
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
    type,
    payload: { Data },
  });
};

// For collections listing
export const getCollectionList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   CompanyName: "", // eg "Dairy Milk" Decrypted,
    //   CompanyIds: "", // eg "20199" Decrypted CompanyId (Business Name)
    //   Currency: "", // eg "5E0BCE671DEB4A1E0E1CA4B0E99F9525" Encrypted 'USD' or 'AED'
    //   status: "'005','023','000','010','014'", // Decrypted comma separated. If CompanyId = 1 then '005','023','000','019','010','014'"
    //   TrxnId: "", // eg "1358171674314" Decrypted
    //   FromDate: "", // eg "30/11/2021" Decrypted
    //   ToDate: "", // eg "01/05/2022" Decrypted
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
      const response = await api.post(
        config.FETCH_PAYMENT_RECEIVED_REPORT,
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
    if (filename) {
      dispatch({
        type: STORE_PAYMENT_RECEIVED_REPORT_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_PAYMENT_RECEIVED_REPORT,
        payload: responseData,
      });
    }
  };

// For payments list
export const getPaymentList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   CompanyIds: "", // eg "250400" Decrypted CompanyId (Business Name)
    //   PaymentTo: "", // eg "A8D6B8B508D7837E08E6D7D07A230329" Encrypted - ClientId of a company from 'All companies' filter,
    //   status: "'000','001','005','008','031','010','013','014','023'", // Decrypted comma separated. If CompanyId = 1 then '000','001','005','008','031','010','013','014','023','019'
    //   Currency: "", // eg "5E0BCE671DEB4A1E0E1CA4B0E99F9525" Encrypted 'USD' or 'AED' - NOT WORKING
    //   TrxnId: "", // eg "2117168246267" Decrypted
    //   FromDate: "", // eg "30/11/2021" Decrypted
    //   ToDate: "", // eg "01/05/2022" Decrypted
    //   PaymentType: "1,2", // Required
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
      const response = await api.post(config.FETCH_MAKE_PAYMENTS_REPORT, data);
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
        type: STORE_MAKE_PAYMENTS_REPORT_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_MAKE_PAYMENTS_REPORT,
        payload: responseData,
      });
    }
  };

// For payment gateway transactions list
export const getGateWayTransactionList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   CompanyIds: "", // eg "120379" Decrypted CompanyId (Business Name)
    //   PaymentMode: "", // eg "Xpress Account" or "Credit Card" Decrypted hardcoded
    //   CurrencyText: "", // eg "AED" or "USD" Decrypted hardcoded
    //   PgStatusId: "", // eg "8360BA91A111942C842D7C7349BCAA20" Encrypted statuses 010 or 013 or 000
    //   RequestRefNo: "", // eg "2112160511993" Decrypted. It is the TransactionId from the listing
    //   FromDate: "", // eg "30/11/2021" Decrypted
    //   ToDate: "", // eg "01/05/2022" Decrypted
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
      const response = await api.post(
        config.FETCH_GATEWAY_TRANSACTION_BUSINESS_REPORT,
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
    if (filename) {
      dispatch({
        type: STORE_GATEWAY_TRANSACTION_BUSINESS_REPORT_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_GATEWAY_TRANSACTION_BUSINESS_REPORT,
        payload: responseData,
      });
    }
  };

// Payment Gateway Transactions - Get Status Action
/**
 * [POST request]
 * A request to refresh the Payment Status -
 *
 * @param {Object} data - encrypted OrderId (MANDATORY)
 * @returns {undefined}
 */
export const getPGStatus = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_PG_PAYMENT_STATUS, data);
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

  if (StatusCode === null) {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'No Status fetched from the database',
      })
    );
    return;
  } else if (StatusCode !== '000') {
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
};

// For payment gateway transactions list
export const getBusinessSubscriptionList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   CompanyIds: "", // eg "80343" Decrypted CompanyId (Business Name)
    //   SubscriptionType: "Business", // Required, hardcoded.
    //   SubscriptionStatusText: "", // eg "0" Decrypted, hardcode : 0, 1, 2, 3, 4, 5 for (Expired, Active, Pending Aapproval, Registered, Suspended, Deleted) respectively.
    //   PaymentMode: "", // eg "Credit Card" only. Decrypted hardcoded
    //   CurrencyText: "", // eg "AED" or "USD" Decrypted hardcoded
    //   OrderId: "", // eg "135514000441" Decrypted
    //   FromDate: "", // eg "30/11/2021" Decrypted
    //   ToDate: "", // eg "01/05/2022" Decrypted
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
      const response = await api.post(
        config.FETCH_BUSINESS_SUBSCRIPTION_REPORT,
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
    if (filename) {
      dispatch({
        type: STORE_BUSINESS_SUBSCRIPTION_REPORT_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_BUSINESS_SUBSCRIPTION_REPORT,
        payload: responseData,
      });
    }
  };

// For payment gateway transactions list
export const getAccountBalanceHistoryList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   CompanyIds: "", // eg "731806D56080B300EE2B6DC759DAF9E1" encrypted CompanyId (Businame Name field)
    //   CurrencyCode: "", // eg "5E0BCE671DEB4A1E0E1CA4B0E99F9525" encrypted 'USD' or  123CFE2BE374E91AB8B911F66243B5B2 for 'AED'
    //   RequestRefNo: "", // eg "0011138473527" Decrypted
    //   FromDate: "", // eg "30/11/2021" Decrypted
    //   ToDate: "", // eg "01/05/2022" Decrypted
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
      const response = await api.post(
        config.FETCH_ACCOUNT_BALANCE_HISTORY_REPORT,
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
    if (filename) {
      dispatch({
        type: STORE_ACCOUNT_BALANCE_HISTORY_REPORT_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_ACCOUNT_BALANCE_HISTORY_REPORT,
        payload: responseData,
      });
    }
  };

export const getBusinessAccountBalanceDetailsList =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_BUSINESS_ACCOUNT_BALANCE_DETAILS_REPORT,
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
      type: STORE_ACCOUNT_BALANCE_HISTORY_REPORT,
      payload: responseData,
    });
  };

// For payment gateway transactions list
export const getVendorSubscriptionList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   CompanyIds: "", // eg "120379" Decrypted CompanyId (Business Name)
    //   SubscriptionType: "vendor", // Required, hardcoded.
    //   SubscriptionTypeId: "", // eg "33" Decrypted Id of Standard or Enterprise. Use CommonManagement/GetTypesData?objTypeName=11 api and use decrypted DetailId for dropdown
    //   SubscriptionStatusText: "", // eg "0" Decrypted, hardcode : 0, 1, 2, 3, 4, 5 for (Expired, Active, Pending Aapproval, Registered, Suspended, Deleted) respectively.
    //   PaymentFromId: "Credit Card", // eg "Xpress Account" or "Credit Card" Decrypted hardcoded
    //   CurrencyText: "", // eg "AED" or "USD" Decrypted hardcoded
    //   OrderId: "", // eg "002217000421" Decrypted
    //   FromDate: "", // eg "30/11/2021" Decrypted
    //   ToDate: "", // eg "01/05/2022" Decrypted
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
      const response = await api.post(
        config.FETCH_BUSINESS_SUBSCRIPTION_REPORT,
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
    if (filename) {
      dispatch({
        type: STORE_VENDOR_SUBSCRIPTION_REPORT_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_VENDOR_SUBSCRIPTION_REPORT,
        payload: responseData,
      });
    }
  };

// For payment gateway transactions list
export const getSettlementTransactionList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   CompanyIds: "", // eg "110352" Decrypted CompanyId (Business Name)
    //   PaymentType: "", // eg "3" for Payable and "4" for Receivable. Decrypted. Use DetailId from CommonManagement/GetTypesData?objTypeName=2 api
    //   CurrencyText: "", // eg "AED" or "USD" Decrypted hardcoded
    //   SettlementBankId: "", // eg "5", Decrypted RegistrarId of 'Settlement Bank'. Use /GatewayManagement/FetchRegistrarMaster api, and filter RegistrarTypeId === "9"
    //   SettlementStatusCode: "", // eg "9627AE7620FA6810AED2C3D9697CE887". Encrypted value, any of "'000','010','012','023','032'"
    //   RequestRefNo: "", // eg "1202114438467". Decrypted RequestRefNo from the listing
    //   TransactionId: "", // eg "1202114438467" Decrypted. NOT WORKING
    //   FromDate: "", // eg "30/11/2021" Decrypted
    //   ToDate: "", // eg "01/05/2022" Decrypted
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
      const response = await api.post(
        config.FETCH_SETTLEMENT_TRANSACTION_REPORT,
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
    if (filename) {
      dispatch({
        type: STORE_SETTLEMENT_TRANSACTION_REPORT_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_SETTLEMENT_TRANSACTION_REPORT,
        payload: responseData,
      });
    }
  };

// View Action for Collections
export const getReceivedPaymentSummaryReport =
  (data) => async (dispatch, getState) => {
    // const data = {
    //     "RequestIds": "" // decrypted, eg "1148179177861"
    // };

    console.log(data);

    let responseData = null;

    try {
      const response = await api.post(
        config.FETCH_RECEIVED_PAYMENT_VIEW_SUMMARY_REPORT,
        data
      );
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
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
      type: STORE_RECEIVED_PAYMENT_VIEW_SUMMARY_REPORT,
      payload: responseData,
    });
  };

// View action for Payment part 1
export const getMakePaymentHistory = (data) => async (dispatch, getState) => {
  // const data = {
  //   PaymentType: "", // decrypted, hardcoded, eg "MakePayment"
  //   RequestId: "", // encypted, eg "5331A98DAF78BC861F801543B782850F"
  // };

  let responseData = null;

  try {
    const response = await api.post(config.FETCH_MAKE_PAYMENTS_HISTORY, data);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
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
    type: STORE_MAKE_PAYMENT_HISTORY_GRID,
    payload: responseData,
  });
};

// View action for payment part 2
export const getMakePaymentHistoryGrid =
  (data) => async (dispatch, getState) => {
    // const data = {
    //   PaymentType: "", // decrypted, hardcoded, eg "MakePayment"
    //   RequestId: "", // encypted, eg "5331A98DAF78BC861F801543B782850F"
    // };

    let responseData = null;

    try {
      const response = await api.post(
        config.FETCH_MAKE_PAYMENT_HISTORY_GRID,
        data
      );
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
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
      type: STORE_MAKE_PAYMENT_HISTORY,
      payload: responseData,
    });
  };

/**
 * Fetching invoice attachment
 * @param {Object} data
 * @param {string} data.RequestId - Encrypted (MANDATORY)
 * @param {string} data.AttachemntFor - Hardcoded "master" (MANDATORY) (yes, there's a spelling mistake ☠️)
 * @param {boolean} isOpen - For file popup modal
 * @param {boolean} isDownloadable - For file popup modal
 * @returns
 */
// To download attachment
export const getInvoiceAttachment =
  (data, isOpen = true, isDownloadable = true) =>
  async (dispatch, getState) => {
    // const data = {
    //   AttachemntFor: "master", // decryped, hardcoded, eg "master",
    //   RequestId: "761DF7514D260B7083C28D580E1BE523", // encypted, eg "761DF7514D260B7083C28D580E1BE523", [RequestId from grid api response]

    //   // Response will be Base64 to pdf or image, check file type at the end of "strResponse"
    // };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_INVOICE_ATTACHMENT, data);
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
    // dispatch({
    //   type: STORE_INVOICE_ATTACHMENT,
    //   payload: responseData,
    // });
    dispatch(
      handleFileModal({
        isOpen,
        isDownloadable,
        content: Data.AttachmentContents,
        fileType: Data.FileExtention,
      })
    );
  };

//Get Companies
export const fetchVendorsByCompany = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.FETCH_VENDOR_CONFIGURATION_DETAILS,
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
    type: FETCH_VENDORS_BY_COMPANY,
    payload: responseData.Data,
  });
};

export const getTaxPayments = (data) => async (dispatch, getState) => {
  // (data, apiForTable) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_TAX_PAYMENTS, data);
    // const response = await api.post(apiForTable, data);
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
    type: STORE_TAX_PAYMENT_REPORT,
    payload: responseData,
  });
};

/**
 * [POST request]
 * A request fetch the Company Names
 *
 * @param {Object} data - (MANDATORY)
 * @param {Object} data.CompanyId - encrypted Business Id (MANDATORY)
 * @returns {undefined}
 */
export const fetchGIBANDetails = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_GIBAN_DETAILS, data);
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

  dispatch({
    type: STORE_GIBAN_DETAILS,
    payload: Data,
  });
};

/**
 * [POST REQUEST]
 * Gets the table data for Registered Business under Reports (for Vendor user only)
 * registeredBusinessList: state.reportsReducer.registeredBusinessList,
 *
 * @param {Object} data - (MANDATORY)
 * @param {null} data.StatusCode - send null
 * @returns {undefined}
 */
export const getRegisteredBusiness = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_REGISTERED_BUSINESS, data);
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
    type: STORE_REGISTERED_BUSINESS_REPORT,
    payload: responseData,
  });
};

/**
 * [POST request]
 * A request to fetch the Registered Business Report
 * madePaymentsList: state.reportsReducer.madePaymentsList,
 *
 * @param {object} data - (Mandatory)
 * @param {string} data.RoleType - Hardcoded : "null" (Mandatory)
 * @param {string} data.ClientId - Harcoded : "null" (Mandatory)
 * @returns {undefined}
 */
export const getMadePayments = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_MADE_PAYMENTS, data);
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
    type: STORE_MADE_PAYMENTS_REPORT,
    payload: responseData,
  });
};

/**
 * [POST request]
 * A request fetch the Discounting Reports List
 * discountingReportsList: state.reportsReducer.discountingReportsList,
 *
 * @param {}  - No Payload Required
 * @returns {undefined}
 */
export const getDiscountingReports = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_DISCOUNTING_REPORTS, data);
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
      type: STORE_DISCOUNTING_REPORTS,
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
      type: STORE_DISCOUNTING_REPORTS,
      payload: {},
    });
    return;
  }

  dispatch({
    type: STORE_DISCOUNTING_REPORTS,
    payload: responseData,
  });
};

/**
 * [POST request]
 * A request to fetch the Vendor Collections Report
 * paymentReceivedVendorReportsList: state.reportsReducer.paymentReceivedVendorReportsList,
 *
 * @param {object} data - (Mandatory)
 * @param {string} data.RoleType - Hardcoded : "null" (Mandatory)
 * @param {string} data.CompanyCode - Harcoded : "null" (Mandatory)
 * @returns {undefined}
 */
export const getPaymentReceivedVendorReports =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_PAYMENT_RECEIVED_VENDOR_REPORTS,
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

    dispatch({
      type: STORE_PAYMENT_RECEIVED_VENDOR_REPORTS,
      payload: responseData,
    });
  };

/**
 * [POST request]
 * A request to fetch the Contract Names for the DropDown
 * manageContractsList: state.reportsReducer.manageContractsList,
 *
 * @param {Object} data - MANDATORY
 * @param {string} NetTerms - Empty String (Mandatory)
 * @param {string} ContractName - Empty String (Mandatory)
 * @returns {undefined}
 */
export const fetchManageContracts = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_MANAGE_CONTRACTS, data);
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

  dispatch({
    type: STORE_MANAGE_CONTRACTS,
    payload: Data,
  });
};

/**
 * [POST request]
 * Table action for 'Registered Business' table under Reports. This action is for accepting business' request
 * For Vendor user only.
 *
 * @param {Object} data - MANDATORY
 * @param {string} ClientId - Encrypted ClientId fron the row (Mandatory)
 * @param {string} status - "statuscode" hardcoded (Mandatory)
 * @returns {undefined}
 */
export const acceptSenderInvite = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.ACCEPT_SENDER_INVITE, data);
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
    type: SET_TABLE_REFRESH_FLAG,
  });
};

/**
 * [POST request]
 * A request to fetch the Rent Collection Reports
 * rentCollectionReportsList: state.reportsReducer.rentCollectionReportsList,
 *
 * @param {Object} data - MANDATORY
 * @param {string} NetTerms - Empty String (Mandatory)
 * @param {string} ContractName - Empty String (Mandatory)
 * @returns {undefined}
 */
export const fetchRentCollectionReports =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.RENT_COLLECTION_REPORT, data);
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

    dispatch({
      type: STORE_RENT_COLLECTION_REPORTS,
      payload: responseData,
    });
  };

/**
 * [POST request]
 * A request to fetch the Rent Collection Reports
 * tenantRentPaymentReportResponse: state.reportsReducer.tenantRentPaymentReportResponse,
 *
 * @param {Object} data - MANDATORY
 * @param {string} data.RequestIds - in case of View (MANDATORY)
 * @returns {undefined}
 */
export const getTenantPaymentsReportData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.FETCH_TENANT_PAYMENTS_REPORT,
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

    dispatch({
      type: 'STORE_TENANT_PAYMENTS_REPORT_RESPONSE',
      payload: responseData,
    });
  };

export const openViewCollectionDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_VIEW_COLLECTION_DIALOG,
  });
};

export const closeViewCollectionDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VIEW_COLLECTION_DIALOG,
  });
};

export const openViewPaymentDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_VIEW_PAYMENT_DIALOG,
  });
};

export const closeViewPaymentDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VIEW_PAYMENT_DIALOG,
  });
};

export const openViewGatewaySummaryDialogFn =
  (data) => async (dispatch, getState) => {
    dispatch({
      type: OPEN_VIEW_GATEWAY_SUMMARY_DIALOG,
      payload: data,
    });
  };

export const closeViewGatewaySummaryDialogFn =
  () => async (dispatch, getState) => {
    dispatch({
      type: CLOSE_VIEW_GATEWAY_SUMMARY_DIALOG,
    });
  };

export const openDownloadAttachmentDialog =
  (data) => async (dispatch, getState) => {
    dispatch({
      type: OPEN_DOWNLOAD_ATTACHMENT_DIALOG,
      payload: data,
    });
  };

export const closeDownloadAttachmentDialog =
  () => async (dispatch, getState) => {
    dispatch({
      type: CLOSE_DOWNLOAD_ATTACHMENT_DIALOG,
    });
  };
