import _ from 'underscore';

import {
  STORE_MOBILE_ACCESS_PROMPT_DATA,
  RESET_MOBILE_ACCESS_PROMPT_DATA,
} from '../../../actions/types';

const initialState = {
  isPromptOpen: false,
  closePrompt: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_MOBILE_ACCESS_PROMPT_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_MOBILE_ACCESS_PROMPT_DATA:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
