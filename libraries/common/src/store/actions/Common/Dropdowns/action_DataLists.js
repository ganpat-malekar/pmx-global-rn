import axios from 'axios';
import _ from 'underscore';

import { config } from '@paymate/common/config';
import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';

import { showAlert } from '../../UIActions';
import {
  STORE_BUSINESS_LIST,
  STORE_CONTACT_LIST,
  SAVE_COUNTRY_METADATA_LIST,
  SAVE_EMIRATES_METADATA_LIST,
  SAVE_BANK_METADATA_LIST,
  STORE_CURRENCY_LIST,
  STORE_PAYMENT_TYPES,
  STORE_TYPES,
  STORE_PAY_THROUGH_LIST,
  STORE_MDR_CHARGE_LIST,
  STORE_VENDOR_PAYMENTS_MODES,
  STORE_VENDOR_PAYMENT_THROUGH,
  STORE_VENDOR_LIST,
  STORE_REGISTRAR_MASTER,
  STORE_STATUS_CODES,
  STORE_COMPANY_CURRENCY_LIST,
  LOADED,
  LOADING,
  STORE_CURRENCY_BY_PAYMENT_TYPE_LIST,
} from '../../types';

/**
 * [GET request]
 * Stores types in reducer -
 * typesList: state.dataLists.typesList
 *
 * Types:
 * CommissionType (OR) 1,
 * BusinessMode (OR) 2,
 * ChannelPartner (OR) 3,
 * ServiceMode (OR) 4,
 * ContactType (OR) 5,
 * Discounting (OR) 6,
 * WebSubscription (OR) 7,
 * ApiSubscription (OR) 8,
 * CardType (OR) 9,
 * SubscriptionType (OR) 10,
 * SubscriptionCategory (OR) 11,
 * RiskCompliance (OR) 12,
 * For Promo Type Code - 120,
 * PromoCodeType = 13, // TODO: check why there are two PromoCodeTyoe
 * SendMoney = 14,
 * TaxPayment = 15,
 * ReceiveMoney = 16,
 * NetworkType = 17
 *
 * @param {Object} params - payload (MANDATORY)
 * @param {string | number} params.objTypeName - Plaintext, can pass number or name. Refer "Types" above
 * @returns {undefined}
 */
export const getTypesList = (params) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.get(config.GET_TYPES_DATA, { params });
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

  // Finally, store in reducer
  dispatch({
    type: STORE_TYPES,
    payload: { Data: responseData, type: params.objTypeName },
  });
};

export const getBusinessList =
  (
    data = {
      Status: 1, // Put in config
    }
  ) =>
  async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.GET_BUSINESS_LIST, data);
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
      type: STORE_BUSINESS_LIST,
      payload: { Data },
    });
  };

export const getCountries = (status) => async (dispatch, getState) => {
  const { countriesMetadata } = getState().dataLists;

  try {
    const data = {
      Status: status ?? true,
    };

    const response = await api.post(config.FETCH_COUNTRIES, data);

    const { Description, Status, Data } = response.data;

    if (Status === false) {
      dispatch(
        showAlert({
          type: 'danger',
          message: Description,
        })
      );
      return countriesMetadata;
    } else {
      dispatch({
        type: SAVE_COUNTRY_METADATA_LIST,
        payload: Data,
      });
      return Data;
    }
  } catch (error) {
    errorAlertHandler(error, dispatch);
    return countriesMetadata;
  }
};

export const getEmirates = () => async (dispatch, getState) => {
  const { emiratesMetadata } = getState().dataLists;

  // Don't unnecessarily hit the API if we already have data.
  if (emiratesMetadata.length) {
    return emiratesMetadata;
  }

  try {
    const data = {};

    const response = await api.post(config.FETCH_STATE, data);

    const { Description, Status, Data } = response.data;

    if (Status === false) {
      dispatch(
        showAlert({
          type: 'danger',
          message: Description,
        })
      );
      return emiratesMetadata;
    } else {
      dispatch({
        type: SAVE_EMIRATES_METADATA_LIST,
        payload: Data,
      });
      return Data;
    }
  } catch (error) {
    errorAlertHandler(error, dispatch);
    return emiratesMetadata;
  }
};

export const getBanksByCountry =
  (CountryId, other) => async (dispatch, getState) => {
    const { banksMetadata } = getState().dataLists;

    try {
      const data = {
        CountryId,
        ...other, // had to do this way, because other forms will get affected
      };

      const response = await api.post(config.FETCH_BANKS, data);

      const { Description, Status, Data } = response.data;

      if (Status === false) {
        dispatch(
          showAlert({
            type: 'danger',
            message: Description,
          })
        );
        return banksMetadata;
      } else {
        dispatch({
          type: SAVE_BANK_METADATA_LIST,
          payload: Data,
        });
        return Data;
      }
    } catch (error) {
      errorAlertHandler(error, dispatch);
      return banksMetadata;
    }
  };

