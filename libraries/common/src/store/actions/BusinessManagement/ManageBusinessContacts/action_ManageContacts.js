import axios from 'axios';
import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../UIActions';
import {
  STORE_COMPANIES,
  STORE_CONTACT_TYPES,
  STORE_MANAGE_CONTACT_LIST,
  STORE_MANAGE_CONTACT_EXPORT,
  STORE_VENDOR_VIEW_INFO,
  LOADING,
  LOADED,
  OPEN_DEACTIVATE_VENDOR_DIALOG,
  CLOSE_DEACTIVATE_VENDOR_DIALOG,
  OPEN_VIEW_VENDOR_DIALOG,
  CLOSE_VIEW_VENDOR_DIALOG,
  OPEN_DELETE_VENDOR_DIALOG,
  CLOSE_DELETE_VENDOR_DIALOG,
  OPEN_APPROVE_REJECT_VENDOR_MODAL,
  CLOSE_APPROVE_REJECT_VENDOR_MODAL,
  SET_TABLE_REFRESH_FLAG,
} from '../../types';

export const getContactType = () => async (dispatch, getState) => {
  const params = {
    objTypeName: 'ContactType',
  };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.get(config.GET_TYPES_DATA, { params });
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

  // Finally, store in reducer
  dispatch({
    type: STORE_CONTACT_TYPES,
    payload: { Data: responseData },
  });
};

//Get Companies
/**
 * Stores data in reducer
 * companyList: state.manageContacts.companyList,
 * @param {Object} data - payload, (MANDATORY)
 * @param {string} data.CompanyId - Encrypted, CompanyId from BusinessList dorpdown
 * @returns {undefined}
 */
export const getCompaniesByBusiness = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.FETCH_VENDOR_CONFIGURATION_DETAILS,
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
    type: STORE_COMPANIES,
    payload: responseData.Data,
  });
};

// For contact listing
export const getContactList_new =
  (data, filename) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_VENDOR_CONFIGURATION_DETAILS,
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
    if (filename) {
      dispatch({
        type: STORE_MANAGE_CONTACT_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_MANAGE_CONTACT_LIST,
        payload: responseData,
      });
    }
  };

// View Action
/**
 * Returns all the Records of Vendor Information
 *
 * @param {Object} data - payload, (MANDATORY)
 * @param {string} data.ClientId - Encrypted, ClientId of the selected record (MANDATORY)
 * @param {boolean} data.viewOnly - Defines if the function is for view or actions (MANDATORY)
 * @param {boolean} data.requestType - Defines if the function is for view or actions (MANDATORY)
 *
 * @returns {undefined}
 */
export const viewVendorInfo =
  (data, viewOnly, requestType) => async (dispatch, getState) => {
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
      type: STORE_VENDOR_VIEW_INFO,
      payload: {
        data: responseData,
        viewOnly: viewOnly,
        requestType: requestType,
      },
    });
  };

// For table actions
/**
 * Returns the status of the Approve/Reject Actions
 *
 * @param {Object} data - payload, (MANDATORY)
 * @param {string} data.ClientId - Encrypted, ClientId of the selected record (MANDATORY)
 * @param {string} data.Crid - Encrypted, Crid of the selected record (MANDATORY)
 * @param {Number} data.UploadedBy - Decrypted, UploadedBy Parameter  (MANDATORY)
 * @param {string} data.Remarks - Remark from Modal (MANDATORY)
 *  @param {Number} data.Documentstatus - Hardcoded (MANDATORY)
 * @param {Number} data.Status - Hardcoded (MANDATORY)
 * @param {boolean} data.viewOnly - Defines if the function is for view or actions (MANDATORY)
 * @returns {undefined}
 */
export const manageVendor = (data) => async (dispatch, getState) => {
  let responseData = null;

  // const data = {
  //   ClientId: props.deactivateVendorData.ClientId, // eg "C5706DA9D9621B6765E4638FB49FA14C" from row
  //   Crid: props.deactivateVendorData.Crid, // eg "36CC7E400C202AE54EB40F0CEDB22C8B" from row
  //   Documentstatus: 0, // eg 0, fixed
  //   Remarks: remark, // eg: "test"
  //   Status: 10, // eg 4 for Accept Vendor, 2 for Reject Vendor, 10 for deactivate vendor, 1 for activate vendor
  //   UploadedBy: props.deactivateVendorData.UploadedBy, // UploadedBy from row
  // };

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.UPDATE_VENDOR_STATUS, data);
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
    type: 'RESET_REMARK_PROMPT_DATA',
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
  dispatch({
    type: CLOSE_VIEW_VENDOR_DIALOG,
  });
};

// For table actions
export const deleteVendorInfo = (data) => async (dispatch, getState) => {
  // const data = {
  //   ClientId: "", // eg "3012C61EA4DF5FC6B9B518E5AE9B7C20" from row
  //   Crid: 0, // fixed
  //   Status: 0, // fixed
  //   XpressId: null, // fixed
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.VENDOR_DELETE, data);
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
    type: CLOSE_DELETE_VENDOR_DIALOG,
  });
  dispatch({
    type: 'RESET_CONFIRM_PROMPT_DATA',
  });
};

