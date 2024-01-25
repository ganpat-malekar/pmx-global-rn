import {
  STORE_ALL_DEPARTMENTS_MAPPED_ROLES,
  STORE_MANAGE_USER_LIST,
  STORE_MANAGE_USER_LIST_EXPORT,
  LOADING,
  LOADED,
  OPEN_MANAGE_USER_STATUS_DIALOG,
  CLOSE_MANAGE_USER_STATUS_DIALOG,
  SET_TABLE_REFRESH_FLAG,
} from '../../types';
import { config } from '../../../../config';
import errorAlertHandler from '../../../../helper/errorAlertHandler';
import { showAlert } from '../../UIActions';
import _ from 'underscore';
import api from '../../../../apimiddleware';

export const getUserDepartmentsMappedRoles =
  () => async (dispatch, getState) => {
    const data = {};

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.FETCH_DEPARTMENTS_MAPPED_ROLES,
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
      type: STORE_ALL_DEPARTMENTS_MAPPED_ROLES,
      payload: { Data },
    });
  };

// for table actions
export const manageUserConfiguration = (data) => async (dispatch, getState) => {
  // const data = {
  //   MUserId: "", // From row eg "240705", decrypted
  //   StatusCode: "", // eg "ResetPassword" or "DeleteUser" or "Deactive" or "Active"
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
};

export const getUsersList = (data, filename) => async (dispatch, getState) => {
  //   const data = {
  //     CompanyIds: "1", // Have to hardcode
  //     RoleTypes: "1,3", // Have to harcode
  //     DepartmentId: "", // eg "AB08725C6E6EAB2AC7CE8C083E29D7E3", encrypted DepartmentId from dropdown
  //     RoleID: "", // eg "9013C3EFBD5E8A011283554162704013", encrypted RoleId from dropdown
  //     Status: "", // eg "2", Hardcode plaintext 1, 2, 3, 4 or 5 for Active, Forceful, Blocked, Deactive, Deleted.
  //     Email: "", // eg"keanu@yopmail.com"
  //     FromRecord: "0",
  //     ToRecord: "10", // PROBLEM IN PAGINATION: Giving 19 instead for 10
  //     PageNumber: "1",
  //     PageSize: "10",
  //   };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.GET_USER_DATA, data);
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
      type: STORE_MANAGE_USER_LIST_EXPORT,
      payload: { data: responseData.Data, filename },
    });
  } else {
    dispatch({
      type: STORE_MANAGE_USER_LIST,
      payload: responseData,
    });
  }
};

export const openManageUserStatusDialogFn =
  (data) => async (dispatch, getState) => {
    dispatch({
      type: OPEN_MANAGE_USER_STATUS_DIALOG,
      payload: data,
    });
  };

export const closeManageUserStatusDialogFn =
  () => async (dispatch, getState) => {
    dispatch({
      type: CLOSE_MANAGE_USER_STATUS_DIALOG,
    });
  };
