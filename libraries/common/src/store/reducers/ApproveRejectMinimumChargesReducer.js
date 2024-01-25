import _ from "underscore";

import { STORE_BUSINESS_DETAILS } from "../actions/types";

const initialState = {
  businessDetailsList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetailsList: action.payload,
      };
    default:
      return state;
  }
}
