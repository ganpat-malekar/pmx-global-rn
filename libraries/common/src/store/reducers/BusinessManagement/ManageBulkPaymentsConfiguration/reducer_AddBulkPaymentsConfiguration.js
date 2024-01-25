import {
  STORE_COMPANY_FILE_SETTINGS,
  STORE_BUSINESS_LIST,
} from "../../../actions/types";
import _ from "underscore";

const initialState = {
  businessList: [],
  destinationList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_COMPANY_FILE_SETTINGS:
      return {
        ...state,
        destinationList: action.payload.Data,
      };
    case STORE_BUSINESS_LIST:
      var business_name_array = [];
      if (!_.isEmpty(action.payload.Data)) {
        action.payload.Data.sort((a, b) =>
          a.CompanyName.localeCompare(b.CompanyName, "en", {
            sensitivity: "base",
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
    default:
      return state;
  }
}
