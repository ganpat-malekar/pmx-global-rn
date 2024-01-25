export const openRadioPrompt = (payload) => async (dispatch, getState) => {
  dispatch({
    type: "STORE_RADIO_PROMPT_DATA",
    payload,
  });
};

export const closeRadioPrompt = () => async (dispatch, getState) => {
  dispatch({
    type: "RESET_RADIO_PROMPT_DATA",
  });
};
