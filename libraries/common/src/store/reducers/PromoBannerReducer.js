import _ from "underscore";

import { STORE_PROMO_CODE_DATA } from "../actions/types";

const initialState = {
  promoCodeDataList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PROMO_CODE_DATA:
      return {
        ...state,
        promoCodeDataList: action.payload,
      };
    default:
      return state;
  }
}
