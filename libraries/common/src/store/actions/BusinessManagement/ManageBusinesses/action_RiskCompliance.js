import _ from 'underscore';

import { getAndSAveBusinessInformation } from './action_AddBusiness';
import { fetchBusinessInformationForView } from './action_ManageBusiness';

import errorAlertHandler from '../../../../helper/errorAlertHandler';

import api from '../../../../apimiddleware';
import { config } from '../../../../config';

import { showAlert } from '../../UIActions';
import { LOADED, LOADING } from '../../types';

/**
 * [POST request]
 * Stores Registrar Master in reducer -
 * riskCompliance: state.riskCompliance,

 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId -  Encrypted (MANDATORY)
 * @param {string} data.ClientID - Plaintext (MANDATORY)
 * @param {string} data.Remarks - Plaintext 
 * @param {string} data.RiskId - Encrypted (MANDATORY)
 * @param {string} data.RiskStatus - Plaintext, pass "0", hardcoded (MANDATORY)
 * @returns {undefined}
 */
export const submitRiskCompliance =
  (data, isView) => async (dispatch, getState) => {
    let responseData = null;

    dispatch({
      type: LOADING,
    });
    try {
      const response = await api.post(
        config.INSERT_UPDATE_RISK_COMPLIANCE,
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
      showAlert({
        type: 'success',
        message: Description,
      })
    );

    if (!isView) {
      dispatch(
        fetchBusinessInformationForView({ companyId: data.CompanyId }, false)
      );
      dispatch({
        type: 'SET_TABLE_REFRESH_FLAG',
      });
      return true;
    } else {
      dispatch(getAndSAveBusinessInformation());
      return true;
    }
  };

/**
 * [POST request]
 * Stores Registrar Master in reducer -
 * riskCompliance: state.riskCompliance,

 * @param {Object} data - payload (MANDATORY)
 * @param {string} data.CompanyId - Encrypted (MANDATORY)
 * @returns {undefined}
 */
export const getRiskComplianceHistory =
  (data) => async (dispatch, getState) => {
    let responseData = null;

    try {
      const response = await api.post(config.FETCH_RISK_COMPLIANCE_LIST, data);
      responseData = response.data;
    } catch (error) {
      errorAlertHandler(error, dispatch);
    } finally {
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
      type: 'STORE_RISK_COMPLIANCE_HISTORY',
      payload: { Data },
    });
  };

export const flushRiskcomplianceHistory = () => (dispatch, getState) => {
  dispatch({
    type: 'FLUSH_RISK_COMPLIANCE_HISTORY',
  });
};
