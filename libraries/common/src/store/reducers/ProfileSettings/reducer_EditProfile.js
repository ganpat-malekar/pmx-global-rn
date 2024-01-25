import _ from "underscore";

import { STORE_PROFILE_USER_DATA } from "../../actions/types";

const initialState = {
  fetchedFormData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PROFILE_USER_DATA:
      const data = action.payload.Data;
      const departments = data.map((item) => item.DepartmentName).join(", ");
      return {
        ...state,
        fetchedFormData: { ...action.payload.Data[0], departments },
      };
    default:
      return state;
  }
}
