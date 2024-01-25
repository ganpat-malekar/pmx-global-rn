import {
  LOADED,
  LOADING,
  SET_TABLE_REFRESH_FLAG,
  STORE_TRACK_RENT_COLLECTIONS_DATA,
} from '../types';
import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';
import { showAlert } from '../UIActions';
import _ from 'underscore';

/**
 * [POST REQUEST]
 * Stores Track Rent Collection data -
 * trackRentCollectionsDataList: state.rentReducer.trackRentCollectionsDataList,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.CldId - for View, Edit, Renew (MANDATORY)
 * @param {string} data.PropertyId - for View History Action (MANDATORY)
 * @returns {undefined}
 */
export const getTrackRentCollectionData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.MANAGE_TRACK_RENT_COLLECTION,
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
      type: STORE_TRACK_RENT_COLLECTIONS_DATA,
      payload: responseData,
    });
  };

/**
 * [POST REQUEST]
 * TO Enable or Disable a Reminder -
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.ClientId - Encrypted Client Id (MANDATORY)
 * @param {string} data.CldId - Encrypted Cld Id (MANDATORY)
 * @param {boolean} data.Status - true-enable, false-disable (MANDATORY)
 * @param {number} data.PropertyRentRefNo -  Decrypted (MANDATORY)
 * @returns {undefined}
 */
export const updateRentCollectionReminder =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.UPDATE_RENT_COLLECTION_REMINDER,
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
      type: SET_TABLE_REFRESH_FLAG,
    });
  };

/**
 * [POST REQUEST]
 * Stores response containing the data returned after submitting and validating the Bulk Rent file-
 * bulkRentsFromResponse: state.rentReducer.bulkRentsFromResponse,
 *
 * @param {Object} paymentData - The payment data object.
 * @param {Array} paymentData.lstRentPayments - An array of rent payment objects.
 * @param {string} paymentData.ClientId - The client ID.
 * @param {string} paymentData.propertyId - The property ID.
 * @param {string} paymentData.CompanyId - The company ID.
 * @param {string} paymentData.UploadedBy - The user who uploaded the data.
 *
 * @returns {boolean} - Returns true if the payment processing was successful, otherwise false.
 */
export const submitBulkRentData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      config.VALIDATE_BULK_RENT_PAYMENT_FILE,
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
    type: 'STORE_BULK_RENTS_FROM_RESPONSE',
    payload: responseData,
  });
};

/**
 * Confirms bulk rent registration by sending a request to the server.
 * OR
 * Save single rent collection request
 *
 * make isBulkPayment true in case of bulk confirm button, and false in case of single request "continue/book another" button
 * That is the only difference and the api is same for both
 * @param {Object} data - The data object containing parameters for confirming bulk property registration.
 * @param {Array} data.lstRentPayments - An array of rent payment objects.
 * @returns {Promise<boolean>} A Promise that resolves to true if the confirmation is successful, or false if there's an issue.
 */
export const saveOrConfirmRent = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.BOOK_RENT_PAYMENTS;
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
 * [POST Request]
 * When you edit and want to save the changes to a record from booked rent collection table, use this api!
 *
 * send isBulkPayment as false
 * @param {Object} data - The data object containing parameters for confirming bulk property registration.
 * @param {Object} data - The input data object.
 * @param {boolean} data.IsValid - Indicates if the data is valid.
 * @param {string} data.RentId - The ID of the rent.
 * @param {string} data.CompanyId - The ID of the company.
 * @param {string | null} data.TenantName - The name of the tenant (or null if not available).
 * @param {string} data.ClientId - The ID of the client.
 * @param {string | null} data.PropertyName - The name of the property (or null if not available).
 * @param {string} data.PropertyId - The ID of the property.
 * @param {string} data.LeaseTypeId - The ID of the lease type.
 * @param {string | null} data.LeaseType - The type of the lease (or null if not available).
 * @param {string} data.LeaseStartDate - The start date of the lease (in the format "DD-MM-YYYY").
 * @param {string} data.LeaseEndDate - The end date of the lease (in the format "DD-MM-YYYY").
 * @param {string} data.FrequencyId - The ID of the frequency.
 * @param {string | null} data.Frequency - The frequency of rent payment (or null if not available).
 * @param {string} data.RentAmount - The rent amount.
 * @param {string} data.TaxRate - The tax rate.
 * @param {string} data.PayableAmount - The payable amount.
 * @param {string | null} data.CurrencyId - The ID of the currency (or null if not available).
 * @param {string} data.CurrencyCode - The currency code.
 * @param {number} data.PaymentType - The type of payment.
 * @param {string} data.RentCollectionDate - The date of rent collection (in the format "DD-MM-YYYY").
 * @param {string} data.Status - The status of the data.
 * @param {string | null} data.Remarks - Additional remarks (or null if not available).
 * @param {string | null} data.RequestBy - The entity that requested the data (or null if not available).
 * @param {string | null} data.CreatedOn - The creation date (or null if not available).
 * @param {boolean} data.isBulkPayment - Send false, Indicates if it's a bulk payment.
 * @param {boolean} data.isContinueClick - Indicates if the continue button was clicked.
 * @param {string} data.ServiceType - The type of service (e.g., "Web").
 * @param {string | null} data.Message - A message associated with the data (or null if not available).
 * @param {string | null} data.FileUploadStatus - The status of file uploads (or null if not available).
 * @param {string | null} data.PropertyRentRefNo - The reference number of the property rent (or null if not available).
 * @param {boolean} data.IsReceiveCopies - Indicates if copies are received.
 * @returns {Promise<boolean>} A Promise that resolves to true if the update was successful
 */
