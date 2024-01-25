import axios from 'axios';
import _ from 'underscore';

import { errorAlertHandler, aesEncode } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

import { getAndSAveBusinessInformation } from '../ManageBusinesses/action_AddBusiness';
import { showAlert } from '../../UIActions';
import {
  MANAGE_BUSINESS_DATATABLE,
  GET_SALES_REPRESENTATIVE,
  OPEN_VIEW_BUSINESS_DIALOG,
  CLOSE_VIEW_BUSINESS_DIALOG,
  GET_BUSINESS_INFORMATION,
  CLEAR_BUSINESS_INFORMATION,
  APPROVE_BUSINESS_INFORMATION,
  APPROVE_TRANSACTION_CURRENCY,
  APPROVE_BUSINESS_SUBSCRIPTION_DETAILS,
  APPROVE_TRANSACTION_CHARGES_DETAILS,
  APPROVE_SETTLEMENT_CHARGES_DETAILS,
  ACTIVATE_BUSINESS,
  DELETE_BUSINESS,
  DEACTIVATE_BUSINESS,
  ASSIGN_TO_SALES_TEAM,
  OPEN_COMPANY_STATUS_DIALOG,
  CLOSE_COMPANY_STATUS_DIALOG,
  GET_BUSINESS_CONFIGURATIONS_TO_EXPORT,
  FLUSH_BUSINESS_CONFIGURATIONS_TO_EXPORT,
  LOADED,
  LOADING,
  OPEN_KYC_VERIFICATION_DIALOG,
  CLOSE_KYC_VERIFICATION_DIALOG,
  FETCH_KYC_DOCUMENT_DETAILS,
  FETCH_KYC_SINGLE_DOCUMENT_DETAILS,
  FLUSH_KYC_SINGLE_DOCUMENT_DETAILS,
  FETCH_AML_PROFILES,
  OPEN_AML_PROFILES_DIALOG,
  CLOSE_AML_PROFILES_DIALOG,
  CLOSE_AML_REMARK_DIALOG,
  OPEN_AML_REMARK_DIALOG,
  RESOLVE_AML_PROFILES,
  SUBMIT_AML_PROFILE_FEEDBACK,
  UPDATE_KYC_DOCUMENT_STATUS,
  RESET_API_STATUS,
  SET_TABLE_REFRESH_FLAG,
  OPEN_CHARGED_SETTINGS_DIALOG,
  CLOSE_CHARGED_SETTINGS_DIALOG,
} from '../../types';

