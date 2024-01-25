const initialState = {
  isPromptOpen: false,
  companyId: "",
  closePrompt: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_SELECT_PROMPT_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_SELECT_PROMPT_DATA":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
