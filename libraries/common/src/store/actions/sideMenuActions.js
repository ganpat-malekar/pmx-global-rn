import axios from 'axios';
import _ from 'underscore';

import { showAlert } from './UIActions';
import {
  SIDE_BAR_MENU_ITEMS_SUCCESS,
  SIDE_BAR_MENU_ITEMS_FAIL,
  LOADING,
  LOADED,
} from './types';

import { errorAlertHandler } from '@paymate/common/helpers';

import api from '@paymate/common/apimiddleware';
import { config } from '@paymate/common/config';

// Sign In User

/**
 * Gets menu items and stores in reducer -
 * sideBarMenuItems: state.sideMenu.sideBarMenuItems,
 *
 * @returns {undefined}
 */
export const getSideBarMenuItems = (data) => async (dispatch, getState) => {
  let responseData = null;

  // dispatch({
  //   type: LOADING,
  // });
  try {
    const response = await api.get(
      config.SIDEMENU_LIST_ADMIN + '?companyid=' + data.CompanyId
    );
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

  const { Status, Description, Menu } = responseData;

  if (Status !== true) {
    dispatch(
      showAlert({
        type: 'danger',
        message: Description || 'Something went wrong',
      })
    );
    return;
  }

  // Finally, store in reducer

  dispatch({
    type: SIDE_BAR_MENU_ITEMS_SUCCESS,
    payload: Menu,
  });
};
