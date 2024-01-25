import {
  OPEN_VIEW_DIALOG_BOX,
  CLOSE_VIEW_DIALOG_BOX,
} from "../../../actions/types";

const initialState = {
  title: null,
  buttonText: null,
  data: null,
  columnNames: null,
  tableFooterData: null,
  topBarData: null,
  isModalOpen: false,
  closeModal: null,
  apiData: null,
  submitToApi: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_VIEW_DIALOG_BOX:
      return {
        ...state,
        ...action.payload,
      };
    case CLOSE_VIEW_DIALOG_BOX:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
