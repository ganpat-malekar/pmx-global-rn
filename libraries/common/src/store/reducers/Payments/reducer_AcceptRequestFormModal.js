export const initialFilePopupState = {
  title: "",
  isOpen: false,
  rowData: {},
};

export default function (state = initialFilePopupState, action) {
  switch (action.type) {
    case "HANDLE_ACCEPT_REQUEST_FORM_MODAL":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
