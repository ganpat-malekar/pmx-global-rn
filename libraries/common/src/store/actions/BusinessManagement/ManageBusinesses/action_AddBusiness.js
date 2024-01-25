import axios from 'axios';
import { config } from '@paymate/common/config';
import { errorAlertHandler } from '@paymate/common/helpers';
import { SAVE_BUSINESS_INFORMATION, LOADED, LOADING } from '../../types';
import { showAlert } from '../../UIActions';
import { pick } from 'lodash';
import _ from 'underscore';
import api from '@paymate/common/apimiddleware';

export const flushBusinessInformation = () => (dispatch) => {
  dispatch({
    type: 'FLUSH_BUSINESS_INFORMATION',
  });
};

export const storeBusinessInformation =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.FETCH_BUSINESS_INFORMATION, data);
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

    const {
      StatusCode,
      Description,
      XpressID,
      Status,
      'Business Info': BusinessInfo,
    } = responseData;

    if (StatusCode !== '000' || BusinessInfo?.length < 1) {
      dispatch(
        showAlert({
          type: 'danger',
          message: Description || 'Something went wrong',
        })
      );
      return;
    }

    dispatch({
      type: SAVE_BUSINESS_INFORMATION,
      payload: {
        CompanyId: BusinessInfo[0].CompanyId,
        XpressID,
        BusinessInfo: BusinessInfo[0],
        Status,
      },
    });
  };

// TypeName is compulsory
// This function will save the
export const getTypesData = (TypeName) => async (dispatch, getState) => {
  const Types = {
    CommissionType: 1,
    BusinessMode: 2,
    ChannelPartner: 3,
    ServiceMode: 4,
    ContactType: 5,
    Discounting: 6,
    WebSubscription: 7,
    ApiSubscription: 8,
    CardType: 9,
    SubscriptionType: 10,
    SubscriptionCategory: 11,
  };

  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  const params = {
    objTypeName: Types[TypeName],
  };
  // Try changing this to async await style
  return axios(config.DOMAIN + config.GET_TYPES_DATA, {
    method: 'GET',
    headers,
    params,
  })
    .then((response) => {
      const data = response.data;
      if (data.length > 0) {
        // ?. optional chaining is not support in this react-script version
        return data;
      } else {
        let { Message: message } = response.data;
        message = 'Something went wrong'; // Currently it is exposing backend url coming from Message
        dispatch(
          showAlert({
            type: 'danger',
            message,
          })
        );
        return [];
      }
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
      return [];
    });
};

/**
 *
 * @param {Object} data
 * @param {string} data.CompanyId - Encrypted (MANDATORY)
 * @param {string} data.Action - Plaintext, hardcode - "SendChangeChargeSettingForApproval"
 * @returns
 */
export const sendChangedChargesForApproval =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.SEND_CHANGED_CHARGES_FOR_APPROVAL,
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
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };
