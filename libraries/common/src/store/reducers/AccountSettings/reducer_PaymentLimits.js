import _ from "underscore";

const initialState = {
  editData: {},
  paymentLimitTableData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_PAYMENT_LIMIT_EDIT_DATA":
      return {
        ...state,
        editData: action.payload,
      };
    case "FLUSH_PAYMENT_LIMIT_EDIT_DATA":
      return {
        ...state,
        editData: {},
      };
    case "STORE_PAYMENT_LIMIT_TABLE_DATA":
      return {
        ...state,
        paymentLimitTableData: action.payload,
      };
    default:
      return state;
  }
}
