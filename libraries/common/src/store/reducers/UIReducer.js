import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_LOGIN_CONTINUE_POPUP,
  HIDE_LOGIN_CONTINUE_POPUP,
  SHOW_SESSION_CONTINUE_POPUP,
  HIDE_SESSION_CONTINUE_POPUP,
  CLOSE_DESKTOP_DRAWER,
  OPEN_DESKTOP_DRAWER,
  VIEW_SAMPLE_FILE,
} from "../actions/types";

const initialState = {
  openDrawer: false,
  openDrawerDesktop: false,
  showAlert: false,
  alertMessage: "",
  alertType: "",
  viewSamplePopup: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VIEW_SAMPLE_FILE:
      return {
        ...state,
        viewSamplePopup: action.payload,
      };
    case OPEN_DESKTOP_DRAWER:
      return {
        ...state,
        openDrawerDesktop: true,
      };
    case CLOSE_DESKTOP_DRAWER:
      return {
        ...state,
        openDrawerDesktop: false,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        openDrawer: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        openDrawer: false,
      };
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertMessage: action.payload.message,
        alertType: action.payload.type,
      };
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
      };
    case SHOW_LOGIN_CONTINUE_POPUP:
      return {
        ...state,
        displayLoginContinuePopup: true,
        loginContinuePopupMessage: action.payload.message,
      };
    case HIDE_LOGIN_CONTINUE_POPUP:
      return {
        ...state,
        displayLoginContinuePopup: false,
      };
    case SHOW_SESSION_CONTINUE_POPUP:
      return {
        ...state,
        displaySessionTimeOutPopUp: true,
      };
    case HIDE_SESSION_CONTINUE_POPUP:
      return {
        ...state,
        displaySessionTimeOutPopUp: false,
      };
    default:
      return state;
  }
}