export const updateSingleRentData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.UPDATE_RENT_BOOKED_REQUEST;
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
 * Stores Track Rent Collection data -
 * bookedRentTable: state.rentReducer.trackRentCollectionsDataList,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.CldId - for View, Edit, Renew (MANDATORY)
 * @param {string} data.PropertyId - for View History Action (MANDATORY)
 * @returns {undefined}
 */
export const getBookedRentTableData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_BOOKED_TRANSACTIONS, data);
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
    type: 'STORE_BOOKED_RENT_COLLECTIONS_DATA',
    payload: responseData,
  });
};

/**
 * Confirms booked rent collections request
 *
 * @param {Object} data - The input data object.
 * @property {number} data.PaymentType - The type of payment.
 * @property {string} data.CollectionIds - TODO: ASK, are they comma separated RendId.
 * @property {string | null} data.UserName - The name of the user (or null if not available).
 * @property {number} data.UserId - The ID of the user.
 * @property {boolean} data.IsReceiveCopies - Indicates if copies are received.
 * @returns {Promise<boolean>} A Promise that resolves to true if the confirmation is successful, or false if there's an issue.
 */
export const confirmBookedRent = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.CONFIRM_RENT_COLLECTION_TRANSACTIONS;
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
 * Deletes a record from the booked rent collection table
 *
 * @param {Object} data - The data object containing parameters for confirming bulk property registration.
 * @param {Array} data.RentId - RentId from the row
 * @returns {Promise<boolean>} A Promise that resolves to true if the confirmation is successful, or false if there's an issue.
 */
export const deleteBookedRent = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const url = config.DELETE_BOOKED_RENT_TRANSACTION;
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
 * Stores subscription detials, used at frontend side for validation
 * subscriptionAndLimitDetails: state.rentReducer.subscriptionAndLimitDetails,
 *
 * @param {Object} data - The payment data object.
 * @param {string} data.PaymentType -  8, The client ID.
 *
 * @returns {boolean} - Returns true if the payment processing was successful, otherwise false.
 */
export const fetchSubscriptionAndLimitDetails =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_SUBSCRIPTION_AND_LIMIT_DETAILS,
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

    const { Status, StatusCode, Description } = responseData;

    // TODO: Remind about this issue to Yashwant again. currently bypassing the StatusCode
    // if (StatusCode !== "000") {
    if (Status !== true) {
      dispatch(
        showAlert({
          type: 'danger',
          message: Description || 'Something went wrong',
        })
      );
      return;
    }

    dispatch({
      type: 'STORE_SUBSCRIPTION_AND_LIMIT_DETAILS',
      payload: responseData,
    });
  };

export const flushBulkRentResponse = () => (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_BULK_RENT_RESPONSE',
  });
};

export const clearRentCollectionData = () => (dispatch, getState) => {
  dispatch({
    type: 'CLEAR_RENT_TABLE_DATA',
  });
};

/**
 * [Normal Action]
 * Store data of the row in reducer for editing -
 * editData: state.rentReducer.editData
 *
 * @param {Object} data - payload (MANDATORY)
 * @returns {undefined}
 */
export const storeRentCollectionEditData = (data) => (dispatch, getState) => {
  dispatch({
    type: 'STORE_RENT_EDIT_DATA',
    payload: data,
  });
};

/**
 * [Normal Action]
 * Removes editData from store on -
 * 1. Successful update
 * 2. Page reload
 * editData: state.rentReducer.editData
 *
 * @returns {undefined}
 */
export const flushRentCollectionEditData = () => (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_RENT_EDIT_DATA',
  });
};
