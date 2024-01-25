import _ from 'underscore';

import errorAlertHandler from '../../../../helper/errorAlertHandler';

import api from '../../../../apimiddleware';
import { config } from '../../../../config';

import { showAlert } from '../../UIActions';
import { LOADED, LOADING } from '../../types';
import { getAndSAveBusinessInformation } from './action_AddBusiness';

/**
 * [POST request]
 * Submits Vendor subscription
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */
export const submitVendorSubscription =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.BUSINESS_SUBSCRIPTION, data);
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
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
    dispatch(getAndSAveBusinessInformation());
    return true;
  };

/**
 * [POST request]
 * Submits Vendor subscription
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */
export const updateVendorSubscription =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.UPDATE_VENDOR_SUBSCRIPTION, data);
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
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };

/**
 * vendorData: state.vendorSubscription.vendorData
 * @returns
 */
export const fetchVendorSubscriptionDetails =
  (data = {}) =>
  async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.FETCH_VENDOR_SUBSCRIPTION_DETAILS,
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

    // Finally
    dispatch({ type: 'SAVE_VENDOR_SUBSCRIPTOIN_INFO', payload: Data });
  };
