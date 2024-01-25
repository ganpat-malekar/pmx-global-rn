import {
  STORE_ALL_DEPARTMENTS_MAPPED_ROLES,
  STORE_MANAGE_USER_LIST,
  STORE_MANAGE_USER_LIST_EXPORT,
  OPEN_MANAGE_USER_STATUS_DIALOG,
  CLOSE_MANAGE_USER_STATUS_DIALOG,
} from "../../../actions/types";
import _ from "underscore";
import { encryptAES } from "../../../../helper/cryptography";

const initialState = {
  mappedDepartmentRoleList: [],
  userList: {},
  userListExport: [],
  userStatusDialog: false,
  userStatusData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_ALL_DEPARTMENTS_MAPPED_ROLES:
      return {
        ...state,
        mappedDepartmentRoleList: action.payload.Data,
      };
    case STORE_MANAGE_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    case STORE_MANAGE_USER_LIST_EXPORT:
      return {
        ...state,
        userListExport: action.payload,
      };
    case OPEN_MANAGE_USER_STATUS_DIALOG:
      return {
        ...state,
        userStatusDialog: true,
        userStatusData: action.payload,
      };
    case CLOSE_MANAGE_USER_STATUS_DIALOG:
      return { ...state, userStatusDialog: false, userStatusData: {} };
    default:
      return state;
  }
}
