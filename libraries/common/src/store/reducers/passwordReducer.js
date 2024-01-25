import { OTP_SENT, OTP_VERIFIED, PASSWORD_CHANGED } from '../actions/types';

const initialState = {
  otpSent: false,
  otpVerified: false,
  passwordChanged: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OTP_SENT:
      return {
        ...state,
        otpSent: action.status,
      };
    case OTP_VERIFIED:
      return {
        ...state,
        otpVerified: action.status,
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        passwordChanged: action.status,
      };
    default:
      return state;
  }
}
