import { pick } from 'lodash';
import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { handleFileModal } from '../../../Common/filePopupActions';
import { showAlert } from '../../../UIActions';
import {
  STORE_KYC_DOCUMENT_DETAILS,
  STORE_KYC_DOCUMENT_FILE,
  UNSTORE_KYC_DOCUMENT_FILE,
  STORE_INDIVIDUAL_SHARE_HOLDERS,
  STORE_COMPANY_SHARE_HOLDERS,
  LOADING,
  LOADED,
  OPEN_FILE_VIEWER_POPUP,
  CLOSE_FILE_VIEWER_POPUP,
} from '../../../types';

export const getKYCDocumentDetails = (Crid) => async (dispatch, getState) => {
  // dispatch({
  //   type: LOADING,
  // });
  const data = {
    Crid,
  };

  try {
    const response = await api.post(config.FETCH_KYC_DOCUMENT_DETAILS, data);
    const { Data, Description, Status } = response.data;

    if (Status) {
      // Save in store
      const payload = pick(Data, [
        'BusinessProof',
        'BankAccountProof',
        'AddressProof',
        'ShareHolder',
        'Crid',
        'ClientId',
        'KycStatus',
        'IsContact',
        'CompanyShareholder',
        'IndividualShareholder',
        'CompanyTypeId',
        'SubCategoryId',
        'CategoryId',
      ]);

      payload.AllData = Data;
      // dispatch({
      //   type: LOADED,
      // });
      dispatch({
        type: STORE_KYC_DOCUMENT_DETAILS,
        payload,
      });
    } else {
      // dispatch({
      //   type: LOADED,
      // });
      dispatch(
        showAlert({
          type: 'danger',
          message: Description || 'Oops, something went wrong...',
        })
      );
    }
  } catch (error) {
    // dispatch({
    //   type: LOADED,
    // });
    errorAlertHandler(error, dispatch);
  }
};

export const getKYCDetailsByPrefix =
  (PriFix, Crid) => async (dispatch, getState) => {
    Crid = Crid ?? getState().addBusiness.BusinessInfo.CompanyCrid;

    const data = {
      PriFix,
      Crid,
    };

    try {
      const response = await api.post(
        config.FETCH_KYC_DOCUMENT_DETAILS_BY_PREFIX,
        data
      );
      const { Data } = response.data;
      if (Data?.length > 0) {
        switch (PriFix) {
          case 'SDI':
            dispatch({
              type: STORE_INDIVIDUAL_SHARE_HOLDERS,
              payload: Data,
            });
            break;
          case 'SDC':
            dispatch({
              type: STORE_COMPANY_SHARE_HOLDERS,
              payload: Data,
            });
            break;
        }
      }
    } catch (error) {
      errorAlertHandler(error, dispatch);
    }
  };

export const saveKYCDocumentDetails = (data) => async (dispatch, getState) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });

  try {
    const response = await api.post(config.SAVE_KYC_DOCUMENT_DETAILS, data);

    dispatch({
      type: LOADED,
    });

    if (response.data?.Status === true) {
      dispatch(getKYCDocumentDetails(data.Crid));

      dispatch(
        showAlert({
          type: 'success',
          message: response.data.Description,
        })
      );
    } else {
      dispatch(
        showAlert({
          type: 'danger',
          message: response.data.Description,
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOADED,
    });

    errorAlertHandler(error, dispatch);
  }
};

export const updateCompanyType = (data) => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  });

  try {
    const response = await api.post(
      data.IsContact === 0
        ? config.UPDATE_COMPANY_TYPE_BUSINESS
        : config.UPDATE_COMPANY_TYPE_CONTACT,
      data
    );

    dispatch({
      type: LOADED,
    });

    if (response.data?.Status) {
      dispatch(getKYCDocumentDetails(data.Crid));

      dispatch(
        showAlert({
          type: 'success',
          message: response.data.Description,
        })
      );
    } else {
      dispatch(
        showAlert({
          type: 'danger',
          message: response.data.Description,
        })
      );
    }
  } catch (error) {
    dispatch({
      type: LOADED,
    });

    errorAlertHandler(error, dispatch);
  }
};

export const saveShareHolderData = (data) => async (dispatch, getState) => {
  let responseData = null;
  dispatch({
    type: LOADING,
  });
  console.log(data);
  try {
    const response = await api.post(config.SAVE_SHARE_HOLDER_KYC_DETAILS, data);

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
    return false;
  }

  const { StatusCode, Description, Data } = responseData;

  if (StatusCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return false;
  }

  // Finally
  // dispatch(getKYCDocumentDetails(data.Crid));
  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );

  return true;
};

/**
 *
 * @param {Object} data - payload
 * @param {string} DocumentDetailId - of the row
 * @param {string} Status - 0, hardcoded
 * @returns
 */
export const deleteKYCDocument = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.MANAGE_KYC_DOCUMENT_DETAILS, data);
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
  dispatch(showAlert({ type: 'success', message: Description }));
  return true;
};

/**
 *
 * @param {Object} data
 * @param {string} data.PaymateReferenceId - Encrypted (MANDATORY)
 * @returns
 */
// To download attachment
export const fetchViewImage =
  (data, isOpen = true, isDownloadable = true) =>
  async (dispatch, getState) => {
    let responseData = null;

    let new_data = {
      PaymateReferenceId: data.PaymateReferenceId,
    };

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_VIEW_IMAGE, new_data);
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
      handleFileModal({
        isOpen,
        isDownloadable,
        content: Data.DocumentContent,
        fileType: Data.DocumentContentType,
        fileName: data.DocumentFileName,
      })
    );
  };

export const viewKYCDocument =
  (PaymateReferenceId) => async (dispatch, getState) => {
    const data = {
      PaymateReferenceId,
    };
    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_VIEW_IMAGE, data);

      dispatch({
        type: LOADED,
      });

      const { Data, Description, Status } = response.data;
      if (Status === true) {
        dispatch({
          type: STORE_KYC_DOCUMENT_FILE,
          payload: response.data,
        });
        //return Data;
      } else {
        dispatch(unstoreKYCFile());
        dispatch(
          showAlert({
            type: 'danger',
            message: Description,
          })
        );
        //return null;
      }
    } catch (error) {
      dispatch({
        type: LOADED,
      });

      errorAlertHandler(error, dispatch);
      //return null;
    }
  };

export const unstoreKYCFile = () => (dispatch) => {
  dispatch({
    type: UNSTORE_KYC_DOCUMENT_FILE,
  });
};

export const openFileViewer = () => (dispatch) => {
  dispatch({
    type: OPEN_FILE_VIEWER_POPUP,
  });
};

export const closeFileViewer = () => (dispatch) => {
  dispatch({
    type: CLOSE_FILE_VIEWER_POPUP,
  });
};
