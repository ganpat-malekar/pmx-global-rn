import {
  OTP_SENT,
  OTP_VERIFIED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOADING,
  LOADED,
} from './types';
import axios from 'axios';
import { config } from '@paymate/common/config';
import { showAlert } from './UIActions';
import { errorAlertHandler } from '@paymate/common/helpers';
import { signOut } from './adminActions';
import _ from 'underscore';
import api from '@paymate/common/apimiddleware';

// export const getOtp = (email, ip, resend) => async (dispatch) => {
//   dispatch({
//     type: LOADING,
//   });
//   axios(
//     config.DOMAIN + resend
//       ? config.API_GENERATE_OTP
//       : config.API_RE_GENERATE_OTP,
//     {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         IpAddress: ip,
//       },
//       data: {
//         Email: email,
//         OtpSource: email,
//         OtpType: 'Email', // "OtpType": 1,
//         UserType: 'B',
//       },
//     }
//   )
//     .then((response) => {
//       const { Status, strResponse } = response.data;
//       if (Status === true) {
//         dispatch(setOtpSent(true));
//         dispatch(
//           showAlert({
//             type: 'success',
//             message: strResponse,
//           })
//         );
//         dispatch({
//           type: LOADED,
//         });
//       } else {
//         dispatch({
//           type: LOADED,
//         });
//         dispatch(
//           showAlert({
//             type: 'danger',
//             message: strResponse,
//           })
//         );
//       }
//     })
//     .catch((error) => {
//       dispatch({
//         type: LOADED,
//       });
//       errorAlertHandler(error, dispatch);
//     });
// };

/**
 * [POST REQUEST]
 *  Gets the OTP for forget password -
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.email - username  (Mandatory)
 * @param {boolean} data.resend -  if the user wants to resend the OTP  (Optional)
 * @returns {undefined}
 */
export const getOtp = (email) => async (dispatch, getState) => {
  let responseData = null;

  const data = {
    Email: email,
    OtpSource: email,
    OtpType: 'Email', // "OtpType": 1,
    UserType: 'B',
  };

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(
      // NOTE: no need to call the "regenerate otp api" as we dont see that button in the UI
      // resend ? config.API_GENERATE_OTP : config.API_RE_GENERATE_OTP,
      config.API_GENERATE_OTP,
      data
    );
    responseData = response.data;
  } catch (error) {
    dispatch({
      type: LOADED,
    });
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

  const { Status, StatusCode, Description, strResponse } = responseData;

  // if (StatusCode !== '000') {
  //   dispatch(
  //     showAlert({
  //       type: 'danger',
  //       message: Description || 'Something went wrong',
  //     })
  //   );
  //   return;
  // }

  if (Status === true) {
    dispatch(setOtpSent(true));
    dispatch(
      showAlert({
        type: 'success',
        message: strResponse,
      })
    );
    dispatch({
      type: LOADED,
    });
  } else {
    dispatch({
      type: LOADED,
    });
    dispatch(
      showAlert({
        type: 'danger',
        message: strResponse,
      })
    );
  }
};

export const setOtpSent = (status) => (dispatch) => {
  dispatch({
    type: OTP_SENT,
    status,
  });
};

// export const validateOtp = (data, ip) => async (dispatch) => {
//   axios(config.DOMAIN + config.API_VALIDATE_OTP, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       IpAddress: ip,
//     },
//     data,
//   })
//     .then((response) => {
//       const { Status, Description } = response.data;
//       if (Status === true) {
//         dispatch(setOtpVerified(true));
//         dispatch(
//           showAlert({
//             type: 'success',
//             message: Description,
//           })
//         );
//       } else {
//         dispatch(
//           showAlert({
//             type: 'danger',
//             message: Description,
//           })
//         );
//       }
//     })
//     .catch((error) => {
//       errorAlertHandler(error, dispatch);
//     });
// };

/**
 * [POST REQUEST]
 *  Gets the OTP for forget password -
 *
 * @param {Object} data - payload, empty object (MANDATORY)
 * @param {string} data.EmailOtp - username  (Mandatory)
 * @param {boolean} data.Status -  if the user wants to resend the OTP  (Optional)
 * @param {boolean} data.Email -  if the user wants to resend the OTP  (Optional)
 * @returns {undefined}
 */
export const validateOtp = (data, resend) => async (dispatch, getState) => {
  let responseData = null;
  console.log(data);
  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.API_VALIDATE_OTP, data);
    responseData = response.data;
  } catch (error) {
    dispatch({
      type: LOADED,
    });
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

  console.log(responseData);
  if (StatusCode !== '000') {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return;
  }

  if (Status === true) {
    dispatch(setOtpVerified(true));
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
  } else {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description,
      })
    );
  }
};

