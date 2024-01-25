import {
  STORE_BULK_CONTACT_TABLE_DATA,
  CLEAR_BULK_CONTACT_TABLE_DATA,
} from "../../../actions/types";

const initialState = {
  bulkContactTableData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_BULK_CONTACT_TABLE_DATA:
      return {
        ...state,
        bulkContactTableData: action.payload,
      };
    case CLEAR_BULK_CONTACT_TABLE_DATA:
      return {
        ...state,
        bulkContactTableData: {},
      };
    default:
      return state;
  }
}
