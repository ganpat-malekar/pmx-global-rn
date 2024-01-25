const initialState = {
  isPromptOpen: false,
  companyId: "",
  closePrompt: null,
  CompanyCrid: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_RADIO_PROMPT_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_RADIO_PROMPT_DATA":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
