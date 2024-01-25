export const openSelectPrompt = (payload) => async (dispatch, getState) => {
  dispatch({
    type: "STORE_SELECT_PROMPT_DATA",
    payload,
  });
};

export const closeSelectPrompt = () => async (dispatch, getState) => {
  dispatch({
    type: "RESET_SELECT_PROMPT_DATA",
  });
};
