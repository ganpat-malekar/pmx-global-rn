import { STORE_PAY_FROM_TYPES } from "../../actions/types";

const initialState = {
  bulkPaymentTableData: {},
  payFromTypeList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_BULK_PAYMENT_TABLE_DATA":
      return {
        ...state,
        bulkPaymentTableData: action.payload,
      };
    case "CLEAR_BULK_PAYMENT_TABLE_DATA":
      return {
        ...state,
        bulkPaymentTableData: {},
      };
    case STORE_PAY_FROM_TYPES:
      return {
        ...state,
        payFromTypeList: action.payload,
      };
    default:
      return state;
  }
}