export const getBusinessConfigurationsToExport =
  (data, filename) => async (dispatch, getState) => {
    dispatch({
      type: LOADING,
    });
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    axios(config.DOMAIN + config.FETCH_MANAGE_BUSINESS_CONFIGURATIONS, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        dispatch({
          type: GET_BUSINESS_CONFIGURATIONS_TO_EXPORT,
          payload: { data: response.data.Data, filename: filename },
        });
        dispatch({
          type: LOADED,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const getBusinessConfigurations =
  (data) => async (dispatch, getState) => {
    dispatch({
      type: RESET_API_STATUS,
    });
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    axios(config.DOMAIN + config.FETCH_MANAGE_BUSINESS_CONFIGURATIONS, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        dispatch({
          type: MANAGE_BUSINESS_DATATABLE,
          payload: response.data,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const getUsersOfDepartmentAndRole =
  (data) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    axios(config.DOMAIN + config.FETCH_SALES_REPRESENTATIVE_DROPDOWN, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        const { Data: Data } = response.data;
        dispatch({
          type: GET_SALES_REPRESENTATIVE,
          Data,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const fetchBusinessInformationForView =
  (data, viewOnly) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    axios(config.DOMAIN + config.FETCH_BUSINESS_INFORMATION, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        dispatch({
          type: GET_BUSINESS_INFORMATION,
          payload: { data: response.data, viewOnly: viewOnly },
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const ApproveBusinessInformation =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.APPROVE_BUSINESS_INFORMATION,
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

    // Finally
    dispatch(
      fetchBusinessInformationForView({ companyId: data.CompanyId }, false)
    );
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };

export const ApproveTransactionCurrency =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.APPROVE_TRANSACTION_CURRENCY,
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

    // Finally
    dispatch(
      fetchBusinessInformationForView({ companyId: data.CompanyId }, false)
    );
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };

export const ApproveBusinessSubscriptionDetails =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.APPROVE_BUSINESS_SUBSCRIPTION_DETAILS,
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

    // Finally
    dispatch(
      fetchBusinessInformationForView({ companyId: data.CompanyID }, false)
    );
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };

export const UpdateVendorSubscriptionStatus =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.UPDATE_VENDOR_SUBSCRIPTION_STATUS,
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

    // Finally
    dispatch(
      fetchBusinessInformationForView({ companyId: data.CompanyID }, false)
    );
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };

export const ApproveTransactionChargesDetails =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.APPROVE_TRANSACTION_CHARGES_DETAILS,
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

    // Finally
    dispatch(
      fetchBusinessInformationForView({ companyId: data.CompanyId }, false)
    );
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    return true;
  };

export const ApproveSettlementChargesDetails =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.APPROVE_SETTLEMENT_CHARGES_DETAILS,
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

    // Finally
    dispatch(
      fetchBusinessInformationForView({ companyId: data.CompanyId }, false)
    );
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });

    return true;
  };

export const ActivateBusiness = (data) => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };

  axios(config.DOMAIN + config.ACTIVATE_BUSINESS, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      console.log(response.data);
      if (response.data.Status) {
        dispatch({
          type: ACTIVATE_BUSINESS,
        });
        dispatch(
          showAlert({
            type: 'success',
            message: response.data.Description,
          })
        );
        dispatch({
          type: SET_TABLE_REFRESH_FLAG,
        });
      } else {
        dispatch(
          showAlert({
            type: 'danger',
            message: response.data.Description,
          })
        );
      }
    })
    .catch((error) => {
      console.log(error);
      errorAlertHandler(error, dispatch);
    });
};

export const AssignToSalesTeam = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.ASSIGN_TO_SALES_TEAM, data);
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

  // Finally
  dispatch({
    type: 'RESET_SELECT_PROMPT_DATA',
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
  dispatch(
    showAlert({
      type: 'success',
      message: Description,
    })
  );
};

// For table actions
export const updateCompanyStatus = (data) => async (dispatch, getState) => {
  // const data = {
  //   CompanyId: "", // AES256 encrypted
  //   Status: "0", // This API is used to Delete(Status = 0), Approve(Status = 4) or Deactivate(Status = 2) the Business
  //   Remarks: "",
  // };

  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.UPDATE_COMPANY_STATUS, data);
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
    type: 'RESET_CONFIRM_PROMPT_DATA',
  });
  dispatch({
    type: 'RESET_REMARK_PROMPT_DATA',
  });
  dispatch({
    type: SET_TABLE_REFRESH_FLAG,
  });
};

/**
 * Returns Status of the Record
 *
 * @param {Object} data - payload, (MANDATORY)
 * @param {string} data.CompanyId - Encrypted, CompanyId from of the selected record (MANDATORY)
 * @param {string} data.status - Hardcoded, 1: Approve & 2: Reject (MANDATORY)
 * @returns {undefined}
 */
export const updateChargedSettingStatus =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.UPDATE_CHARGED_SETTING_STATUS,
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

    // Finally
    dispatch(closeChargedSettingsDialogFn());
    dispatch({
      type: SET_TABLE_REFRESH_FLAG,
    });
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
  };

export const getKycDocumentDetails = (data) => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  });
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };

  axios(config.DOMAIN + config.FETCH_KYC_DOCUMENT_DETAILS_DISPLAY, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: FETCH_KYC_DOCUMENT_DETAILS,
        payload: response.data,
        session_crid: data.Crid,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOADED,
      });
      errorAlertHandler(error, dispatch);
    });
};

