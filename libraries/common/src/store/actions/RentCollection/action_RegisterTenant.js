import { LOADED, LOADING, SET_TABLE_REFRESH_FLAG } from '../types';
import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';
import { showAlert } from '../UIActions';
import _ from 'underscore';

/**
 * [POST request]
 * Register a new tenant using the provided tenant information.
 *
 * @param {Object} data - The tenant information object.
 * @param {string} data.TenantName - The name of the tenant.
 * @param {string} data.TenantCode - The code for the tenant.
 * @param {string} data.MobileNo - The mobile number of the tenant.
 * @param {string} data.EmailID - The email address of the tenant.
 * @param {string|null} data.Address - The address of the tenant (or null if not provided).
 * @param {string} data.AddressLine1 - The first line of the tenant's address.
 * @param {string} data.AddressLine2 - The second line of the tenant's address.
 * @param {string} data.PinCode - The postal code of the tenant's location.
 * @param {string} data.City - The city where the tenant is located.
 * @param {string} data.IsdCode - The ISD (International Subscriber Dialing) code.
 * @param {string|null} data.MobileNumber - The mobile number (or null if not provided).
 * @param {boolean} data.IsValid - Indicates if the tenant information is valid.
 * @param {string|null} data.Message - A message related to the tenant (or null if not provided).
 * @param {string|null} data.CompanyId - The ID of the company (or null if not provided).
 * @param {string|null} data.ClientId - The ID of the client (or null if not provided).
 * @param {string|null} data.CreatedBy - The ID of the user who created the tenant information (or null if not provided).
 * @param {string|null} data.CreatedDate - The date when the tenant information was created (or null if not provided).
 * @param {string|null} data.Status - The status of the tenant (or null if not provided).
 * @param {string|null} data.TenantCountryId - The ID of the tenant's country (or null if not provided).
 *
 * @returns {boolean}
 */

export const submitSingleTenantRegistrationData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const url = config.SUBMIT_SINGLE_TENANT_REGISTRATION_DATA;
      const response = await api.post(url, data);
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
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };

/**
 * [POST REQUEST]
 * Stores Manage Tenant table data -
 * tenantMasterDataList: state.tenantMaster.tenantMasterDataList,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.CompanyId - Exncrypted Company Id (MANDATORY)
 * @param {string} data.ClientId - Encrypted Client Id (MANDATORY)
 * @param {string} data.RoleType - "External" - Hardcoded (MANDATORY)
 * @param {string} data.PropertyId - Encrypted Property Id ( case: fetch a single record ) (MANDATORY)
 * @returns {undefined}
 */
export const getTenantsMasterData = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_TENANT_MASTER_DATA, data);
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
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return;
  }

  dispatch({
    type: 'STORE_REGISTERED_TENANT_DATA',
    payload: responseData,
  });
};

/**
 * [POST REQUEST]
 * TO Approve, reject, block or unblock a particular property -
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.CompanyId - Decrypted Company Id (Optional)
 * @param {string} data.ClientId - Encrypted Property Id (MANDATORY)
 * @param {string} data.Remarks - ( case: block or reject ) (MANDATORY)
 * @param {number} data.Status -  0-Block, 1-Unblock, 2-Reject, 4-Approve (MANDATORY)
 * @returns {undefined}
 */
export const updateTenantStatus = (data) => async (dispatch, getState) => {
  let responseData = null;
  console.log(data);
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.UPDATE_TENANT_STATUS, data);
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
  console.log(responseData);
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
  return true;
};

/**
 * [POST request]
 * A request to send a reminder on Mail
 *
 * @param {Object} data - Mandatory
 * @param {string} data.ClientId - encrypted Client ID (Mandatory)
 * @returns {undefined}
 */
