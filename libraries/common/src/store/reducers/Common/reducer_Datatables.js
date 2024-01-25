import {
  SET_TABLE_REFRESH_FLAG,
  UNSET_TABLE_REFRESH_FLAG,
} from "../../actions/types";
import _ from "underscore";

const initialState = {
  refresh: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TABLE_REFRESH_FLAG:
      return {
        ...state,
        refresh: true,
      };
    case UNSET_TABLE_REFRESH_FLAG:
      return {
        ...state,
        refresh: false,
      };
    default:
      return state;
  }
}
