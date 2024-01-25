import {
  STORE_MOBILE_ACCESS_PROMPT_DATA,
  RESET_MOBILE_ACCESS_PROMPT_DATA,
} from "../../types";

export const openMobileAccessPrompt =
  (payload) => async (dispatch, getState) => {
    dispatch({
      type: STORE_MOBILE_ACCESS_PROMPT_DATA,
      payload,
    });
  };

export const closeMobileAccessPrompt = () => async (dispatch, getState) => {
  dispatch({
    type: RESET_MOBILE_ACCESS_PROMPT_DATA,
  });
};
