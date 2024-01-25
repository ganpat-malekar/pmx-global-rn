import axios from 'axios';
import _ from 'underscore';

import { getAndSAveBusinessInformation } from './action_AddBusiness';

import aesEncode from '../../../../helper/aes256encoder';
import encryptAES from '../../../../helper/aes256encoder';
import errorAlertHandler from '../../../../helper/errorAlertHandler';

import api from '../../../../apimiddleware';
import { config } from '../../../../config';

import { showAlert } from '../../UIActions';
import {
  ADD_ACQUIRING_BANKS,
  ADD_ISSUING_BANKS,
  ADD_ISSUING_BANK_RELATIONSHIP_USERS,
  ADD_REGISTRAR_GATEWAYS,
  ADD_COMPANY_CURRENCIES,
  ADD_COUNTRY_WISE_TAXES,
  ADD_SETTLEMENT_BANKS,
  STORE_TRANSACTION_CHARGES_TABLE_DATA,
  STORE_SETTLEMENT_CHARGES_TABLE_DATA,
  STORE_GATEWAY_CHARGES_HISTORY,
  LOADED,
  LOADING,
} from '../../types';

export const getAcquiringBanks = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  const data = {
    RegistrarType: '8', // Put into a config file
    Status: '1', // Put into a config file
    FromRecord: 0,
    SortExpression: 'ASC',
    ToRecord: 1000,
  };

  axios(config.DOMAIN + config.FETCH_REGISTRAR_MASTER, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Data: acquiringBanks } = response.data;
      dispatch({
        type: ADD_ACQUIRING_BANKS,
        acquiringBanks,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const getIssuingBanks = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  const data = {
    RegistrarType: '7', // Put into a config file
    Status: '1', // Put into a config file
    FromRecord: 0,
    SortExpression: 'ASC',
    ToRecord: 1000,
  };

  axios(config.DOMAIN + config.FETCH_REGISTRAR_MASTER, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Data: issuingBanks } = response.data;
      dispatch({
        type: ADD_ISSUING_BANKS,
        issuingBanks,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const getIssuingBankRelationshipUsers =
  (data) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    axios(config.DOMAIN + config.FETCH_ISSUING_BANK_RELATIONSHIP_USERS, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        const { Data: issuingBankRelationshipUsers } = response.data;
        dispatch({
          type: ADD_ISSUING_BANK_RELATIONSHIP_USERS,
          issuingBankRelationshipUsers,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const getRegistrarGateways =
  (ParentId, CurrencyName) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    const StatusCode = aesEncode('1');
    CurrencyName = aesEncode(CurrencyName); // Pass name of the currency
    const data = {
      ParentId, // Is the RegistrarId of a selected Acquiring bank
      StatusCode, // Add to config
      CurrencyName,
    };

    axios(config.DOMAIN + config.FETCH_REGISTRAR_GATEWAYS, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        const { Data: registrarGateways } = response.data;
        dispatch({
          type: ADD_REGISTRAR_GATEWAYS,
          registrarGateways,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const getCompanyCurrencies_new2 =
  (CodeName) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    const { CompanyId } = getState().addBusiness.BusinessInfo;
    const data = {
      CompanyId,
    };

    axios(config.DOMAIN + config.FETCH_COMPANY_CURRENCIES, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        let { Data: companyCurrencies } = response.data;

        let PaymentType =
          CodeName === 'Payable' || CodeName === 'Send Money'
            ? 1
            : CodeName === 'Receivable' || CodeName === 'Receive Money'
            ? 2
            : null;

        companyCurrencies = companyCurrencies.filter(
          (currency) =>
            currency.IsChecked === true && currency.PaymentType == PaymentType
        );
        dispatch({
          type: ADD_COMPANY_CURRENCIES,
          companyCurrencies,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const getCountryWiseTaxes = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };

  const CountryId = encryptAES('148'); // Put in config
  const data = {
    CountryId,
  };

  axios(config.DOMAIN + config.FETCH_COUNTRY_WISE_TAXES, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      let { Data: countryWiseTaxes } = response.data;
      dispatch({
        type: ADD_COUNTRY_WISE_TAXES,
        countryWiseTaxes,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

/**
 * Store settlement charge modes in reducer
 * settlementChargeModes: state.transactionCharges.settlementChargeModes
 *
 * @param {Object} data
 * @param {string} data.CompanyId - Encrypted (MANDATORY), get it from businessInfo reducer
 * @returns {undefined}
 */
export const getSettleChargeModes = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.post(config.FETCH_TRANSACTION_CHARGES, data);
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

  dispatch({
    type: 'STORE_SETTLEMENT_CHARGE_MODES',
    payload: { Data },
  });
};

export const getSettlementBanks =
  (CurrencyName) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    const StatusCode = aesEncode('1');
    CurrencyName = aesEncode(CurrencyName); // Pass name of the currency
    const data = {
      StatusCode, // Add to config
      CurrencyName,
    };

    axios(config.DOMAIN + config.FETCH_REGISTRAR_GATEWAYS, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        const { Data } = response.data;

        let settlementBanks = Data.filter(
          (bank) => bank.RegistrarType === '9' && bank.ProcessingType === 'EFT'
        );
        dispatch({
          type: ADD_SETTLEMENT_BANKS,
          settlementBanks,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const addCharges =
  (transactionCharges) => async (dispatch, getState) => {
    let responseData = null;

    const { CompanyId } = getState().addBusiness.BusinessInfo;
    const data = {
      ...transactionCharges,
      CompanyId,
    };

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.ADD_PAYMENT_CHARGES, data);
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

    dispatch(getAndSAveBusinessInformation());
    dispatch(getSettleChargeModes({ CompanyId }));

    return true;
  };

export const deleteCharge = (CBID) => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };

  const { CompanyId } = getState().addBusiness.BusinessInfo;
  const data = {
    CompanyId,
    CBID,
    ViewName: '01', // Put in config
  };
  dispatch({
    type: LOADING,
  });
  return axios(config.DOMAIN + config.DELETE_TRANSACTION_CHARGES, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Description, Status } = response.data;
      dispatch({
        type: LOADED,
      });
      if (Status === false) {
        dispatch(
          showAlert({
            type: 'danger',
            message: Description,
          })
        );
        return;
      } else {
        dispatch(
          showAlert({
            type: 'success',
            message: Description,
          })
        );
        dispatch(getAndSAveBusinessInformation());
      }
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
      dispatch({
        type: LOADED,
      });
    });
};

export const submitTransactionCharges = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };
  const { CompanyId } = getState().addBusiness.BusinessInfo;
  const data = {
    CompanyId,
    TabIndex: '4', // Put in config
    Status: '0', // Put in config
    ViewName: '', // Put in config
  };
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + config.SUBMIT_TRANSACTION_CHARGES, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Description, Status } = response.data;
      dispatch({
        type: LOADED,
      });
      if (Status === false) {
        dispatch(
          showAlert({
            type: 'danger',
            message: Description,
          })
        );
        return;
      } else {
        dispatch(
          showAlert({
            type: 'success',
            message: Description,
          })
        );
        dispatch(getAndSAveBusinessInformation());
      }
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
      dispatch({
        type: LOADED,
      });
    });
};

export const submitSettlmentCharges =
  (option) => async (dispatch, getState) => {
    let responseData = null;

    const { CompanyId } = getState().addBusiness.BusinessInfo;
    const data = {
      CompanyId,
      FilledBy: option, // 1 for Save and continue, 2 for Sending for Approval - Then redirect to Manage Business screen
      status: 3, // Put in config
    };
    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(config.SAVE_SUBSCRIPTION_CHARGES, data);
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
      dispatch({
        type: LOADED,
      });
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
    dispatch(
      showAlert({
        type: 'success',
        message: Description,
      })
    );
    dispatch(getAndSAveBusinessInformation());
    return true;
  };

// -------------------------- Table fetch APIs -------------------------//

export const getTransactionCharges = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };

  const { CompanyId } = getState().addBusiness.BusinessInfo;
  const data = {
    CompanyId,
  };

  return axios(config.DOMAIN + config.FETCH_TRANSACTION_CHARGES, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Data } = response.data;

      dispatch({
        type: STORE_TRANSACTION_CHARGES_TABLE_DATA,
        payload: Data,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

export const fetchGatewayChargesHistory =
  (data) => async (dispatch, getState) => {
    const { token, userIpAddress } = getState().admin;
    const headers = {
      'content-type': 'application/json',
      IpAddress: userIpAddress,
      ServiceType: 'Web',
      AuthToken: token,
    };

    axios(config.DOMAIN + config.FETCH_GATEWAY_CHARGES_HISTORY, {
      method: 'POST',
      headers,
      data,
    })
      .then((response) => {
        const { Data } = response.data;

        dispatch({
          type: STORE_GATEWAY_CHARGES_HISTORY,
          payload: response.data,
        });
      })
      .catch((error) => {
        errorAlertHandler(error, dispatch);
      });
  };

export const getSettlementCharges = () => async (dispatch, getState) => {
  const { token, userIpAddress } = getState().admin;
  const headers = {
    'content-type': 'application/json',
    IpAddress: userIpAddress,
    ServiceType: 'Web',
    AuthToken: token,
  };

  const { CompanyId } = getState().addBusiness.BusinessInfo;
  const data = {
    CompanyId,
  };

  return axios(config.DOMAIN + config.FETCH_SETTLEMENT_CHARGES, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      const { Data } = response.data;

      dispatch({
        type: STORE_SETTLEMENT_CHARGES_TABLE_DATA,
        payload: Data,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};
