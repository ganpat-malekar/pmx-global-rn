import _ from 'underscore';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';

import { showAlert } from '../../UIActions';
import {
  FLUSH_EXPORT_FILES,
  GET_FILES_TO_EXPORT,
  LOADED,
  LOADING,
} from '../../types';

export const exportDataFromFilter =
  (data, filename, apiToExportData, tableName) =>
  async (dispatch, getState) => {
    let responseData = null;
    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(apiToExportData, data);
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
        type: GET_FILES_TO_EXPORT,
        payload: { data: responseData.Data, filename },
      });
    }
  };

export const onlyExportData =
  (data, filename) => async (dispatch, getState) => {
    if (filename) {
      dispatch({
        type: GET_FILES_TO_EXPORT,
        payload: { data, filename },
      });
    }
  };

export const flushDataToExport = () => async (dispatch, getState) => {
  dispatch({
    type: FLUSH_EXPORT_FILES,
  });
};
