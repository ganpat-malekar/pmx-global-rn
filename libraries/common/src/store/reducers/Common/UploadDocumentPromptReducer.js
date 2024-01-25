import _ from "underscore";

import { STORE_SAVE_SINGLE_DOCUMENT_FILE } from "../../actions/types";

const initialState = {
  saveSingleDocument: {},
  isPromptOpen: false,
  closePrompt: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_SAVE_SINGLE_DOCUMENT_FILE:
      return {
        ...state,
        saveSingleDocument: action.payload,
      };
    case "STORE_UPLOAD_DOCUMENT_PROMPT_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_UPLOAD_DOCUMENT_PROMPT_DATA":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