export const sendTenantInvitationMail =
  (data) => async (dispatch, getState) => {
    let responseData = null;
    console.log(data);
    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.SEND_TENANT_INVITATION_MAIL, data);
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
    console.log(responseData);

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
 * [POST REQUEST]
 * Stores response containing the data returned after submitting and validating the Bulk property file-
 * bulkTenantsFromResponse: state.tenantMaster.bulkTenantsFromResponse,
 *
 *
 * @param {Object} data - The data object containing information about bulk property registration.
 * @param {string} data.ClientId - The ID of the client.
 * @param {string} data.CompanyId - The ID of the company.
 * @param {Array<Object>} data.lstBulkProperty - An array of objects representing individual bulk properties.
 * @param {string} data.UploadedBy - The ID of the user who uploaded the bulk properties.
 * @param {string} data.lstBulkProperty[].CompanyId - The ID of the company for an individual bulk property.
 * @param {string} data.lstBulkProperty[].ClientId - The ID of the client for an individual bulk property.
 * @param {string|null} data.lstBulkProperty[].CompanyName - The name of the company (or null if not provided).
 * @param {string} data.lstBulkProperty[].PropertyName - The name of the individual property.
 * @param {string} data.lstBulkProperty[].PropertyCode - The code for the individual property.
 * @param {string} data.lstBulkProperty[].PropertyNumber - The property number.
 * @param {string} data.lstBulkProperty[].OwnerName - The name of the property owner.
 * @param {string} data.lstBulkProperty[].OwnerCode - The code for the property owner.
 * @param {string} data.lstBulkProperty[].PropertyAddress - The address of the property.
 * @param {string} data.lstBulkProperty[].AddressLine2 - The second line of the property address.
 * @param {string} data.lstBulkProperty[].PinCode - The postal code of the property.
 * @param {string} data.lstBulkProperty[].City - The city where the property is located.
 * @param {string} data.lstBulkProperty[].Status - The status of the individual property.
 * @param {string} data.lstBulkProperty[].Message - A message associated with the individual property.
 * @param {string} data.lstBulkProperty[].CreatedBy - The ID of the user who created the individual property.
 * @param {boolean} data.lstBulkProperty[].IsValid - Indicates if the individual property is valid.
 * @param {string|null} data.lstBulkProperty[].FileUploadStatus - The file upload status for the individual property (or null if not provided).
 *
 * @returns {undefined}
 */
export const submitBulkRegisterTenantsData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.VALIDATE_BULK_TENANT_REGISTRATION,
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

    dispatch({
      type: 'STORE_BULK_TENANTS_FROM_RESPONSE',
      payload: responseData,
    });
  };

/**
 * Confirms bulk property registration by sending a request to the server.
 *
 * @param {Object} data - The data object containing parameters for confirming bulk property registration.
 * @param {string} data.CompanyId - The ID of the company.
 * @param {string} data.ClientId - The ID of the client.
 * @param {string} data.UploadedBy - The ID of the user who uploaded the bulk properties.
 * @returns {Promise<boolean>} A Promise that resolves to true if the confirmation is successful, or false if there's an issue.
 */
export const confirmBulkTenants = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.CONFIRM_BULK_TENANTS;
    const response = await api.post(url, data);
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
  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );

  return true;
};

/**
 * Stores the response containing the table data for bulk property if any in the backend's session (i.e., uploaded but unconfirmed data)
 * bulkTenantsFromResponse: state.tenantMaster.bulkTenantsFromResponse,
 *
 * @param {Object} data - The data object containing parameters for confirming bulk property registration.
 * @param {string} data.ClientId - The ID of the client.
 * @param {string} data.UploadedBy - The ID of the user who uploaded the bulk properties.
 * @returns {Promise<undefined>}
 */
export const getBulkTenantsFromSession =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.GET_BULK_TENANTS_FROM_SESSION,
        data
      );
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
      //   dispatch({
      //     type: LOADED,
      //   });
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

    // NOTE: Temporary jugaad, as it can be changed at backend
    if (!_.isEmpty(responseData?.Data)) {
      responseData.Data.lstBulkTenant = responseData.Data;
    }
    dispatch({
      type: 'STORE_BULK_TENANTS_FROM_RESPONSE',
      payload: responseData,
    });
  };

/**
 * Remove bulk tenants from the session
 *
 * @param {Object} data - The data object containing parameters for confirming bulk property registration.
 * @param {string} data.CompanyId - The ID of the Company.
 * @param {string} data.UploadedBy - The ID of the user who uploaded the bulk properties.
 * @returns {Promise<boolean>}
 */
export const cancelBulkTenant = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.CANCEL_BULK_TENANT, data);
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

  // Finally
  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );

  return true;
};

export const flushBulkTenantResponse = () => (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_BULK_TENANT_RESPONSE',
  });
};

export const clearRegisterTenantData = () => (dispatch, getState) => {
  dispatch({
    type: 'CLEAR_TENANT_TABLE_DATA',
  });
};
