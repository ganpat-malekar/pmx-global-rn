import _ from "underscore";

import {
  STORE_PENDING_APPROVAL,
  STORE_SENDER_RECEIVED_REQUEST,
} from "../../actions/types";

const initialState = {
  pendingApprovalList: [],
  senderReceivedRequest: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PENDING_APPROVAL:
      return {
        ...state,
        pendingApprovalList: action.payload,
      };
    case STORE_SENDER_RECEIVED_REQUEST:
      return {
        ...state,
        senderReceivedRequest: action.payload,
      };
    default:
      return state;
  }
}
