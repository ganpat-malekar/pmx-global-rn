import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { showAlert } from '../../UIActions';
import {
  STORE_BUSINESS_USER_LIST,
  STORE_BUSINESS_USER_LIST_EXPORT,
  LOADING,
  LOADED,
  STORE_ALL_BUSINESS_DEPARTMENTS_ROLES,
  SET_TABLE_REFRESH_FLAG,
  RESET_MOBILE_ACCESS_PROMPT_DATA,
} from '../../types';

export const getAllDepartmentMappedRoles =
  (CompanyId) => async (dispatch, getState) => {
    const data = {
      CompanyId,
    };

    let responseData = null;

    // dispatch({
    //   type: LOADING,
    // });
    try {
      const response = await api.post(
        config.FETCH_ALL_DEPARTMENT_MAPPED_ROLES,
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
      type: STORE_ALL_BUSINESS_DEPARTMENTS_ROLES,
      payload: { Data },
    });
  };

/**
 * Mostly used to fetch the Users
 * Stores the business user data
 * userList: state.manageBusinessUser.userList,
 *
 * Payload to fetch data for the table
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyIds - decrypted Business ID(if available) or hardcoded "-2" (MANDATORY)
 * @param {string} data.DepartmentId - encrypted DepartmentId (MANDATORY)
 * @param {string} data.RoleTypes - Hardcoded "2" (MANDATORY)
 * @param {string} data.Email - email id (OPTIONAL)
 * @param {string} data.RoleID - RoleID (OPTIONAL)
 * @param {string} data.Status - Status (OPTIONAL)
 *
 *
 * userList: state.manageBusinessUser.userList.Data,
 * Payload to fetch the Acquire or Kyc Users
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.DepartmentId - encrypted "'12','13'" -- Hardcoded (MANDATORY)
 * KycUser: DepartmentId === "13" , Acquire User: DepartmentId === "12"
 *
 * @returns {undefined}
 */
export const getUserList = (data, filename) => async (dispatch, getState) => {
  //   const data = {
  //     CompanyIds: "-2", // decryped, eg "8AA17140282B81731E71DD502EAD5343", default value "-2"
  //     DepartmentId: "", // encrypted, eg "CB00ABB27F6C653C4D3E7AA3C8FE0628"
  //     Email: "", //
  //     RoleID: "", // encryped, eg "57F96E87BF00C71FCA1864B9338B1889"
  //     RoleTypes: "2", // hardcoded
  //     Status: "", // decrypted, eg "1", Hardcode "Active", "Forceful", "Blocked", "Deactive", "Pending For Approval", "Deleted" for 1, 2, 3, 4, 5, 0 .. respectively
  //     FromRecord: "0",
  //     ToRecord: "10",
  //     PageNumber: "1",
  //     PageSize: "10",
  //   };

  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_BUSINESS_USER_DATA, data);
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

  // Finally, store in reducer
  if (filename) {
    dispatch({
      type: STORE_BUSINESS_USER_LIST_EXPORT,
      payload: { data: responseData.Data, filename },
    });
  } else {
    dispatch({
      type: STORE_BUSINESS_USER_LIST,
      payload: responseData,
    });
  }
};

// For table actions
export const manageBusinessUserConfiguration =
  (data) => async (dispatch, getState) => {
    // const data = {
    //   MUserId: "", // eg: "370756", decrypted
    //   Status: "0", // fixed
    //   StatusCode: "", // eg "ResetPassword" or "Deactive" or "Active" or "DeleteUser"
    // };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.MANAGE_USER_CONFIGURATION, data);
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
    dispatch({
      type: 'RESET_REMARK_PROMPT_DATA',
    });
  };

/**
 * [POST REQUEST]
 * TO Provide Mobile App Access to a user -
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.UserId - Decrypted UserId (MANDATORY)
 * @param {string} data.AllowAccess - "true":if checked, "false":if unchecked (MANDATORY)
 * @returns {undefined}
 */
export const manageMobileUserPermission =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.MANAGE_MOBILE_USER_PERMISSION,
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
      type: RESET_MOBILE_ACCESS_PROMPT_DATA,
    });
  };
