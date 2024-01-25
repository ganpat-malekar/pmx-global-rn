import { SET_TABLE_REFRESH_FLAG, UNSET_TABLE_REFRESH_FLAG } from "../types";

export const setRefresh = () => (dispatch, getState) => {
  dispatch({ type: SET_TABLE_REFRESH_FLAG });
};

export const resetRefresh = () => (dispatch, getState) => {
  dispatch({ type: UNSET_TABLE_REFRESH_FLAG });
};
