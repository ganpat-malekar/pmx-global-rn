export const initialFilePopupState = {
  isOpen: false,
  isDownloadable: false,
  content: "",
  fileType: "",
  fileName: "",
  shouldReset: true,
};

export default function (state = initialFilePopupState, action) {
  switch (action.type) {
    case "HANDLE_FILE_MODAL":
      return {
        ...state,
        ...action.payload,
      };
    case "CLOSE_FILE_MODAL":
      return {
        ...initialFilePopupState,
      };
    default:
      return state;
  }
}
