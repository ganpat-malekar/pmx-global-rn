import _ from "underscore";

import { encryptAES } from "../../../../helper/cryptography";

import {
  STORE_USER_COUNTRY_LIST,
  STORE_USER_CHANNEL_PARTNER_LIST,
  STORE_USER_DEPARTMENTS_MAPPED_ROLE,
  STORE_USER_DATA,
} from "../../../actions/types";

const initialState = {
  countryList: [],
  roleList: [],
  departmentList: [],
  channelPartnerList: [],
  fetchedDepartmentIdList: [],
  fetchedFormData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_USER_COUNTRY_LIST:
      return {
        ...state,
        countryList: action.payload.Data,
      };
    case STORE_USER_CHANNEL_PARTNER_LIST:
      return {
        ...state,
        channelPartnerList: action.payload.Data,
      };
    case STORE_USER_DEPARTMENTS_MAPPED_ROLE:
      const department_list = action.payload.Data.filter((item) =>
        action.payload.UserType === "Admin"
          ? item.ParentDepartmentId === encryptAES(1) ||
            item.ParentDepartmentId === encryptAES(5) // Put in config
          : item.ParentDepartmentId === encryptAES(7)
      ).map((item) => {
        // Need be able to verify the current item is radio or checkbox
        const data = { ...item };
        if (item.ParentDepartmentId === encryptAES(5)) {
          data.IsRadio = true;
        } else {
          data.IsRadio = false;
        }
        return data;
      });

      const roles_list = _.uniq(department_list, (item) => item.RoleId);

      return {
        ...state,
        roleList: roles_list,
        departmentList: department_list,
      };
    case STORE_USER_DATA:
      const departmentId_array = action.payload.Data.map(
        (item) => item.DepartmentId
      );
      return {
        ...state,
        fetchedDepartmentIdList: departmentId_array,
        fetchedFormData: action.payload.Data[0],
      };
    default:
      return state;
  }
}
