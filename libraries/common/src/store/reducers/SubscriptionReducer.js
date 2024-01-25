import _ from "underscore";

const initialState = {
  tableData: [],
  editData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_SUBSCRIPTION_TABLE_DATA":
      return {
        ...state,
        tableData: action.payload.Data,
      };
    case "STORE_SUBSCRIPTION_EDIT_DATA":
      const data = action.payload.Data;
      const editData = !_.isEmpty(data) ? data[0] : {};
      return {
        ...state,
        editData,
      };
    case "FLUSH_SUBSCRIPTION_EDIT_DATA":
      return {
        ...state,
        editData: {},
      };
    default:
      return state;
  }
}
