import {
  STORE_PAYMENT_SUMMARY_HISTORY,
  STORE_PAYMENT_SUMMARY_HISTORY_GRID,
} from "../actions/types";
import _ from "underscore";

const initialState = {
  paymentSummaryHistory: [],
  paymentSummaryHistoryGrid: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PAYMENT_SUMMARY_HISTORY:
      return {
        ...state,
        paymentSummaryHistory: action.payload,
      };
    case STORE_PAYMENT_SUMMARY_HISTORY_GRID:
      //   console.log("Reducer: ", action.payload);
      return {
        ...state,
        paymentSummaryHistoryGrid: action.payload,
      };
    default:
      return state;
  }
}
