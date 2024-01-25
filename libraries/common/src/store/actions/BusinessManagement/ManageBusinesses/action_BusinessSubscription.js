import axios from 'axios';

import { getAndSAveBusinessInformation } from './action_AddBusiness';

import aesEncode from '../../../../helper/aes256encoder';
import errorAlertHandler from '../../../../helper/errorAlertHandler';

import api from '../../../../apimiddleware';
import { config } from '../../../../config';

import { showAlert } from '../../UIActions';
import { LOADED, LOADING, STORE_BUSINESS_SUBSCRIPTION_DATA } from '../../types';

export const fetchBusinessSubscriptionDetails =
  (payload, forApproval) => async (dispatch, getState) => {
    let { CompanyId } = getState().addBusiness.BusinessInfo;

    // console.log(CompanyId);
    if (payload?.CompanyId) {
      CompanyId = payload.CompanyId;
    }
    const data = {
      CompanyId,
    };
    // console.log(data);
    if (CompanyId) {
      try {
        // console.log("fetching subs data");
        const response = await api.post(
          config.FETCH_BUSINESS_SUBSCRIPTION_DATA,
          data
        );

        const { Description, Status, Data } = response.data;
        if (Data?.length > 0) {
          dispatch({
            type: STORE_BUSINESS_SUBSCRIPTION_DATA,
            payload: Data,
          });
        }
      } catch (error) {
        errorAlertHandler(error, dispatch);
      }
    }
  };

export const flushBusinessSubscription = () => async (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_BUSINESS_SUBSCRIPTION_DATA',
  });
};

export const submitBusinessSubscription =
  (subscriptionDetails) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };
    const { CompanyId, CompanyStatus, ProgressStatus } =
      getState().addBusiness.BusinessInfo;
    const SubscriptionId = aesEncode('3'); // For Payable (BusinessMode) - Put in config

    const data = {
      ...subscriptionDetails,
      CompanyId,
      CompanyStatus,
      ProgressStatus,
      SubscriptionId,
    };

    dispatch({
      type: LOADING,
    });
    axios(config.DOMAIN + config.BUSINESS_SUBSCRIPTION, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        const { Description, Status } = response.data;
        dispatch({
          type: LOADED,
        });
        if (Status === false) {
          dispatch(
            showAlert({
              type: 'danger',
              message: Description,
            })
          );
          return;
        } else {
          dispatch(
            showAlert({
              type: 'success',
              message: Description,
            })
          );
          dispatch(getAndSAveBusinessInformation());
          return true;
        }
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
        dispatch({
          type: LOADED,
        });
      });
  };
