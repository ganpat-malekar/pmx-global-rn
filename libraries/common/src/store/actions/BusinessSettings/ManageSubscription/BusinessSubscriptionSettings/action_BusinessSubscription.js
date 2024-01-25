import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../../UIActions';
import {
  LOADED,
  LOADING,
  STORE_BUSINESS_SUBSCRIPTION_PLAN_DETAILS,
  STORE_BUSINESS_SUBSCRIPTION_PLAN_LIST,
  STORE_INVOICE_DATA_FOR_SUBSCRIPTIONS,
} from '../../../types';

/**
 * [POST request]
 * A request fetch data for the Plan Details
 * businessSubscriptionPlanDetails:
    state.businessSubscriptionSettings.businessSubscriptionPlanDetails,
 *
 * @param {Object} data - Mandatory
 * @param {string} data.SubscriptionType - hardcoded: "Business" (Mandatory)
 * @returns {undefined}
 */
export const getBusinessSubscriptionPlanDetails =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_BUSINESS_SUBSCRIPTION_PLAN_DETAILS,
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
      type: STORE_BUSINESS_SUBSCRIPTION_PLAN_DETAILS,
      payload: responseData,
    });
  };

/**
 * [POST request]
 * A request fetch data for the Plan Details List for the Table
 * businessSubscriptionPlanList:
    state.businessSubscriptionSettings.businessSubscriptionPlanList,
 *
 *  For Business Subscription
 * @param {Object} data - Mandatory
 * @param {string} data.Status - hardcoded: "005"  (Mandatory)
 * @param {string} data.SubscriptionType - hardcoded: "Business" (Mandatory)
 * @returns {undefined}
 * 
 * For Subscription History
 * @param {} - No Payload
 * @returns {undefined}
 */
export const getBusinessSubscriptionPlanList =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_BUSINESS_SUBSCRIPTION_PLAN_LIST,
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
      type: STORE_BUSINESS_SUBSCRIPTION_PLAN_LIST,
      payload: responseData,
    });
  };

/**
 * To View and Download Attachment
 *
 * invoiceDataForSubscriptions:
    state.businessSubscriptionSettings.invoiceDataForSubscriptions,
 
 *
 * @param {Object} data - Mandatory
 * @param {string} data.CompanySubscriptionDetailId - CsdId of the Selected Record (MANDATORY)
 * @returns
 */
export const getInvoiceDataForSubscriptions =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_INVOICE_DATA_FOR_SUBSCRIPTION,
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
    dispatch({
      type: STORE_INVOICE_DATA_FOR_SUBSCRIPTIONS,
      payload: responseData,
    });
  };
