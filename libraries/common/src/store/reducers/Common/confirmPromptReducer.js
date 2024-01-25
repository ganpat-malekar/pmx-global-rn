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
    case "STORE_CONFIRM_PROMPT_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_CONFIRM_PROMPT_DATA":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
