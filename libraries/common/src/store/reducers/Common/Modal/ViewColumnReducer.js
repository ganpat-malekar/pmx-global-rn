const initialState = {
  title: "",
  columnNames: [],
  columnData: [],
  MUIColumnObjectArray: [],
  isModalOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "OPEN_VIEW_COLUMN_DIALOG_BOX":
      return {
        ...state,
        ...action.payload,
      };
    case "CLOSE_VIEW_COLUMN_DIALOG_BOX":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
