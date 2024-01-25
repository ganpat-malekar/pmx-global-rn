import {
  OPEN_VIEW_DIALOG,
  CLOSE_VIEW_DIALOG,
  REMOVE_INVOICE_DATA_FOR_SUBSCRIPTIONS,
} from "../types";

export const openViewDialog = () => async (dispatch, getState) => {
  dispatch({
    type: OPEN_VIEW_DIALOG,
  });
};

export const closeViewDialog = () => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_VIEW_DIALOG,
  });
  dispatch({
    type: REMOVE_INVOICE_DATA_FOR_SUBSCRIPTIONS,
  });
};
