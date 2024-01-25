import {
  LOADING,
  LOADED,
  STORE_INCIDENTS_EXPORT,
  STORE_INCIDENTS,
  STORE_EVENT_LOGS_EXPORT,
  STORE_EVENT_LOGS,
  GET_INCIDENT_INFORMATION,
  OPEN_VIEW_INCIDENT_DIALOG,
  CLOSE_VIEW_INCIDENT_DIALOG,
} from '../types';
import { config } from '../../../config';
import errorAlertHandler from '../../../helper/errorAlertHandler';
import { showAlert } from '../UIActions';
import _ from 'underscore';
import api from '../../../apimiddleware';
import axios from 'axios';

export const getManageIncidentList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   Module: "", // eg "7822DB5A03A9F7B910CE8C7417ABDEDE", send encrypted id from the api /CommonManagement/FetchSystemModules
    //   Status: "", // eg "7822DB5A03A9F7B910CE8C7417ABDEDE", send encrypted value. Hardcode 1, 2, 3, 4, 5 as "Pending", "In-Progress", "Resolved", "Invalid", "Closed" for the drop down.
    //   Type: "", // eg "7822DB5A03A9F7B910CE8C7417ABDEDE", send encrypted value. Hardcode 1, 2 as "Manual", "Automated" for the drop down
    //   FromDate: "", // eg "01/04/2022",
    //   ToDate: "", // eg "06/05/2022",
    //   FromRecord: "0",
    //   ToRecord: "10",
    //   PageNumber: "1",
    //   PageSize: "10",
    // };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_INCIDENTS, data);
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
      // check this logic, we are doing this just for time being
      dispatch({
        type: STORE_INCIDENTS,
        payload: responseData,
      });
      return;
    }

    // Finally, store in reducer
    if (filename) {
      dispatch({
        type: STORE_INCIDENTS_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_INCIDENTS,
        payload: responseData,
      });
    }
  };

export const getEventLogList =
  (data, filename) => async (dispatch, getState) => {
    // const data = {
    //   Module: "", // eg "EACC7DE4F0A63CCF2DBF777E86F55396", Encrypted text "Account". Use api CommonManagement/FetchSystemModules for text values dropdown (don't use id)
    //   Status: "", // eg "C6AE5F444D1E28B37044E0A2E202FB4B", Encrypted text "success", "failed". Hardercode in the dropdown
    //   UserName: "", // eg "oyo.fn.admin@yopmail.com" For email id
    //   FromDate: "", // eg "13/04/2022",
    //   ToDate: "", // eg  "09/05/2022",
    //   FromRecord: "0",
    //   ToRecord: "10",
    //   PageNumber: "1",
    //   PageSize: "10",
    // };

    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.FETCH_EVENT_LOGS, data);
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
        type: STORE_EVENT_LOGS_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    } else {
      dispatch({
        type: STORE_EVENT_LOGS,
        payload: responseData,
      });
    }
  };

export const openViewIncidentDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_VIEW_INCIDENT_DIALOG,
  });
};

export const closeViewIncidentDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VIEW_INCIDENT_DIALOG,
  });
};
