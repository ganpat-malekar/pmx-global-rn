const initialState = {
  isOpen: false,
  tableData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "HANDLE_RISK_HISTORY_MODAL":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
