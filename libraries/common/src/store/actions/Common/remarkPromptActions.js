export const openRemarkPrompt = (payload) => async (dispatch, getState) => {
  dispatch({
    type: "STORE_REMARK_PROMPT_DATA",
    payload,
  });
};

export const closeRemarkPrompt = () => async (dispatch, getState) => {
  dispatch({
    type: "RESET_REMARK_PROMPT_DATA",
  });
};
