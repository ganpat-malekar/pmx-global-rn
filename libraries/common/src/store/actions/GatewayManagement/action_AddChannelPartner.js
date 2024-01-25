import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import {
  STORE_CHANNEL_PARTNER_REGISTRARS,
  STORE_CHANNEL_PARTNER_CHARGE_TYPES,
  STORE_CHANNEL_PARTNER_CHARGE_BANKS,
  STORE_CHANNEL_PARTNER_PROCESSING_TYPES,
  STORE_CHANNEL_PARTNER_FETCHED_FORM_DATA,
  LOADING,
  LOADED,
} from '../types';

export const getRegistrarList = () => async (dispatch, getState) => {
  const data = {
    SortExpression: 'ASC',
    Filter: 'AND RegistrarType IN(9,8)', // put in config
  };

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
    type: STORE_CHANNEL_PARTNER_REGISTRARS,
    payload: { Data },
  });
};

export const getChargeTypeList = () => async (dispatch, getState) => {
  const params = {
    objTypeName: 1, // CommissionType, put in config
  };

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
    type: STORE_CHANNEL_PARTNER_CHARGE_TYPES,
    payload: { Data: responseData },
  });
};

export const getBankList_new = () => async (dispatch, getState) => {
  const data = {
    CountryId: 'D737E31FD6BF28ACF9A90757B45C9D1C', // Put in config
  };

  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_BANKS, data);
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
    type: STORE_CHANNEL_PARTNER_CHARGE_BANKS,
    payload: { Data },
  });
};

export const getRegistrarGatewayDetails =
  (BankId) => async (dispatch, getState) => {
    const data = {
      BankId,
    };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_REGISTRAR_GATEWAYS, data);
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
      type: STORE_CHANNEL_PARTNER_FETCHED_FORM_DATA,
      payload: { Data },
    });
  };

export const getProcessingTypeList =
  (BankType) => async (dispatch, getState) => {
    const objTypeName =
      BankType === 'Acquiring Bank' ? 'CardType' : 'ServiceMode';

    const params = {
      objTypeName,
    };

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
      type: STORE_CHANNEL_PARTNER_PROCESSING_TYPES,
      payload: { Data: responseData, BankType },
    });
  };

export const submitChannelPartnerDetails =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.SUBMIT_CHANNEL_PARTNER_DETAILS,
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

    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };
