import { STORE_PROFILE_SETTINGS_CURRENT_PASSWORD } from "../../actions/types";
import _ from "underscore";

const initialState = {
  currentPassword: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PROFILE_SETTINGS_CURRENT_PASSWORD:
      return {
        ...state,
        currentPassword: action.payload.Data.CurrentPassword,
      };
    default:
      return state;
  }
}