/**
 * Mostly used in Add Business
 * Stores a company's currency list in reducer -
 * companyCurrencyList: state.dataLists.companyCurrencyList,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Encrypted (MANDATORY)
 * @returns {undefined}
 */
export const getCompanyCurrencies = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_COMPANY_CURRENCIES, data);
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
    type: STORE_COMPANY_CURRENCY_LIST,
    payload: { Data },
  });
};

// Still in use for some old code.
// TODO: Remove its dependency and remove this
export const getCurrencyList =
  (CountryId = 'D737E31FD6BF28ACF9A90757B45C9D1C', CompanyId) =>
  async (dispatch, getState) => {
    const data = {
      CountryId,
    };

    if (CompanyId) {
      data.CompanyId = CompanyId;
    }

    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.FETCH_CURRENCY_BY_COUNTRY, data);
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
      type: STORE_CURRENCY_LIST,
      payload: { Data },
    });
  };

/**
 * Stores currency list in reducer -
 * currencyList: state.dataLists.currencyList,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CountryId - AES Encrypted id (MANDATORY)
 * @param {number} data.PaymentType - Should be in plaintext (OPTIONAL)
 * @param {number} data.CRID - TODO: Ask backend team if Encryped or Plaintext (OPTIONAL)
 * @param {number} data.ClientId - TODO: Ask backend team if Encryped or Plaintext (OPTIONAL)
 * @param {string} data.CompanyId - TODO: Ask backend team if Encryped or Plaintext (OPTIONAL)
 * @returns {undefined}
 */
export const getCurrencyByCountry = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_CURRENCY_BY_COUNTRY, data);
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
    type: STORE_CURRENCY_LIST,
    payload: { Data },
  });
};

/**
 * Stores contact list in reducer -
 * contactList: state.dataLists.contactList
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.ContactType - Plaintext, Receiver or Sender (MANDATORY)
 * @returns {undefined}
 */
export const getContactList = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.GET_ALL_VENDOR, data);
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
    type: STORE_CONTACT_LIST,
    payload: { Data },
  });
};

/**
 * Stores contact list in reducer -
 * contactList: state.dataLists.searchedBusinessList
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.ContactType - Plaintext, Receiver or Sender (MANDATORY)
 * @returns {undefined}
 */
export const searchBusinessList = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.SEARCH_BUSINESS, data);
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
    type: 'STORE_SEARCH_BUSINESS_LIST_DATA',
    payload: { Data },
  });
};

/**
 * Stores payment types in reducer -
 * paymentTypeList: state.dataLists.paymentTypeList
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Encrypted, take CompanyId from tokenData
 * @param {number} data.PaymentType - Plaintext, pass 1 for make payment or 2 for request payment 7 for paytax
 * @returns {undefined}
 */
export const getPaymentTypes = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.GET_PAYMENT_TYPES, data);
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
    type: STORE_PAYMENT_TYPES,
    payload: { Data },
  });
};

/**
 * [POST request]
 * Stores pay through list in reducer -
 * payThroughList: state.dataLists.payThroughList,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Plaintext, take CompanyId from tokenData
 * @param {string} data.ServiceType - null, (OPTIONAL)
 * @param {string} data.allowedModes - 0, hardcoded (OPTIONAL)
 * @returns {undefined}
 */
export const getPayThroughList = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_PAYMENT_THROUGH, data);
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
    type: STORE_PAY_THROUGH_LIST,
    payload: { Data },
  });
};

/**
 * [POST request]
 * Stores payment modes in reducer -
 * vendorPaymentsModes: state.dataLists.vendorPaymentsModes,
 *
 * @returns {undefined}
 */

export const getVendorPaymentsModes = () => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_VENDOR_PAYMENTS_MODES);

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
    type: STORE_VENDOR_PAYMENTS_MODES,
    payload: { Data },
  });
};

/**
 * [POST request]
 * Stores MDR charge list in reducer -
 * mdrCharges: state.dataLists.mdrCharges,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.ServiceType - Plaintext, "SendMoney" or "ReceiveMoney"
 * @param {string} data.CompanyIds - Plaintext, take from tokenData
 * @returns {undefined}
 */
export const getMDRCharges = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_MDR_CHARGES, data);

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
    type: STORE_MDR_CHARGE_LIST,
    payload: { Data },
  });
};

/**
 * [POST request]
 * Stores MDR charge list in reducer -
 * vendorPaymentThrough: state.dataLists.vendorPaymentThrough,
 *
 * @param {Object} data - payload (Mandatory)
 * If you're not sending any properties in the payload,
 * then send an empty object "{}" (Mandatory)
 * @param {string} data.CRID - Plaintext (Optional)
 * @param {string} data.ServiceType - Plaintext (Optional)
 * @returns {undefined}
 */
