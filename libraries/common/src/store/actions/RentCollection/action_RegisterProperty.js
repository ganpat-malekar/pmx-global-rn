import {
  LOADED,
  LOADING,
  STORE_REGISTERED_PROPERTY_DATA,
  SET_TABLE_REFRESH_FLAG,
} from '../types';
import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';
import { showAlert } from '../UIActions';
import _ from 'underscore';

/**
 * [POST request]
 * Register a property with the provided data.
 *
 * @param {Object} data - The data object containing property registration information.
 * @param {string} data.ClientId - The ID of the client.
 * @param {string|null} data.PropertyId - The ID of the property (or null if not provided).
 * @param {string} data.CompanyId - The ID of the company.
 * @param {string} data.PropertyName - The name of the property.
 * @param {string} data.PropertyCode - The code for the property.
 * @param {string} data.PropertyNumber - The property number.
 * @param {string} data.OwnerName - The name of the property owner.
 * @param {string} data.OwnerCode - The code for the property owner.
 * @param {string} data.PropertyAddress - The address of the property.
 * @param {string} data.AddressLine2 - The second line of the property address.
 * @param {string} data.City - The city where the property is located.
 * @param {string} data.PinCode - The postal code of the property.
 * @param {string|null} data.StatusCode - The status code (or null if not provided).
 * @param {number} data.UserId - The ID of the user associated with the registration.
 * @param {number} data.ModifiedBy - The ID of the user who modified the data (0 if not modified).
 * @param {number} data.Status - The status of the registration.
 * @param {string} data.RoleType - The role type (e.g., "external").
 * @param {string|null} data.ErrorCode - The error code (or null if not an error).
 * @param {string} data.Action - The action being performed (e.g., "PropertyRegistration").
 *
 * @returns {boolean}
 */

export const submitSinglePropertyRegistrationData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const url = config.SUBMIT_SINGLE_PROPERTY_REGISTRATION_DATA;
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
 * Stores Manage Property table data -
 * propertyMasterDataList: state.propertyMaster.propertyMasterDataList,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.CompanyId - Encrypted Company Id (MANDATORY)
 * @param {string} data.ClientId - Encrypted Client Id (MANDATORY)
 * @param {string} data.RoleType - "External" - Hardcoded (MANDATORY)
 * @param {string} data.PropertyId - Encrypted Property Id ( case: fetch a single record ) (MANDATORY)
 * @returns {undefined}
 */
export const getPropertyMasterData = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_PROPERTY_MASTER_DATA, data);
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
    type: STORE_REGISTERED_PROPERTY_DATA,
    payload: responseData,
  });
};

/**
 * [POST REQUEST]
 * TO Approve, reject or delete a particular property -
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.CompanyId - Decrypted Company Id (MANDATORY)
 * @param {string} data.PropertyId - Encrypted Property Id (MANDATORY)
 * @param {string} data.Remarks - ( case: delete or reject ) (MANDATORY)
 * @param {number} data.status -  1-Accept, 2-Reject, 0-Delete (MANDATORY)
 * @returns {undefined}
 */
export const managePropertyConfiguration =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.MANAGE_PROPERTY_CONFIGURATION,
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

    dispatch({
      type: 'RESET_CONFIRM_PROMPT_DATA',
    });
    dispatch({
      type: 'RESET_REMARK_PROMPT_DATA',
    });
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
  };

/**
 * [POST REQUEST]
 * Stores response containing the data returned after submitting and validating the Bulk property file-
 * bulkPropertiesFromResponse: state.propertyMaster.bulkPropertiesFromResponse,
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
export const submitBulkRegisterPropertyData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.VALIDATE_BULK_PROPERTY_REGISTRATION,
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
      type: 'STORE_BULK_PROPERTIES_FROM_RESPONSE',
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
export const confirmBulkProperties = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.CONFIRM_BULK_PROPERTIES;
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
 * bulkPropertiesFromResponse: state.propertyMaster.bulkPropertiesFromResponse,
 *
 * @param {Object} data - The data object containing parameters for confirming bulk property registration.
 * @param {string} data.ClientId - The ID of the client.
 * @param {string} data.UploadedBy - The ID of the user who uploaded the bulk properties.
 * @returns {Promise<undefined>}
 */
export const getBulkPropertiesFromSession =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.GET_BULK_PROPERTIES_FROM_SESSION,
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

    dispatch({
      type: 'STORE_BULK_PROPERTIES_FROM_RESPONSE',
      payload: responseData,
    });
  };

/**
 * Remove bulk properties from the session
 *
 * @param {Object} data - The data object containing parameters for confirming bulk property registration.
 * @param {string} data.ClientId - The ID of the client.
 * @param {string} data.UploadedBy - The ID of the user who uploaded the bulk properties.
 * @returns {Promise<boolean>}
 */
export const cancelBulkProperty = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.CANCEL_BULK_PROPERTY, data);
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

export const flushBulkPropertyResponse = () => (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_BULK_PROPERTY_RESPONSE',
  });
};

export const clearData = () => (dispatch, getState) => {
  dispatch({
    type: 'CLEAR_PROPERTY_TABLE_DATA',
  });
};
