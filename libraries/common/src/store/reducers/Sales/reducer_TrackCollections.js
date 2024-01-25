import _ from "underscore";

import {
  STORE_PENDING_REQUESTS,
  STORE_PENDING_VENDOR_PAYMENTS,
} from "../../actions/types";

const initialState = {
  pendingRequestsList: [],
  pendingVendorPaymentsList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PENDING_REQUESTS:
      return {
        ...state,
        pendingRequestsList: action.payload,
      };
    case STORE_PENDING_VENDOR_PAYMENTS:
      return {
        ...state,
        pendingVendorPaymentsList: action.payload,
      };
    default:
      return state;
  }
}
