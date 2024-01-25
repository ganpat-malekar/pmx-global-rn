import { config } from '../../../../config';
import axios from 'axios';
import errorAlertHandler from '../../../../helper/errorAlertHandler';
import { showAlert } from '../../UIActions';
import { getAndSAveBusinessInformation } from './action_AddBusiness';
import { LOADING, LOADED, ADD_QUESTIONS } from '../../types';
import _ from 'underscore';
import api from '../../../../apimiddleware';

export const getQuestions = () => async (dispatch, getState) => {
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
  axios(config.DOMAIN + config.FETCH_COMPANY_QUESTIONNAIRE, {
    method: 'POST',
    headers,
    data,
  })
    .then((response) => {
      let { Data: questions } = response.data;

      dispatch({
        type: ADD_QUESTIONS,
        questions,
      });
    })
    .catch((error) => {
      errorAlertHandler(error, dispatch);
    });
};

/**
 *
 * @param {Object} data
 * @param {string} data.CompanyId - Encrypted (MANDATORY)
 * @param {string} data.lstCompanyQuestionnaire - Array of objects
 * @returns {boolean}
 */
export const saveQuestionnaireData = (data) => async (dispatch, getState) => {
  let responseData = null;

  dispatch({
    type: LOADING,
  });
  try {
    const response = await api.post(config.SAVE_COMPANY_QUESTIONNAIRE, data);
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