export const getKycDocumentCompleteDetails =
  (data) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    axios(config.DOMAIN + config.FETCH_KYC_SINGLE_DOCUMENT_DETAILS, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: FETCH_KYC_SINGLE_DOCUMENT_DETAILS,
          payload: response.data,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const getAmlProfiles = (data) => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    Accept: 'application/json charset=utf-8',
    ClientAuthCode: '4DD02771-CAB6-4C24-9227-B9AAF255145C',
  };

  axios(
    'https://dev.paymate.in/Beta/AMLManagementService/api/WC1/CaseProfileRequest',
    {
      method: 'POST',
      headers,
      data,
    }
  )
    .then((response) => {
      console.log(response.data);
      if (response.data.statuscode === '000') {
        dispatch({
          type: FETCH_AML_PROFILES,
          payload: response.data,
        });
      } else {
        dispatch({
          type: FETCH_AML_PROFILES,
          payload: { ...response.data, caseid: data.CaseId },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      errorAlertHandler(error, dispatch);
    });
};

export const approveAmlProfiles =
  (data1, data2) => async (dispatch, getState) => {
    dispatch({
      type: LOADING,
    });
    const { token, userIpAddress } = getState().admin;
    console.log(data1, data2);
    const headers = {
      Accept: 'application/json charset=utf-8',
      ClientAuthCode: '4DD02771-CAB6-4C24-9227-B9AAF255145C',
    };

    axios(
      'https://dev.paymate.in/Beta/AMLManagementService/api/WC1/ResolveResultRequest',
      {
        method: 'POST',
        headers,
        data: data1,
      }
    )
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: LOADED,
        });
        if (response.data.statuscode === '000') {
          dispatch({
            type: RESOLVE_AML_PROFILES,
          });
          dispatch(submitAmlProfileFeedback(data2));
        } else {
          dispatch(
            showAlert({
              type: 'danger',
              message: response.data.statusdesc,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED,
        });
        errorAlertHandler(error, dispatch);
      });
  };

export const submitAmlProfileFeedback =
  (data) => async (dispatch, getState) => {
    dispatch({
      type: LOADING,
    });
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
      ClientAuthCode: '4DD02771-CAB6-4C24-9227-B9AAF255145C',
    };

    axios(config.DOMAIN + '/CommonManagement/UpdateAMLCaseProfileDetails', {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: LOADED,
        });
        if (response.data.Status) {
          dispatch({
            type: SUBMIT_AML_PROFILE_FEEDBACK,
          });
          dispatch(
            showAlert({
              type: 'success',
              message: response.data.Description,
            })
          );
          dispatch(
            getKycDocumentDetails({
              Crid: data.CrId,
            })
          );
        } else {
          dispatch(
            showAlert({
              type: 'danger',
              message: response.data.Description,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED,
        });
        errorAlertHandler(error, dispatch);
      });
  };

export const submitAmlScreeningDetails =
  (data) => async (dispatch, getState) => {
    dispatch({
      type: LOADING,
    });
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
      ClientAuthCode: '4DD02771-CAB6-4C24-9227-B9AAF255145C',
    };

    axios(config.DOMAIN + '/CommonManagement/UpdateAMLScreeningDetails', {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: LOADED,
        });
        if (response.data.Status) {
          dispatch({
            type: SUBMIT_AML_PROFILE_FEEDBACK,
          });
          dispatch(
            showAlert({
              type: 'success',
              message: response.data.Description,
            })
          );
          dispatch(
            getKycDocumentDetails({
              Crid: data.CrId,
            })
          );
        } else {
          dispatch(
            showAlert({
              type: 'danger',
              message: response.data.Description,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADED,
        });
        errorAlertHandler(error, dispatch);
      });
  };

