import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';
import { showAlert } from '../UIActions';
import {
  LOADED,
  LOADING,
  SET_TABLE_REFRESH_FLAG,
  STORE_TENANT_MANAGE_PROPERTY,
  STORE_TENANT_REQUEST_RECEIVED,
  STORE_TENANT_TRACK_RENT_COLLECTION,
} from '../types';
import _ from 'underscore';

/**
 * [POST REQUEST]
 * Stores Property Name, Code dropdown data -
 * tenantManagePropertyDataList: state.tenantRentPayment.tenantManagePropertyDataList,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.CompanyId - Encrypted Company Id (MANDATORY)
 * @param {string} data.ClientId - Encrypted Client Id (MANDATORY)
 * @param {string} data.RoleType - "external" - Hardcoded (MANDATORY) (internal=Paymate user, external = other user)
 * @returns {undefined}
 */
export const getTenantManagePropertyData =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.TENANT_MANAGE_PROPERTY, data);
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
      type: STORE_TENANT_MANAGE_PROPERTY,
      payload: responseData,
    });
  };

/**
 * [POST REQUEST]
 * Stores Tenant Requests Received table data -
 * tenantRequestReceivedDataList: state.tenantRentPayment.tenantRequestReceivedDataList,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.ClientId - Encrypted Client Id (MANDATORY)
 * @param {string} data.UserId - Decrytped User Id (MANDATORY)
 * @returns {undefined}
 */
export const getTenantRequestReceived =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(config.TENANT_REQUEST_RECEIVED, data);
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
      type: STORE_TENANT_REQUEST_RECEIVED,
      payload: responseData,
    });
  };

/**
 * [POST REQUEST]
 * TO Approve, reject a particular request -
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.CollectionIds - Encrypted CldId (MANDATORY)
 * @param {string} data.AprovalAction - "Approve"-for Approval, "Reject"-for rejection (Hardcoded) (MANDATORY)
 * @param {string} data.Remarks - ( case: reject ) (MANDATORY)
 * @param {string} data.PaymateMode - Pay From - Credit Card / Online Payment ( case: approve ) (MANDATORY)
 * @param {string} data.RemittorAccountID - Encrypted Pay Through ( case: approve ) (MANDATORY)
 * @param {boolean} data.RecurringConsent - Checkbox (True if checked) ( case: approve ) (MANDATORY)
 * @param {number} data.status -  1-Accept, 2-Reject, 0-Delete (MANDATORY)
 * @returns {undefined}
 */
export const approveRejectTenantPayment =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.APPROVE_REJECT_TENANT_PAYMENT,
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
      type: 'RESET_REMARK_PROMPT_DATA',
    });
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
  };

/**
 * [POST REQUEST]
 * Stores Tenant Track Rent Collection table data -
 * tenantTrackRentCollectionDataList: state.tenantRentPayment.tenantTrackRentCollectionDataList,
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.ClientId - Encrypted Client Id (MANDATORY)
 * @param {string} data.UserId - Decrytped User Id (MANDATORY)
 * @param {string} data.CldId - (for View Action) (MANDATORY)
 * @returns {undefined}
 */
export const getTenantTrackRentCollection =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.TENANT_TRACK_RENT_COLLECTION,
        data
      );
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
      type: STORE_TENANT_TRACK_RENT_COLLECTION,
      payload: responseData,
    });
  };

export const clearTenantRentData = () => (dispatch, getState) => {
  dispatch({
    type: 'CLEAR_TENANT_PAYMENTS_TABLE_DATA',
  });
};

/**
 * To Open The Approve Modal
 * openApproveDialog: state.tenantRentPayment.openApproveRentRequestDialog,
 *
 * @param {}
 * @returns {undefined}
 */
export const openApproveDialog_new = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'OPEN_APPROVE_RENT_REQUEST_DIALOG',
  });
};
/**
 * To Close The Approve Modal
 *
 * @param {}
 * @returns {undefined}
 */
export const closeApproveDialog_new = () => async (dispatch, getState) => {
  dispatch({
    type: 'CLOSE_APPROVE_RENT_REQUEST_DIALOG',
  });
};
