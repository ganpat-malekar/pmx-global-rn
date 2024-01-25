import { OPEN_VIEW_DIALOG, CLOSE_VIEW_DIALOG } from "../../actions/types";
import _ from "underscore";

const initialState = {
  openViewDialog: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_VIEW_DIALOG:
      return {
        ...state,
        openViewDialog: true,
      };
    case CLOSE_VIEW_DIALOG:
      return {
        ...state,
        openViewDialog: false,
      };
    default:
      return state;
  }
}
