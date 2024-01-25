import { LOADED, LOADING } from '../types';
import { config } from '@paymate/common/config';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../UIActions';
import _ from 'underscore';
import api from '@paymate/common/apimiddleware';

export const saveAMLScreeningDetails =
  (data, purpose) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.SAVE_AML_DETAILS, data);
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
          message:
            Description ||
            'Something went wrong while saving AML screening details',
        })
      );
      return;
    }

    // Finally
    // Do nothing
  };
