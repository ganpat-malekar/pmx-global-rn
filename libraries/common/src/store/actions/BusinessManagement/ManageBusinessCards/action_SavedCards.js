import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../UIActions';
import {
  STORE_ISSUING_BANKS_FOR_CARDS,
  STORE_CARD_TYPE,
  STORE_CARD_CURRENCY,
  STORE_CARD_LIST,
  STORE_CARD_LIST_EXPORT,
  OPEN_MANAGE_CARD_STATUS_DIALOG,
  CLOSE_MANAGE_CARD_STATUS_DIALOG,
  SET_TABLE_REFRESH_FLAG,
  LOADING,
  LOADED,
} from '../../types';

export const getIssuingBanksByCompanyId =
  (CompanyId) => async (dispatch, getState) => {
    const data = {
      CompanyId,
    };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_ISSUING_BANK_BY_COMPANY,
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
      type: STORE_ISSUING_BANKS_FOR_CARDS,
      payload: { Data },
    });
  };

export const getCardTypeByCompanyId =
  (CompanyId) => async (dispatch, getState) => {
    const data = {
      CompanyId,
    };

    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.FETCH_CARD_TYPE_BY_COMPANY, data);
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
      type: STORE_CARD_TYPE,
      payload: { Data },
    });
  };

export const getCompanyCurrencies_new =
  (CompanyId) => async (dispatch, getState) => {
    const data = {
      CompanyId,
    };

    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.FETCH_COMPANY_CURRENCIES, data);
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
      type: STORE_CARD_CURRENCY,
      payload: { Data },
    });
  };

export const getCardList =
  (data, filename, dontShowAlert) => async (dispatch, getState) => {
    // const data = {
    //   CompanyId: "", // encrypted, eg "8AA17140282B81731E71DD502EAD5343"
    //   CardType: "", // encrypted, eg "A56367E359787FD599676B25961B08DE" from the getCardTypeByCompanyId() api pick DetailId, CodeName
    //   CurrencyId: "", // encrypted, eg "B70C558595EB6EA65584D7AF941DFB88" from the getCompanyCurrencies() api pick CurrencySymbol, CurrencyId
    //   RegistrarId: "", // encrypted, eg "DF80E1FB956F6C254F5A88652EED2215" from the getIssuingBanksByCompanyId() api pick RegistrarId, Name
    //   Status: "", // decrypted, hardcoded based on RoleId from GetDataAgainstToken api
    //   FromDate: "", // eg "30/11/2021" Decrypted
    //   ToDate: "", // eg "01/05/2022" Decrypted
    //   FromRecord: "0",
    //   ToRecord: "10",
    //   PageNumber: "1",
    //   PageSize: "10",
    // };

    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.FETCH_CARD_DETAILS_LIST, data);
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

    const { StatusCode, Description } = responseData;

    if (StatusCode !== '000') {
      if (dontShowAlert) {
        return;
      } else {
        dispatch(
          showAlert({
            type: 'danger',
            message: Description || 'Something went wrong',
          })
        );
        return;
      }
    }

    // Finally, store in reducer
    if (filename) {
      dispatch({
        type: STORE_CARD_LIST_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_CARD_LIST,
        payload: responseData,
      });
    }
  };

// For table actions

/**
 * [POST REQUEST]
 * Status 1 for active
 * Status 0 for Delete
 * Status 2 for Deactive
 * Status 4 for GetStatus
 * Status 3 for Expire
 */
export const updateCardStatus = (data) => async (dispatch, getState) => {
  // const data = {
  //   Action: "Delete", // eg: "Delete" or "Expire" or "Approve" or ""
  //   CardNo: null,
  //   ID: "40087", // eg: "40087", decryped CardDetailsId of the row
  //   MerStackRef: "null", // eg: "null" for Delete, or "Deactive" for Expire, or null for Approve
  //   Remarks: "test", // eg: enter remark in popup after confirming
  //   Status: 0, // eg: 0 for Delete, or 3 for Expire, or 1 for Approve
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.UPDATE_CARD_STATUS, data);
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
    type: 'RESET_CONFIRM_PROMPT_DATA',
  });
  dispatch({
    type: 'RESET_REMARK_PROMPT_DATA',
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
  // dispatch({
  //   type: CLOSE_MANAGE_CARD_STATUS_DIALOG,
  // });
};

export const openManageCardStatusDialogFn =
  (data) => async (dispatch, getState) => {
    dispatch({
      type: OPEN_MANAGE_CARD_STATUS_DIALOG,
      payload: data,
    });
  };

export const closeManageCardStatusDialogFn =
  () => async (dispatch, getState) => {
    dispatch({
      type: CLOSE_MANAGE_CARD_STATUS_DIALOG,
    });
  };
