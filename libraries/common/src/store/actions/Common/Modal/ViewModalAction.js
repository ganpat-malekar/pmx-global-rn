import { OPEN_VIEW_DIALOG_BOX, CLOSE_VIEW_DIALOG_BOX } from "../../types";
import _ from "underscore";

export const openViewDialogFn = (payload) => async (dispatch, getState) => {
  dispatch({
    type: OPEN_VIEW_DIALOG_BOX,
    payload,
  });
};

export const closeViewDialogFn = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VIEW_DIALOG_BOX,
  });
};
