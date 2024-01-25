import _ from "underscore";

import { STORE_REGISTERED_PROPERTY_DATA } from "../../actions/types";

const initialState = {
  propertyMasterDataList: [],
  bulkPropertiesFromResponse: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_REGISTERED_PROPERTY_DATA:
      return {
        ...state,
        propertyMasterDataList: action.payload,
      };
    case "STORE_BULK_PROPERTIES_FROM_RESPONSE":
      return {
        ...state,
        bulkPropertiesFromResponse: action.payload,
      };
    case "FLUSH_BULK_PROPERTY_RESPONSE":
      return {
        ...state,
        bulkPropertiesFromResponse: {},
      };

    case "CLEAR_PROPERTY_TABLE_DATA": {
      return {
        ...state,
        propertyMasterDataList: [],
      };
    }
    default:
      return state;
  }
}
