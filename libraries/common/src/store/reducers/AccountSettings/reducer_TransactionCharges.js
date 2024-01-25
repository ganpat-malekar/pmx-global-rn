import _ from "underscore";

import { STORE_BUSINESS_TRANSACTION_CHARGES } from "../../actions/types";

const initialState = {
  transactionChargesList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_BUSINESS_TRANSACTION_CHARGES:
      // console.log("Reducer: ", action.payload);
      return {
        ...state,
        transactionChargesList: action.payload,
      };
    default:
      return state;
  }
}
