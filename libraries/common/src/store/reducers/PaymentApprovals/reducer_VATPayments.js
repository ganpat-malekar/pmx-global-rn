import _ from "underscore";

import {
  STORE_VAT_PAYMENTS,
  STORE_PROCESS_APTRANSACTIONS,
  OPEN_APPROVE_VAT_PAYMENT_DIALOG,
  CLOSE_APPROVE_VAT_PAYMENT_DIALOG,
} from "../../actions/types";

const initialState = {
  vatPaymentsList: [],
  apTransactionList: [],
  openApproveVatPaymentDialog: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_VAT_PAYMENTS:
      return {
        ...state,
        vatPaymentsList: action.payload,
      };
    case STORE_PROCESS_APTRANSACTIONS:
      return {
        ...state,
        apTransactionList: action.payload,
      };
    case OPEN_APPROVE_VAT_PAYMENT_DIALOG:
      return {
        ...state,
        openApproveVatPaymentDialog: true,
      };
    case CLOSE_APPROVE_VAT_PAYMENT_DIALOG:
      return {
        ...state,
        openApproveVatPaymentDialog: false,
      };
    default:
      return state;
  }
}
