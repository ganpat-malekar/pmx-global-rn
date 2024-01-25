import _ from "underscore";

import { encryptAES } from "../../../helper/cryptography";

const initialState = {
  editData: {},
  collectPaymentsTableData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_COLLECT_PAYMENT_EDIT_DATA":
      return {
        ...state,
        editData: action.payload,
      };
    case "FLUSH_COLLECT_PAYMENT_EDIT_DATA":
      return {
        ...state,
        editData: {},
      };
    case "STORE_COLLECT_PAYMENT_TABLE_DATA":
      return {
        ...state,
        collectPaymentsTableData: action.payload,
      };
    default:
      return state;
  }
}
