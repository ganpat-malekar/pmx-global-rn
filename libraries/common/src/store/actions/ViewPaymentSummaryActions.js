import {
  LOADING,
  LOADED,
  STORE_PAYMENT_SUMMARY_HISTORY,
  STORE_PAYMENT_SUMMARY_HISTORY_GRID,
} from './types';
import { config } from '@paymate/common/config';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from './UIActions';
import _ from 'underscore';
import api from '@paymate/common/apimiddleware';

export const getPaymentSummaryHistory =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_PAYMENT_SUMMARY_HISTORY,
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
      type: STORE_PAYMENT_SUMMARY_HISTORY,
      payload: responseData,
    });
  };

export const getPaymentSummaryHistoryGrid =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_PAYMENT_SUMMARY_HISTORY_GRID,
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
      type: STORE_PAYMENT_SUMMARY_HISTORY_GRID,
      payload: responseData,
    });
    // console.log("Action: ", responseData);
  };
