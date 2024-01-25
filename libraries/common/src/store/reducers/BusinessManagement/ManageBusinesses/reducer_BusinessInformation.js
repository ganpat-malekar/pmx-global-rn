import {
  ADD_COUNTRIES,
  ADD_COMPANY_TYPES,
  ADD_CATEGORIES,
  ADD_SUB_CATEGORIES,
  ADD_EMIRATES,
  ADD_USERS,
} from "../../../actions/types";

const initialState = {
  countries: [],
  companyTypes: [],
  categories: [],
  subCategories: [],
  emirates: [],
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_COUNTRIES:
      return {
        ...state,
        countries: action.countries,
      };
    case ADD_COMPANY_TYPES:
      return {
        ...state,
        companyTypes: action.companyTypes,
      };
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case ADD_SUB_CATEGORIES:
      return {
        ...state,
        subCategories: action.subCategories,
      };
    case ADD_EMIRATES:
      return {
        ...state,
        emirates: action.emirates,
      };
    case ADD_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
}
