import { config } from '@paymate/common/config';
import axios from 'axios';
import { errorAlertHandler } from '@paymate/common/helpers';
import { showAlert } from '../../UIActions';

export const sendAMLScreeningDetails = (data) => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  return axios(config.DOMAIN + config.SAVE_AML_DETAILS, {
    method: 'POST',
    headers,
    data,
  })
    .then(async (response) => {
      const { Status, Description, Data } = response.data;
      const { AMLId, TaskId } = Data;

      // If needed then save Data into a reducer
      return { AMLId, TaskId };
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const sendDataToAMLApi = (data) => async (dispatch, getState) => {
  const headers = {
    Accept: 'application/json charset=utf-8',
    ClientAuthCode: config.AMLClientAuthCode,
  };

  axios(config.AMLAPIUrl, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { statuscode, statusdesc } = response.data;

      if (statuscode === 'D001') {
        dispatch(
          showAlert({
            type: 'danger',
            message: statusdesc,
          })
        );
      } else {
        // dispatch(showAlert({
        //     type: 'success',
        //     message: Description
        // }));
      }
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};
