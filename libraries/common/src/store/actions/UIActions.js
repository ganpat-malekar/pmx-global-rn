import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_LOGIN_CONTINUE_POPUP,
  HIDE_LOGIN_CONTINUE_POPUP,
  SHOW_SESSION_CONTINUE_POPUP,
  HIDE_SESSION_CONTINUE_POPUP,
  OPEN_DESKTOP_DRAWER,
  CLOSE_DESKTOP_DRAWER,
  VIEW_SAMPLE_FILE,
} from "./types";

export const handleSampleFile = (page_name) => (dispatch) => {
  dispatch({
    type: VIEW_SAMPLE_FILE,
    payload: page_name,
  });
};

export const openDesktopDrawer = () => (dispatch) => {
  dispatch({
    type: OPEN_DESKTOP_DRAWER,
  });
};

export const closeDesktopDrawer = () => (dispatch) => {
  dispatch({
    type: CLOSE_DESKTOP_DRAWER,
  });
};

export const openMobileDrawer = () => (dispatch) => {
  dispatch({
    type: OPEN_DRAWER,
  });
};

export const closeMobileDrawer = () => (dispatch) => {
  dispatch({
    type: CLOSE_DRAWER,
  });
};

export const showAlert = (data) => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: data,
  });
};

export const hideAlert = () => (dispatch) => {
  dispatch({
    type: HIDE_ALERT,
  });
};

export const showLoginPopup = (payload) => (dispatch) => {
  dispatch({
    type: SHOW_LOGIN_CONTINUE_POPUP,
    payload,
  });
};

export const hideLoginPopup = () => (dispatch) => {
  dispatch({
    type: HIDE_LOGIN_CONTINUE_POPUP,
  });
};

export const showSessionPopUp = () => (dispatch) => {
  dispatch({
    type: SHOW_SESSION_CONTINUE_POPUP,
  });
};

export const hideSessionPopUp = () => (dispatch) => {
  dispatch({
    type: HIDE_SESSION_CONTINUE_POPUP,
  });
};
