import _ from "underscore";

import {
  STORE_TENANT_MANAGE_PROPERTY,
  STORE_TENANT_REQUEST_RECEIVED,
  STORE_TENANT_TRACK_RENT_COLLECTION,
} from "../../actions/types";

const initialState = {
  tenantManagePropertyDataList: [],
  tenantRequestReceivedDataList: [],
  openApproveRentRequestDialog: false,
  tenantTrackRentCollectionDataList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_TENANT_MANAGE_PROPERTY:
      return {
        ...state,
        tenantManagePropertyDataList: action.payload,
      };
    case STORE_TENANT_REQUEST_RECEIVED:
      return {
        ...state,
        tenantRequestReceivedDataList: action.payload,
      };
    case "CLEAR_TENANT_PAYMENTS_TABLE_DATA": {
      return {
        ...state,
        tenantRequestReceivedDataList: [],
        tenantTrackRentCollectionDataList: [],
      };
    }
    case STORE_TENANT_TRACK_RENT_COLLECTION:
      return {
        ...state,
        tenantTrackRentCollectionDataList: action.payload,
      };
    case "OPEN_APPROVE_RENT_REQUEST_DIALOG":
      return {
        ...state,
        openApproveRentRequestDialog: true,
      };
    case "CLOSE_APPROVE_RENT_REQUEST_DIALOG":
      return {
        ...state,
        openApproveRentRequestDialog: false,
      };
    default:
      return state;
  }
}
