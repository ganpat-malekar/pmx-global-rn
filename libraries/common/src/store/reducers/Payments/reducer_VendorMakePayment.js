import _ from "underscore";

const initialState = {
  editData: {},
  paymentsTableData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_VENDOR_PAYMENT_EDIT_DATA":
      return {
        ...state,
        editData: action.payload,
      };
    case "FLUSH_VENDOR_PAYMENT_EDIT_DATA":
      return {
        ...state,
        editData: {},
      };
    case "STORE_VENDOR_MAKE_PAYMENT_TABLE_DATA":
      return {
        ...state,
        paymentsTableData: action.payload,
      };
    default:
      return state;
  }
}
