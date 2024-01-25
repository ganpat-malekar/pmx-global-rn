import _ from "underscore";

import { STORE_PAYMENT_CHARGES } from "../actions/types";

const initialState = {
  paymentChargesList: [],
  transactionSummaryResponse: {},
  subscriptionChargesList: [],
  OrderID: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PAYMENT_CHARGES:
      return {
        ...state,
        paymentChargesList: action.payload.Data,
      };
    case "STORE_TRANSACTION_SUMMARY_RESPONSE":
      return {
        ...state,
        transactionSummaryResponse: action.payload,
      };
    case "STORE_SUBSCRIPTION_CHARGES_RESPONSE":
      return {
        ...state,
        subscriptionChargesList: action.payload.Data,
      };
    case "STORE_3DS_ORDER_ID":
      return {
        ...state,
        OrderID: action.payload.OrderID,
      };
    case "CLEAR_3DS_ORDER_ID":
      return {
        ...state,
        OrderID: null,
      };
    default:
      return state;
  }
}
