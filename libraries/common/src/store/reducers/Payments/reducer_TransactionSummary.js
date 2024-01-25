import _ from "underscore";

const initialState = {
  transactionSummaryResponse: null,
  OrderId: null,
  PaymentType: null,
  isSubscriptionCardAdded: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_TRANSACTION_SUMMARY_RESPONSE":
      return {
        ...state,
        transactionSummaryResponse: action.payload,
      };
    case "STORE_CHECKOUT_SESSION_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_CHECKOUT_SESSION_DATA":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
