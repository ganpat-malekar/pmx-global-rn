import {
  GET_FILES_TO_EXPORT,
  FLUSH_EXPORT_FILES,
} from "../../../actions/types";

const initialState = {
  data: [],
  filename: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FILES_TO_EXPORT:
      return {
        ...state,
        data: action.payload.data,
        filename: action.payload.filename,
      };
    case FLUSH_EXPORT_FILES:
      return {
        ...state,
        data: [],
        filename: null,
      };
    default:
      return state;
  }
}