export const setOtpVerified = (status) => (dispatch) => {
  dispatch({
    type: OTP_VERIFIED,
    status,
  });
};

// export const changePassword = (data) => async (dispatch, getState) => {
//   dispatch({ type: LOADING });
//   const { token, isAuthenticated, userIpAddress } = getState().admin;
//   const headers = {
//     'content-type': 'application/json',
//     IpAddress: userIpAddress,
//     ServiceType: 'Web',
//   };

//   if (isAuthenticated && token !== '') {
//     headers.AuthToken = token;
//   }

//   axios(
//     config.DOMAIN +
//       (isAuthenticated
//         ? config.API_CHANGE_EXPIRED_PASSWORD
//         : config.API_CHANGE_PASSWORD),
//     {
//       method: 'POST',
//       headers,
//       data,
//     }
//   )
//     .then((response) => {
//       const { Status, Description } = response.data;
//       if (Status === true) {
//         dispatch(setPasswordChanged(true));
//         dispatch({ type: LOADED });
//         dispatch(
//           showAlert({
//             type: 'success',
//             message: Description,
//           })
//         );
//         dispatch({
//           type: LOGOUT_SUCCESS,
//         });
//       } else {
//         dispatch({ type: LOADED });
//         dispatch(
//           showAlert({
//             type: 'danger',
//             message: Description,
//           })
//         );
//       }
//     })
//     .catch((error) => {
//       errorAlertHandler(error, dispatch);
//     });
// };

export const changePassword = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });

  const { isAuthenticated } = getState().admin;

  try {
    const response = await api.post(
      isAuthenticated
        ? config.API_CHANGE_EXPIRED_PASSWORD //change password -- change password page
        : config.API_CHANGE_PASSWORD, //post otp -- new password page
      data
    );
    responseData = response.data;
  } catch (error) {
    dispatch({ type: LOADED });
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

  const { Status, Description } = responseData;

  if (Status) {
    isAuthenticated ? dispatch(signOut()) : dispatch(setPasswordChanged(true));

    dispatch({ type: LOADED });

    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
  } else {
    dispatch({ type: LOADED });
    dispatch(
      showAlert({
        type: 'danger',
        message: Description,
      })
    );
  }
};

export const setPasswordChanged = (status) => (dispatch) => {
  dispatch({
    type: PASSWORD_CHANGED,
    status,
  });
};

// export const extendPasswordExpiry = () => async (dispatch, getState) => {
//   // reset url to state.admin.user.RedirectUrl from Data.RedirectUrl
//   const { token, userIpAddress } = getState().admin;
//   const headers = {
//     'content-type': 'application/json',
//     IpAddress: userIpAddress,
//     ServiceType: 'Web',
//     AuthToken: token,
//   };

//   axios(config.DOMAIN + config.API_EXTEND_PASSWORD_EXPIRY, {
//     method: 'GET',
//     headers,
//   })
//     .then((response) => {
//       const { Status, Description, Data } = response.data;

//       Data.RedirectUrl = Data.RedirectUrl.replace('..', '').substring(1);

//       if (Status === true) {
//         dispatch(setPasswordChanged(true));
//         dispatch(
//           showAlert({
//             type: 'success',
//             message: Description,
//           })
//         );
//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: { Data, AuthToken: token },
//         });
//       } else {
//         dispatch(
//           showAlert({
//             type: 'danger',
//             message: Description,
//           })
//         );
//       }
//     })
//     .catch((error) => {
//       errorAlertHandler(error, dispatch);
//     });
// };

export const extendPasswordExpiry = () => async (dispatch, getState) => {
  // reset url to state.admin.user.RedirectUrl from Data.RedirectUrl

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  const { token, userIpAddress } = getState().admin;

  try {
    const response = await api.get(config.API_EXTEND_PASSWORD_EXPIRY, {
      headers: {
        'content-type': 'application/json',
        // IpAddress: userIpAddress,
        ServiceType: 'Web',
        // AuthToken: token,
      },
    });
    responseData = response.data;
  } catch (error) {
    dispatch({ type: LOADED });
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

  const { Status, Description, Data } = responseData;

  Data.RedirectUrl = Data.RedirectUrl.replace('..', '').substring(1);

  if (Status === true) {
    dispatch(setPasswordChanged(true));
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { Data, AuthToken: token },
    });
  } else {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description,
      })
    );
  }
};
