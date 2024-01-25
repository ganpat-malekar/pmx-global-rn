import _ from "underscore";

const initialState = {
  tenantMasterDataList: [],
  bulkTenantsFromResponse: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_REGISTERED_TENANT_DATA":
      return {
        ...state,
        tenantMasterDataList: action.payload,
      };
    case "STORE_BULK_TENANTS_FROM_RESPONSE":
      return {
        ...state,
        bulkTenantsFromResponse: action.payload,
      };
    case "FLUSH_BULK_TENANT_RESPONSE":
      return {
        ...state,
        bulkTenantsFromResponse: {},
      };

    case "CLEAR_TENANT_TABLE_DATA": {
      return {
        ...state,
        tenantMasterDataList: [],
      };
    }
    default:
      return state;
  }
}