export const updateDocumentStatus = (data) => async (dispatch, getState) => {
  console.log(data);
  dispatch({
    type: LOADING,
  });
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };

  axios(config.DOMAIN + '/KycManagement/UpdateKycDocumentDetailStatus', {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOADED,
      });
      if (response.data.Status) {
        dispatch({
          type: UPDATE_KYC_DOCUMENT_STATUS,
        });
        dispatch(
          showAlert({
            type: 'success',
            message: response.data.Description,
          })
        );
        dispatch(
          getKycDocumentDetails({
            Crid: getState().ManageBusiness.session_crid,
          })
        );
      } else {
        dispatch(
          showAlert({
            type: 'danger',
            message: response.data.Description,
          })
        );
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: LOADED,
      });
      errorAlertHandler(error, dispatch);
    });
};

/**
 * [POST request]
 * Assign the Business to the KYC Team To Activate the Business
 * radioPromptData: state.radioPrompt,
 *
 * in case of Self Kyc
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Encrypted CompanyId (MANDATORY)
 * @param {string} data.Crid - Encrypted Crid (MANDATORY)
 * @param {number} data.AssignTo - value of the Radio Button Selected (MANDATORY)
 *
 * AssignTo Hardcoded Value
        KycTeamVerify = 1,
        SelfVerify = 2

 * in case of Assign To Kyc
 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Encrypted CompanyId (MANDATORY)
 * @param {string} data.Crid - Encrypted Crid (MANDATORY)
 * @param {string} data.AssignTo - value of the Radio Button Selected (MANDATORY)
 * @param {string} data.ClientId -  Encrypted ClientId (MANDATORY)
 * @param {string} data.KycUserId - Encrypted MUserId of the KYC User(MANDATORY)
 * @param {string} data.KycUserName - plainText -- Contact Name of the KYC User(MANDATORY)
 * @param {string} data.AcquiringUserId - Encrypted MUserId of the Acquire User(MANDATORY)
 * @param {string} data.Type - Hardcoded "vendor" (MANDATORY)
 *
 * @returns {undefined}
 */
export const AssignToKycTeam = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.ASSIGN_TO_KYC_TEAM, data);
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

  // Finally
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
    type: 'RESET_RADIO_PROMPT_DATA',
  });
};

export const flushExportData = () => async (dispatch, getState) => {
  dispatch({
    type: FLUSH_BUSINESS_CONFIGURATIONS_TO_EXPORT,
  });
};

export const openCompanyStatusDialogFn =
  (data) => async (dispatch, getState) => {
    dispatch({
      type: OPEN_COMPANY_STATUS_DIALOG,
      payload: data,
    });
  };

export const closeCompanyStatusDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_COMPANY_STATUS_DIALOG,
  });
};

export const openViewBusinessDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_VIEW_BUSINESS_DIALOG,
  });
};

export const closeViewBusinessDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VIEW_BUSINESS_DIALOG,
  });
};

export const openKycVerificationDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_KYC_VERIFICATION_DIALOG,
  });
};

export const closeKycVerificationDialogFn =
  () => async (dispatch, getState) => {
    dispatch({
      type: CLOSE_KYC_VERIFICATION_DIALOG,
    });
  };

export const openAmlProfilesDialogFn =
  (viewOnly) => async (dispatch, getState) => {
    dispatch({
      type: OPEN_AML_PROFILES_DIALOG,
      payload: viewOnly,
    });
  };

export const closeAmlProfilesDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_AML_PROFILES_DIALOG,
  });
};

export const openAmlRemarkDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_AML_REMARK_DIALOG,
  });
};

export const closeAmlRemarkDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_AML_REMARK_DIALOG,
  });
};

export const flushKycSingleDocumentData = () => async (dispatch, getState) => {
  dispatch({
    type: FLUSH_KYC_SINGLE_DOCUMENT_DETAILS,
  });
};

export const openChargedSettingsDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_CHARGED_SETTINGS_DIALOG,
  });
};

export const closeChargedSettingsDialogFn =
  () => async (dispatch, getState) => {
    dispatch({
      type: CLOSE_CHARGED_SETTINGS_DIALOG,
    });
  };
