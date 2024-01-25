import {
  STORE_DATA_TABLE_INFORMATION,
  STORE_GIBAN_BUSINESS,
  OPEN_VIEW_GIBAN_DIALOG,
  CLOSE_VIEW_GIBAN_DIALOG,
} from "../../../../actions/types";
import _ from "underscore";

const initialState = {
  dataList: null,
  gibanBusinessList: [],
  openViewGIBANDialog: false,

  gibanStatusDialog: false,
  gibanStatusData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_DATA_TABLE_INFORMATION:
      // console.log("Reducer: ", action.payload);
      return {
        ...state,
        dataList: action.payload,
      };
    case STORE_GIBAN_BUSINESS:
      return {
        ...state,
        gibanBusinessList: action.payload.Data,
      };
    case OPEN_VIEW_GIBAN_DIALOG:
      return {
        ...state,
        openViewGIBANDialog: true,
      };
    case CLOSE_VIEW_GIBAN_DIALOG:
      return {
        ...state,
        openViewGIBANDialog: false,
      };
    default:
      return state;
  }
}
