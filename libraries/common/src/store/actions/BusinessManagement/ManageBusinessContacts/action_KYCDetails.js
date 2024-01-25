import { LOADING, LOADED } from '../../types';
import { config } from '@paymate/common/config';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../../UIActions';
import _ from 'underscore';
import api from '@paymate/common/apimiddleware';

export const submitKYCDocumentUploadedBy =
  (ClientId, UploadedBy) => async (dispatch, getState) => {
    let responseData = null;
    const data = {
      ClientId,
      UploadedBy,
    };

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.SUBMIT_KYC_DOCUMENT_UPLOADED_BY,
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

    return true;
  };
