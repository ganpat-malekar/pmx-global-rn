import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from './UIActions';
import { SET_TABLE_REFRESH_FLAG, LOADED, LOADING } from './types';

/**
 * [POST request]
 * Saves subscription to the backend -
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {boolean}
 */
export const submitSubscription = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.UPDATE_SUBSCRIPTION;
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

/**
 * [POST request]
 * Updates subscription status -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.SubscriptionId - Encrypted (MANDATORY)
 * @param {number} data.Status - Plaintext, number eg: 2 for Deactivate, 1 for Activate, 0 for Delete (MANDATORY)
 * @param {string} data.Remarks - Plaintext, a text describing the reason to Deactivate (OPTIONAL)
 * @returns {boolean}
 */
export const updateSubscriptionStatus =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const url = config.UPDATE_SUBSCRIPTION_STATUS;
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
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
    dispatch({
      type: 'RESET_CONFIRM_PROMPT_DATA',
    });
    dispatch({
      type: 'RESET_REMARK_PROMPT_DATA',
    });
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };

/**
 * Used in Edit subscription
 * Gets single record
 * editData: state.subscription.editData,
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.SubscriptionId - ()
 * @returns {undefined}
 */
export const fetchSubscriptionData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_SUBSCRIPTOIN_DATA, data);
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
    type: 'STORE_SUBSCRIPTION_EDIT_DATA',
    payload: { Data },
  });
};

/**
 * Used in Manage subscription
 * Stores subscription table data -
 * tableData: state.subscription.tableData,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.Status - (OPTIONAL)
 * @param {string} data.Remarks - (OPTIONAL)
 * @param {string} data.SubscriptionType - (OPTIONAL)
 * @param {string} data.ServiceTypeId - (OPTIONAL)
 * @param {string} data.RegistarId - (OPTIONAL)
 * @param {string} data.SubscriptionCategoryId - (OPTIONAL)
 * @param {string} data.SortExpression - (OPTIONAL)
 * @param {string} data.FromRecord - (OPTIONAL)
 * @param {string} data.ToRecord - (OPTIONAL)
 * @param {string} data.TotalRecords - (OPTIONAL)
 * @param {string} data.FromDate - (OPTIONAL)
 * @param {string} data.ToDate - (OPTIONAL)
 * @param {string} data.CompanyIds - (OPTIONAL)
 * @param {string} data.Filter - (OPTIONAL)
 * @param {string} data.CheckStatus - (OPTIONAL)
 * @param {string} data.PageNumber - (OPTIONAL)
 * @param {string} data.PageSize - (OPTIONAL)
 * @param {string} data.RoleTypes - (OPTIONAL)
 * @param {string} data.isExport - (OPTIONAL)
 * @returns {undefined}
 */
export const fetchSubscriptionTableData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_SUBSCRIPTOIN_DATA, data);
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

    dispatch({
      type: 'STORE_SUBSCRIPTION_TABLE_DATA',
      payload: { Data },
    });

    if (StatusCode !== '000') {
      dispatch(
        showAlert({
          type: 'danger',
          message: Description || 'Something went wrong',
        })
      );
      return;
    }
  };

export const flushSubscriptionEditData = () => (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_SUBSCRIPTION_EDIT_DATA',
  });
};