export const getVendorPaymentThrough = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_VENDOR_PAYMENT_THROUGH, data);

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
    type: STORE_VENDOR_PAYMENT_THROUGH,
    payload: { Data },
  });
};

/**
 * [POST request]
 * Stores MDR charge list in reducer -
 * : state.dataLists.,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.ContactType - Plaintext
 * @returns {undefined}
 */
export const getVendorList = (ContactType) => async (dispatch, getState) => {
  const data = {
    ContactType,
  };

  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });

  try {
    const response = await api.post(config.GET_ALL_VENDOR, data);

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
    type: STORE_VENDOR_LIST,
    payload: { Data },
  });
};

/**
 * [POST request]
 * Stores Registrar Master in reducer -
 * registrarMaster: state.dataLists.registrarMaster,

 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.SortExpression -  Should be in plaintext (MANDATORY)
 * @param {string} data.Filter - Should be in Plaintext, Needed to filter out the settlement Banks (MANDATORY)
 * @param {number} data.FromRecord - plaintext (OPTIONAL)
 * @param {number} data.ToRecord - plaintext (OPTIONAL)
 * @param {number} data.TotalRecords - plaintext (OPTIONAL)
 * @param {date} data.FromDate - plaintext (OPTIONAL)
 * @param {date} data.ToDate - plaintext (OPTIONAL)
 * @param {number | string} data.CompanyIds - TODO: ASK backend team (OPTIONAL)
 * @returns {undefined}
 */
export const getRegistarMaster = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_REGISTRAR_MASTER, data);
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
    type: STORE_REGISTRAR_MASTER,
    payload: Data,
  });
};

/**
 * [POST request]
 * Stores Status Codes in reducer --
 * statusCodesList: state.dataLists.statusCodesList,
 *
 * ReportName:
 * BusinessSubscription,
 * VendorSubscription,
 * BusinessDocumentStatus,
 * BusinessCompanyStatus,
 * BusinessSubscriptionStatus,
 * BusinessManageUsers,
 * VendorKycStatus,
 * VendorCompanyStatus,
 * EventLogs,
 * Incidents,
 * IncidentsType
 * RegisteredProperty
 * RegisteredTenant
 * BusinsessTrackRent
 * ReportsCollection
 * TenantrequestRecived
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.ReportName - Plaintext (MANDATORY)
 * @param {string} data.RoleType - Plaintext (MANDATORY)
 * @returns {undefined}
 */
export const getStatusCodesList = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });

  try {
    const response = await api.post(config.FETCH_STATUS_CODES_LIST, data);
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
    type: STORE_STATUS_CODES,
    payload: { Data: Data, ReportName: data.ReportName },
  });
};

/**
 * Mostly used in Add Business
 * Stores a company's currency list in reducer -
 * registrarGateway: state.dataLists.registrarGateway,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @returns {undefined}
 */
export const getRegistrarGateway = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_REGISTRAR_GATEWAYS, data);
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
    type: 'STORE_REGISTRAR_GATEWAY',
    payload: { Data },
  });
};

/**
 * Stores currency list in reducer -
 * currencyByPaymentTypesList: state.dataLists.currencyByPaymentTypesList,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {number} data.paymentType - Hardcoded 1 (Mandatory)
 * @returns {undefined}
 */
export const getCurrencyByPaymentType =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.FETCH_CURRENCY_BY_PAYMENT_TYPE,
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
      type: STORE_CURRENCY_BY_PAYMENT_TYPE_LIST,
      payload: Data,
    });
  };

/**
 * Stores currency list in reducer -
 * companyBalance: state.dataLists.companyBalance,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.Currency - Currency code from the formfield, eg: "AED" (Mandatory)
 * @returns {undefined}
 */
export const getCompanyBalance = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.GET_COMPANY_BALANCE, data);
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
    type: 'STORE_COMPANY_BALANCE',
    payload: Data,
  });
};

/**
 * [GET request]
 * Stores Status Codes in reducer --
 * statusCodesList: state.dataLists.codeDetails,
 *
 * listName:
 * LeaseType -> RLT,
 * FrequencyType -> FRQ
 *
 * @param {Object} params - payload (MANDATORY)
 * @param {string} params.TypeCode - Plaintext (MANDATORY)
 * @returns {undefined}
 */
export const getCodeDetails = (params) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });

  try {
    const response = await api.get(config.GET_CODE_DETAILS_DATA_BY_CODE, {
      params,
    });
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

  if (_.isEmpty(responseData)) {
    dispatch(
      showAlert({
        type: 'danger',
        message: 'Something went wrong',
      })
    );
    return;
  }
  // Finally, store in reducer
  dispatch({
    type: 'STORE_CODE_DETAILS',
    payload: { Data: responseData, type: params.TypeCode },
  });
};
