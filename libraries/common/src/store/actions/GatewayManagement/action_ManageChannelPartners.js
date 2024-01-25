import {
  STORE_CAHNNEL_PARTNER_CARD_TYPES,
  STORE_ALL_REGISTRAR_TYPES,
  STORE_CHANNEL_PARTNER_LIST_EXPORT,
  STORE_CHANNEL_PARTNER_LIST,
  STORE_GATEWAY_ROW_DATA_EXPORT,
  LOADING,
  LOADED,
  CLOSE_MANAGE_PAYMENT_GATEWAY_STATUS_DIALOG,
  OPEN_MANAGE_PAYMENT_GATEWAY_STATUS_DIALOG,
  SET_TABLE_REFRESH_FLAG,
} from '../types';
import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../UIActions';
import _ from 'underscore';

export const getCardType = () => async (dispatch, getState) => {
  const params = {
    objTypeName: 'CardType',
  };

  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.get(config.FETCH_CAHNNEL_PARTNER_CARD_TYPES, {
      params,
    });
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
    type: STORE_CAHNNEL_PARTNER_CARD_TYPES,
    payload: { Data: responseData },
  });
};

export const getRegistrarTypeList = () => async (dispatch, getState) => {
  const data = {};

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
    type: STORE_ALL_REGISTRAR_TYPES,
    payload: { Data },
  });
};

export const getChannelPartnerList_new =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   RegistrarId: "", // eg "CB00ABB27F6C653C4D3E7AA3C8FE0628", encrypted Registrar type
    //   PaymentGatewayName: "", // eg "test"
    //   CardTypeId: "", // eg "C3ED7659E1E7588C634C3451EB0802E1", encrypted Processing Type, Use CommonManagement/GetTypesData?objTypeName=CardType api and use CodeName, DetailId for dropdown
    //   CurrencyName: "", // eg "5E0BCE671DEB4A1E0E1CA4B0E99F9525", encrypted text "USD" or "AED". Use api CommonManagement/FetchCurrencyByCountry, and encrypt CurrencySymbol
    //   StatusCode: "", // eg "B8EB2D571FB2A28C88FFABD809CE1D4F", encrypted. Hardcode 0, 1, 2, 3 as "Deleted", "Active", "Deactive", "Awaiting To Approve"
    //   FromDate: "", // eg "05/04/2022",
    //   ToDate: "", // eg "09/05/2022",
    //   FromRecord: "0",
    //   ToRecord: "10",
    //   PageNumber: "1",
    //   PageSize: "10",
    // };

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
    if (filename) {
      dispatch({
        type: STORE_CHANNEL_PARTNER_LIST_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_CHANNEL_PARTNER_LIST,
        payload: responseData,
      });
    }
  };

// For table actions
export const manageGatewayStatus = (data) => async (dispatch, getState) => {
  // const data = {
  //   RegistrarId: "", // encrypted, eg "EA11EED4E32AC4BFF15766527FDC49BE", RegistrarId of the row
  //   Status: "", // 2 for reject, 1 for approve, 0 for delete
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.MANAGE_PAYMENT_GATEWAY_STATUS, data);
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
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
  dispatch({
    type: 'RESET_CONFIRM_PROMPT_DATA',
  });
};

// For export data of the row to excel
export const getDataToExport = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_BUSINESS_MAPPED_GATEWAY, data);
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
    type: STORE_GATEWAY_ROW_DATA_EXPORT,
    payload: { Data },
  });
};

// export const openConfirmPrompt = (data) => async (dispatch, getState) => {
//   dispatch({
//     type: OPEN_MANAGE_PAYMENT_GATEWAY_STATUS_DIALOG,
//     payload: data,
//   });
// };

// export const closeConfirmPrompt = () => async (dispatch, getState) => {
//   dispatch({
//     type: CLOSE_MANAGE_PAYMENT_GATEWAY_STATUS_DIALOG,
//   });
// };
