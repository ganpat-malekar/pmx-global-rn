import { config } from '@paymate/common/config';
import api from '@paymate/common/apimiddleware';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../../UIActions';
import { STORE_ALL_VENDOR_INFO, LOADING, LOADED } from '../../types';
import { pick } from 'lodash';
import _ from 'underscore';

export const fetchAndStoreVendorInformation =
  (clientId) => async (dispatch, getState) => {
    const ClientId = clientId || getState().addContact.ClientId || null;

    if (!ClientId) {
      console.log('ClientId is not passed or not found in the reducer');
      return;
    }

    // Do call
    const data = {
      ClientId,
    };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_ALL_VENDOR_INFO, data);
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
      type: STORE_ALL_VENDOR_INFO,
      payload: { Data },
    });
  };

export const sendVendorAppovalMailToApprover =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.SEND_FOR_CONTACT_APPROVAL, data);
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

    // Finally, store reponse in reducer
    // dispatch(
    //   showAlert({
    //     type: "success",
    //     message: Description,
    //   })
    // );

    return true;
  };

export const flushVendorInformation = () => (dispatch) => {
  dispatch({
    type: 'FLUSH_VENDOR_INFORMATION',
  });
};