// Request for documents

/**
 * [POST request]
 * Used For Requesting documents, send KYC Rejection Mail, resend mail to cat team-
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.ClientId - Decrypted from the row  eg: "206324" (MANDATORY)
 * @param {string} data.Type - "kycRejectlist", Hardcoded (MANDATORY)
 *
 * Type - "kycRejectlist" -- for Send KYC rejection mail, Request for Documents
 * Type - "InfoToCATForVendorKycUploaded" -- for Resend mail to cat team
 *
 * @returns {undefined}
 */

export const sendEmail = (data) => async (dispatch, getState) => {
  // const data = {
  //   ClientId: "", // from row, decrypted, eg: "206324"
  //   Type: "kycRejectlist", // Request for documents or "InfoToCATForVendorKycUploaded" for Resend mail to cat team
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.VENDOR_MAILER, data);
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
};

// Resend mail to vendor
export const emailVendor = (data) => async (dispatch, getState) => {
  // const data = {
  //   ClientId: "", // from the row, encrypted, eg: "EA45309FDE62AEC28687EC90236D338F"
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SEND_INVITATION_MAIL, data);
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
};

/**
 * [POST request]
 * Used For Accept vendor kyc, On Hold Actions -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.Crid - Encrypted from the row (MANDATORY)
 * @param {string} data.ClientId - Encrypted from the row (MANDATORY)
 * @param {number} data.Status - 12, Hardcoded (MANDATORY)
 * @param {string} data.Remarks - null, (OPTIONAL)
 * @param {string} data.type - "kyc", Hardcoded (MANDATORY)
 *
 * Status - 12 -- Accept Kyc
 * Status - 14 -- On Hold (it might be a remark prompt, check)
 * Status - 13 -- Release Document (Release Hold)
 *
 * @returns {undefined}
 */
export const updateAcquireStatus = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.UPDATE_ACQUIRE_STATUS, data);
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
  dispatch(showAlert({ type: 'success', message: Description }));
  dispatch({
    type: 'RESET_REMARK_PROMPT_DATA',
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });

  return true;
};

/**
 * [POST request]
 * Rejects vendor kyc -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.Crid - Encrypted from the row (MANDATORY)
 * @param {string} data.ClientId - Encrypted from the row (MANDATORY)
 * @param {number} data.Status - 6, Hardcoded (MANDATORY)
 * @param {string} data.Remarks - eg: "test", (MANDATORY)
 * @param {string} data.Documentstatus - 0, (OPTIONAL)
 * @param {string} data.UploadedBy - 0, (OPTIONAL)
 * @returns {undefined}
 */
export const rejectVendorKYC = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.REJECT_CONTACT_KYC, data);
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
  dispatch(showAlert({ type: 'success', message: Description }));

  dispatch({
    type: 'RESET_REMARK_PROMPT_DATA',
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });

  return true;
};

/**
 * [POST request]
 * Accepts vendor kyc -
 *
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.Crid - Encrypted from the row (MANDATORY)
 * @param {string} data.ClientId - Encrypted from the row (MANDATORY)
 * @param {string} data.AppointMentDate - Plaitext, eg: "22 February 2023" (MANDATORY)
 * @param {string} data.AppointMentDateTime - Plaitext, eg: "04:15 PM" (MANDATORY)
 * @param {string} data.KycuserId - dropdown value (OPTIONAL)
 *
 * @returns {undefined}
 */
export const submitBookKycAppointment =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.SET_CONTACT_KYC_APPOINTMENT, data);
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
    dispatch(showAlert({ type: 'success', message: Description }));
    dispatch({
      type: 'CLOSE_BOOK_APPOINTMENT_MODAL',
    });
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });

    return true;
  };

export const openBookAppointmentModal = (data) => (dispatch) => {
  dispatch({
    type: 'OPEN_BOOK_APPOINTMENT_MODAL',
    payload: data,
  });
};
export const closeBookAppointmentModal = () => (dispatch) => {
  dispatch({
    type: 'CLOSE_BOOK_APPOINTMENT_MODAL',
  });
};

export const openDeactivateDialogFn = (data) => async (dispatch, getState) => {
  dispatch({
    type: OPEN_DEACTIVATE_VENDOR_DIALOG,
    payload: data,
  });
};

export const closeDeactivateDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_DEACTIVATE_VENDOR_DIALOG,
  });
};

export const openViewVendorDialogFn = (data) => async (dispatch, getState) => {
  dispatch({
    type: OPEN_VIEW_VENDOR_DIALOG,
    payload: data,
  });
};

export const closeViewVendorDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VIEW_VENDOR_DIALOG,
  });
};

export const openDeleteDialogFn = (data) => async (dispatch, getState) => {
  dispatch({
    type: OPEN_DELETE_VENDOR_DIALOG,
    payload: data,
  });
};

export const closeDeleteDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_DELETE_VENDOR_DIALOG,
  });
};
