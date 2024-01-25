import _ from 'underscore';

import { showAlert } from './UIActions';
import {
  STORE_PROFILE_MENU_DETAILS,
  STORE_DASHBOARD_QUICK_LINKS,
  STORE_DASHBOARD_GRAPH_DATA,
  STORE_DASHBOARD_SETTLEMENT_TRANSACTIONS,
  LOADING,
  LOADED,
  GET_CONNECTION_REQUESTS,
  ACCEPT_TERMS_AND_POLICIES,
  FETCH_TERMS_AND_POLICIES,
  UPDATE_TERMS_AND_POLICY,
} from './types';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { fetchBusinessInformationForView } from '../actions/BusinessManagement/ManageBusinesses/action_ManageBusiness';

// User details for showing in the profile menu
export const getProfileMenuDetails = () => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.get(config.GET_PROFILE_MENU_DETAILS);
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
    type: STORE_PROFILE_MENU_DETAILS,
    payload: responseData,
  });
};

// for quick links
export const getDashboardQuickLinks =
  (data, filename) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.get(config.GET_ADMIN_DASHBOARD_NOTIFICATIONS);
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
      type: STORE_DASHBOARD_QUICK_LINKS,
      payload: responseData,
    });
  };

// For all Dashboard graph/numeric data
export const getDashboardGraphData = (data) => async (dispatch, getState) => {
  // const data = {
  //   CurrencyType: "AED", // eg "USD" or "AED", plaintext, (use getCurrencyList() from action_DataLists.js for currency drop down)
  //   Type: "", // plaintext, eg "Business, vendor, TransactionReciveMade"
  //   // Group based on Type in response: BA -> Business Activation
  //   //                                  VA -> Vendor Activation
  //   //                                  PA -> Payables
  //   //                                  RA -> Receivables
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.GET_DASHBOARD_GRAPH_DATA, data);
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

  // finally store in reducer
  dispatch({
    type: STORE_DASHBOARD_GRAPH_DATA,
    payload: responseData,
    dataType: data.Type,
    currencyType: data.CurrencyType,
  });
};

// for table data
export const getAdminDashboardSettlementTransactions =
  (data = {}) =>
  async (dispatch, getState) => {
    // const data = {
    //   PendingCollectionSettlement: 5,
    //   PendingPaymentSettlement: 5,
    //   Status: true,
    //   StatusCode: "000",
    // };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.GET_ADMIN_DASHBOARD_SETTLEMENT_TRANSACTIONS,
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
      type: STORE_DASHBOARD_SETTLEMENT_TRANSACTIONS,
      payload: responseData,
    });
  };

/**
 * Mostly used in Add Business
 * Stores response containing business dashboard data  -
 * businessDashboardResponse: state.dashboard.businessDashboardResponse,
 * Sample payload:
 * {
 *    "ObjReceivedMade": {
 *        "Type": 0,
 *        "Data": null,
 *        "Caption": null,
 *        "CurrencyType": "AED",
 *        "Filter": null
 *    },
 *    "ObjCurrency": {
 *        "CountryId": "D737E31FD6BF28ACF9A90757B45C9D1C",
 *        "PaymentType": 1,
 *        "CRID": 0,
 *        "ClientId": 0,
 *        "CompanyId": null
 *    }
 * }
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */

export const getBusinessDashboardDetails =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.GET_BUSINESS_DASHBOARD_DETAILS,
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
      type: 'STORE_BUSINESS_DASHBOARD_RESPONSE',
      payload: { response: responseData },
    });
  };

/**
 * Mostly used in Add Business
 * Stores reponse containing chart data for business dasboard -
 * collectionChartResponse: state.dashboard.collectionChartResponse,
 * paymentChartResponse: state.dashboard.paymentChartResponse,
 *
 * Sample payload:
 * {
 *    "Type": 2, // 1 for collection, 2 for payment
 *    "Data": null,
 *    "Caption": null,
 *    "CurrencyType": "AED",
 *    "Filter": null
 * }
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */
export const getBusinessChartData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.GET_BUSINESS_CHART_DATA, data);
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
    type: 'STORE_BUSINESS_DASHBOARD_CHART_DATA',
    payload: { response: responseData, chartType: data.Type },
  });
};

export const getConnectionRequests = () => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.get(config.GET_CONNECTION_REQUESTS);
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
    type: GET_CONNECTION_REQUESTS,
    payload: responseData,
  });
};

export const acceptConnectionRequests =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.ACCEPT_CONNECTION_REQUEST, data);
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
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
    dispatch(getConnectionRequests());
  };

export const acceptChangedChargesRequest =
  (data) => async (dispatch, getState) => {
    let responseData = null;
    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        '/BusinessManagement/AcceptRejectNewChargeRequest',
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

    // Finally, store in reducer
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
    dispatch({
      type: 'RESET_REMARK_PROMPT_DATA',
    });
    dispatch(
      fetchBusinessInformationForView({
        CompanyID: data.CompanyID,
        Type: 1,
      })
    );
  };

export const getTermsAndPolicies = (userId) => async (dispatch, getState) => {
  let responseData = null;

  try {
    const response = await api.get(
      config.GET_TERMS_AND_POLICIES + `?UserId=${userId}`
    );
    responseData = response;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
  }

  if (_.isEmpty(responseData)) {
    return;
  }

  const { statusText, Description, Data } = responseData;
  console.log(responseData);
  if (statusText !== 'OK') {
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
    type: FETCH_TERMS_AND_POLICIES,
    payload: responseData.data,
  });
};

export const acceptTermsAndPolicies = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.ACCEPT_TERMS_AND_POLICIES, data);
    responseData = response.data;
  } catch (error) {
    errorAlertHandler(error, dispatch);
  } finally {
    dispatch({
      type: LOADED,
    });
  }

  if (_.isEmpty(responseData)) {
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

  dispatch(getTermsAndPolicies(data.UserId));

  if (data.TNCType === 'Privacy') {
    dispatch({
      type: UPDATE_TERMS_AND_POLICY,
    });
  }
};
