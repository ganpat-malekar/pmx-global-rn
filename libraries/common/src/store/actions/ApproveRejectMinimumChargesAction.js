import _ from 'underscore';

import errorAlertHandler from '../../helper/errorAlertHandler';

import api from '../../apimiddleware';
import { config } from '../../config';

import { showAlert } from './UIActions';
import { STORE_BUSINESS_DETAILS } from './types';

/**
 * [POST REQUEST]
 * Stores the Business Details in the reducer -
 * This API is used in the case of Approve/Reject Minimum Charges through the CEO Mail Link
 * businessDetailsList: state.approveRejectMinimumCharges.businessDetailsList,
 *
 * @param {Object} data - payload(MANDATORY)
 * @param {string} data.CompanyID - Encrypted Company ID(prakriya) from the URL (MANDATORY)
 * @returns {undefined}
 */
export const fetchBusinessDetails = (data) => async (dispatch, getState) => {
  let responseData = null;

  try {
    const response = await api.post(config.FETCH_BUSINESS_DETAILS, data);
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

  //   if (StatusCode !== "000") {
  //     dispatch(
  //       showAlert({
  //         type: "danger",
  //         message: Description || "Something went wrong",
  //       })
  //     );
  //     return;
  //   }
  dispatch({
    type: STORE_BUSINESS_DETAILS,
    payload: responseData,
  });
};

/**
 * [POST REQUEST]
 * Approve or Reject the Minimum Charges -
 *
 * @param {Object} data - payload(MANDATORY)
 * @param {string} data.CompanyID - Encrypted Company ID(prakriya) from the URL (MANDATORY)
 * @param {string} data.UserEmail - Encrypted UserEmail (email) from the URL (MANDATORY)
 * @param {number} data.Status -  1: Approve, 2: Reject (MANDATORY)
 * @param {string} data.Remarks -(MANDATORY)
 * @returns {undefined}
 */
export const updateMinimumCharge =
  (data, setButtons) => async (dispatch, getState) => {
    let responseData = null;

    try {
      const response = await api.post(
        config.MINIMUM_CHARGE_APPROVE_REJECT,
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

    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
    dispatch({
      type: 'RESET_REMARK_PROMPT_DATA',
    });

    setButtons(false);
    return true;
  };
