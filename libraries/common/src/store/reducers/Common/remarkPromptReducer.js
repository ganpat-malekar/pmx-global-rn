const initialState = {
  title: null,
  promptText: null,
  isPromptOpen: false,
  closePrompt: null,
  apiData: null,
  submitToApi: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_REMARK_PROMPT_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_REMARK_PROMPT_DATA":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
