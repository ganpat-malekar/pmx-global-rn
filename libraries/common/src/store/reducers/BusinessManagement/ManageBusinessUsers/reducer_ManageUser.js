import _ from "underscore";

import {
  STORE_ALL_BUSINESS_DEPARTMENTS_ROLES,
  STORE_BUSINESS_USER_LIST,
  STORE_BUSINESS_USER_LIST_EXPORT,
} from "../../../actions/types";

const initialState = {
  departmentMappedRoleList: [],
  userList: {},
  userListExport: [],
  userStatusDialog: false,
  userStatusData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_ALL_BUSINESS_DEPARTMENTS_ROLES:
      return {
        ...state,
        departmentMappedRoleList: action.payload.Data,
      };
    case STORE_BUSINESS_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    case STORE_BUSINESS_USER_LIST_EXPORT:
      return {
        ...state,
        userListExport: action.payload.Data,
      };
    default:
      return state;
  }
}
