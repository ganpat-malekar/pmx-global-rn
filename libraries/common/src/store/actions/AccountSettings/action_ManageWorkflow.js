import _ from 'underscore';

import errorAlertHandler from '../../../helper/errorAlertHandler';

import api from '../../../apimiddleware';
import { config } from '../../../config';

import { showAlert } from '../UIActions';
import { LOADING, LOADED } from '../types';
import {
  STORE_APPROVAL_WORKFLOW_LIST,
  STORE_LIST_LIMIT_WORKFLOW,
  SET_TABLE_REFRESH_FLAG,
  STORE_WORKFLOW_PAYMENT_TYPES,
  STORE_BIND_LIMITS,
  STORE_BIND_USER_ROLES,
  SAVE_EDIT_LIMIT_WORKFLOW,
} from '../types';

/**
 * [GET request]
 * A request fetch the Manage Workflow List
 * workflowList: state.workflowList.workflowList,
 *
 * @param {}  - No Payload Required
 * @returns {undefined}
 */
export const getApprovalWorkflowList = () => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.get(config.FETCH_APPROVAL_WORKFLOW_LIST);
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

  //   commented as the "StatusCode" is coming as null
  //   const { StatusCode, Description } = responseData;

  //   if (StatusCode !== "000") {
  //     dispatch(
  //       showAlert({
  //         type: "danger",
  //         message: Description || "Something went wrong",
  //       })
  //     );
  //     return;
  //   }

  // Finally, store in reducer
  dispatch({
    type: STORE_APPROVAL_WORKFLOW_LIST,
    payload: responseData,
  });
};

/**
 * [POST request]
 * A request fetch data for the View Modal
 * listLimitWorkflow: state.workflowList.listLimitWorkflow,
 *
 * @param {Object} data - Mandatory
 * @param {string} data.LimitId - LimitId of the Record (Mandatory)
 * @param {string} data.PaymentTypeID - PaymentTypeId of the Record (Mandatory)
 * @returns {undefined}
 */
export const getListLimitWorkflow = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_LIST_LIMIT_WORKFLOW, data);
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
    type: STORE_LIST_LIMIT_WORKFLOW,
    payload: responseData,
  });
};

export const flushManageWorkflowEditData = () => async (dispatch, getState) => {
  dispatch({ type: 'FLUSH_LIST_LIMIT_WORKFLOW_DATA' });
};

/**
 * [POST request]
 * A request fetch data for the View Modal
 * listLimitWorkflow: state.workflowList.listLimitWorkflow,
 *
 * @param {Object} data - Mandatory
 * @param {string} data.Status - Hardcoded: 0-Delete, 1-Approve (Mandatory)
 * @param {string} data.LimitId - LimitId of the Record (Mandatory)
 * @param {string} data.PaymentTypeID - PaymentTypeId of the Record (Mandatory)
 * @returns {undefined}
 */
export const getApprovalWorkflowLimitConfiguration =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_APPROVAL_WORKFLOW_LIMIT_CONFIGURATION,
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
    dispatch({
      type: 'RESET_CONFIRM_PROMPT_DATA',
    });
  };

/**
 * [GET request]
 * A request fetch data for the Payment Types Dropdown
 * workflowPaymentTypesList: state.workflowList.workflowPaymentTypesList,
 *
 * @param {Object} params
 * @param {string} params.companyId - Plaintext, get from tokenData
 * @returns {undefined}
 */
export const getWorkflowPaymentTypes =
  (params) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.get(config.FETCH_WORKFLOW_PAYMENT_TYPES, {
        params,
      });
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
      dispatch({
        type: LOADED,
      });
    }

    let data = [];

    if (_.isArray(responseData) && !_.isEmpty(responseData)) {
      data = responseData;
    }

    // Finally, store in reducer
    dispatch({
      type: STORE_WORKFLOW_PAYMENT_TYPES,
      payload: data,
    });
  };

/**
 * [POST request]
 * A request fetch data for the Limits Dropdown
 * bindLimitsList: state.workflowList.bindLimitsList,
 *
 * @param {Object} data - Mandatory
 * @param {string} data.LimitId - LimitId of the Record (Mandatory)
 * @param {string} data.PaymentTypeID - PaymentTypeId of the Record (Mandatory)
 * @returns {undefined}
 */
export const getBindLimits = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_BIND_LIMITS, data);
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
    type: STORE_BIND_LIMITS,
    payload: responseData,
  });
};

export const flushLimitsDropdown = () => async (dispatch, getState) => {
  dispatch({ type: 'FLUSH_BIND_LIMITS' });
};

/**
 * [POST request]
 * A request fetch data for the BIND USER ROLES Dropdown
 * bindUserRolesList: state.workflowList.bindUserRolesList,
 *
 * @param {Object} data - Mandatory
 * @param {string} data.LimitId - LimitId of the Record (Mandatory)
 * @param {string} data.PaymentTypeID - Hardcoded: null (Mandatory)
 * @returns {undefined}
 */
export const getBindUserRoles = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.FETCH_BIND_USER_ROLES, data);
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
  // TODO: Getting StatusCode as null, even though the Status is true and data is available. Asked Krunal to fix it.
  // Uncomment, once fixed
  // if (StatusCode !== "000") {
  //   dispatch(
  //     showAlert({
  //       type: "danger",
  //       message: Description || "Something went wrong",
  //     })
  //   );
  //   return;
  // }

  // Finally, store in reducer
  dispatch({
    type: STORE_BIND_USER_ROLES,
    payload: responseData,
  });
};

/**
 * [POST request]
 * A request to Save and Edit the Data
 * bindUserRolesList: state.workflowList.bindUserRolesList,
 *
 * @param {Object} data - Mandatory
 * @param {string} data.LimitId - LimitId of the Record (Mandatory)
 * @param {string} data.PaymentTypeID - PaymentTypeID of the Record  (Mandatory)
 * @param {string} data.WorkflowID - WorkflowID of the Record  (Mandatory)
 * @param {string} data.MakerIds - MakerIds of the Record  (Mandatory)
 * @param {string} data.PayerIds - PayerIds of the Record (Mandatory)
 * @param {string} data.MakerWorkflowId - MakerWorkflowId of the Record (Mandatory)
 * @param {string} data.PayerWorkflowId - PayerWorkflowId of the Record(Mandatory)
 * @param {Object} data.ApproverList - Array Of Objects (Mandatory)
 * The Object will contain key value pairs as following
 * {
     "Levels": 1,
     "UserName": "Asus Higher Approver",
     "UserIds": "F2522878DF53B3BE7DAD3D5C2CA92D1F",
     "WorkflowID": "CDD03340870336BB962306B325FAA928",
     "MinimumApprover": 1,
     "Status": 0,
     "IsProcess": 0
    }
 * @returns {undefined}
 */
// the following API is to be checked, and its flow of events is also to be checked
export const saveLimitWorkflow = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SAVE_LIMIT_WORKFLOW, data);
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

/**
 * Used when deleting approver row while editing design workflow
 *
 * @param {Object} data
 * @param {number} data.Levels - from rowData
 * @param {string} data.UserName - from rowData (comma separated string)
 * @param {string} data.UserIds - from rowData (comma separated encrypted string ids)
 * @param {string} data.WorkflowID - from rowData (MANDATORY) (encrypted string id)
 * @param {number} data.MinimumApprover - from rowData
 * @param {number} data.Status - from rowData (hardcoded 0)
 * @param {number} data.IsProcess - from rowData
 * @returns {boolean}
 */
export const deleteApproverRecord = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.CHANGE_APPROVER_DATA, data);
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
  return true;
};
