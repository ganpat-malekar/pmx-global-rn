import _ from "underscore";

import {
  STORE_REQUESTS_RECEIVED,
  STORE_COMPANY_BALANCE,
  STORE_SENDER_REQUESTS_RECEIVED,
  STORE_SEARCH_BUSINESS,
} from "../../actions/types";

const initialState = {
  requestsReceivedList: [],
  companyBalanceList: [],
  senderRequestsReceivedList: [],
  searchBusinessList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_REQUESTS_RECEIVED:
      return {
        ...state,
        requestsReceivedList: action.payload,
      };
    case STORE_COMPANY_BALANCE:
      return {
        ...state,
        companyBalanceList: action.payload,
      };
    case STORE_SENDER_REQUESTS_RECEIVED:
      return {
        ...state,
        senderRequestsReceivedList: action.payload,
      };
    case STORE_SEARCH_BUSINESS:
      return {
        ...state,
        searchBusinessList: action.payload.Data,
      };
    default:
      return state;
  }
}
