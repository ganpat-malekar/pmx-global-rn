import { STORE_SYSTEM_MODULES, STORE_INCIDENT } from "../../../actions/types";
import _ from "underscore";

const initialState = {
  systemModuleList: [],
  fetchedFormData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_SYSTEM_MODULES:
      return {
        ...state,
        systemModuleList: action.payload.Data,
      };
    case STORE_INCIDENT:
      console.log(action.payload.Data);
      return {
        ...state,
        fetchedFormData: action.payload.Data[0],
      };
    default:
      return state;
  }
}
