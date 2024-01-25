import _ from 'underscore';

import { encryptAES } from '@paymate/common/helpers';

const initialState = {
  basicUserInfoResponse: {},
  signupDetailsResponse: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'STORE_USER_BASIC_INFO_RESPONSE':
      return {
        ...state,
        basicUserInfoResponse: action.payload.response,
      };
    case 'STORE_SIGNUP_DETAILS_RESPONSE':
      return {
        ...state,
        signupDetailsResponse: action.payload.response,
      };
    default:
      return state;
  }
}
