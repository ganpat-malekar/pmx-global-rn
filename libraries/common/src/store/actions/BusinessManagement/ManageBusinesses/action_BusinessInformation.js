import {
  ADD_COUNTRIES,
  ADD_COMPANY_TYPES,
  ADD_CATEGORIES,
  ADD_SUB_CATEGORIES,
  ADD_EMIRATES,
  ADD_USERS,
  LOADING,
  LOADED,
} from '../../types';
import { config } from '../../../../config';
import axios from 'axios';
import errorAlertHandler from '../../../../helper/errorAlertHandler';
import aesEncode from '../../../../helper/aes256encoder';
import { showAlert } from '../../UIActions';
import { getAndSAveBusinessInformation } from './action_AddBusiness';
import _ from 'underscore';
import api from '../../../../apimiddleware';

export const getCountries_new = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  const data = {
    Status: true,
  };

  axios(config.DOMAIN + config.FETCH_COUNTRIES, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Data: countries } = response.data;
      dispatch({
        type: ADD_COUNTRIES,
        countries,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const getCompanyTypes = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  const data = {
    Status: true,
  };

  axios(config.DOMAIN + config.FETCH_COMPANY_TYPES, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Data: companyTypes } = response.data;
      dispatch({
        type: ADD_COMPANY_TYPES,
        companyTypes,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const getCategories = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  axios(config.DOMAIN + config.GET_CATEGORY, {
    method: 'GET',
    headers,
  })
    .then((response) => {
      const categories = response.data;
      dispatch({
        type: ADD_CATEGORIES,
        categories,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const getSubCategories = (categoryId) => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  const params = {
    categoryId,
  };
  axios(config.DOMAIN + config.GET_SUB_CATEGORY, {
    method: 'GET',
    headers,
    params,
  })
    .then((response) => {
      const subCategories = response.data;

      dispatch({
        type: ADD_SUB_CATEGORIES,
        subCategories,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const getEmirates_new = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  axios(config.DOMAIN + config.FETCH_STATE, {
    method: 'POST',
    headers,
  })
    .then((response) => {
      const { Data: emirates } = response.data;
      dispatch({
        type: ADD_EMIRATES,
        emirates,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const getUsers = () => async (dispatch, getState) => {
  const DepartmentId = aesEncode('2');
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  const data = {
    DepartmentId: DepartmentId, // "B8EB2D571FB2A28C88FFABD809CE1D4F"
  };

  axios(config.DOMAIN + config.GET_USER_DATA, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Data: users } = response.data;
      dispatch({
        type: ADD_USERS,
        users,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const submitBusinessInformation =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });

    try {
      const response = await api.post(config.BUISNESS_INTEGRATION, data);
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

    const { StatusCode, Description, BusinessIntegration } = responseData;

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

    // const payload = {
    //   EntityName: responseData.BusinessIntegration.CompanyName,
    //   // RegisteredCountry: responseData.BusinessIntegration.CountryName,
    //   RegisteredCountry: "UNITED ARAB EMIRATES",
    //   EntityType: "2", // hardcoded, 2 meanS "ORGANIZATION"
    //   CrId: decryptAES(responseData.BusinessIntegration.Crid),
    // };

    // await dispatch(
    //   saveAMLScreeningDetails(payload, "ADD_BUSINESS_INFORMATION")
    // );

    // FIXME: This will still be dispatched even if any api calls fail in the above dispatched chain of function
    dispatch(
      getAndSAveBusinessInformation(responseData.BusinessIntegration.CompanyId)
    );

    return BusinessIntegration.CompanyId;
  };

// export const getAllDropDowns = () => async (dispatch, getState) => {
//     const { token, userIpAddress } = getState().admin;
//     const headers = {
//         "content-type": "application/json",
//         IpAddress: userIpAddress,
//         ServiceType: "Web",
//         AuthToken: token
//     };
//     const data = {
//         Status: true
//     }
//     try {
//         await axios(
//             config.DOMAIN + config.FETCH_COUNTRIES,
//             {
//                 method: "POST",
//                 headers,
//                 data,
//             }
//         ).data
//         await axios(
//             config.DOMAIN + config.FETCH_COMPANY_TYPES,
//             {
//                 method: "POST",
//                 headers,
//                 data,
//             }
//         )
//     } catch (error) {
//         errorAlertHandler(error, dispatch);
//     }
// }
