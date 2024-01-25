import {
  STORE_BUSINESS_USER_BUSINESS_LIST,
  STORE_BUSINESS_USER_COUNTRY_LIST,
  STORE_BUSINESS_USER_DEPARTMENTS_MAPPED_ROLE,
  STORE_BUSINESS_USER_DATA,
} from '../../../actions/types';
import _ from 'underscore';
import { encryptAES } from '@paymate/common/helpers';

const initialState = {
  businessList: [],
  countryList: [],
  roles: [],
  departments: [],
  userData: [],
  userDepartmentIds: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_BUSINESS_USER_BUSINESS_LIST:
      var business_name_array = [];
      if (!_.isEmpty(action.payload.Data)) {
        action.payload.Data.sort((a, b) =>
          a.CompanyName.localeCompare(b.CompanyName, 'en', {
            sensitivity: 'base',
          })
        ).forEach((element) => {
          business_name_array.push({
            label: element.CompanyName,
            id: element.CompanyId,
          });
        });
      }
      return {
        ...state,
        businessList: business_name_array,
      };
    case STORE_BUSINESS_USER_COUNTRY_LIST:
      return {
        ...state,
        countryList: action.payload.Data,
      };
    case STORE_BUSINESS_USER_DEPARTMENTS_MAPPED_ROLE:
      const department_list = action.payload.Data.filter(
        (item) => item.ParentDepartmentId === encryptAES(7) // Put in config
      );

      const roles_list = _.uniq(department_list, (item) => item.RoleId).map(
        (item) => ({
          RoleId: item.RoleId,
          RoleName: item.RoleName,
        })
      );

      return {
        ...state,
        roles: roles_list,
        departments: department_list,
      };
    case STORE_BUSINESS_USER_DATA:
      const departmentIds_array = action.payload.Data.map(
        (item) => item.DepartmentId
      );
      return {
        ...state,
        userData: action.payload.Data[0],
        userDepartmentIds: departmentIds_array,
      };
    default:
      return state;
  }
}
