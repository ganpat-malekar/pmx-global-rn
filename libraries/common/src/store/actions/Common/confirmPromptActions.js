export const openConfirmPrompt = (payload) => async (dispatch, getState) => {
  dispatch({
    type: "STORE_CONFIRM_PROMPT_DATA",
    payload,
  });
};

export const closeConfirmPrompt = () => async (dispatch, getState) => {
  dispatch({
    type: "RESET_CONFIRM_PROMPT_DATA",
  });
};
