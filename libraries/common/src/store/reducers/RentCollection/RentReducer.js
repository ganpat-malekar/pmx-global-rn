import _ from "underscore";

import { STORE_TRACK_RENT_COLLECTIONS_DATA } from "../../actions/types";

const initialState = {
  trackRentCollectionsDataList: [],
  bulkRentsFromResponse: {},
  bookedRentData: {},
  editData: {},
  subscriptionAndLimitDetails: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_TRACK_RENT_COLLECTIONS_DATA:
      return {
        ...state,
        trackRentCollectionsDataList: action.payload,
      };
    case "CLEAR_RENT_TABLE_DATA": {
      return {
        ...state,
        trackRentCollectionsDataList: [],
      };
    }
    case "STORE_BULK_RENTS_FROM_RESPONSE": {
      return {
        ...state,
        bulkRentsFromResponse: action.payload,
      };
    }
    case "FLUSH_BULK_RENT_RESPONSE": {
      return {
        ...state,
        bulkRentsFromResponse: {},
      };
    }
    case "STORE_BOOKED_RENT_COLLECTIONS_DATA": {
      return {
        ...state,
        bookedRentData: action.payload,
      };
    }
    case "STORE_SUBSCRIPTION_AND_LIMIT_DETAILS": {
      return {
        ...state,
        subscriptionAndLimitDetails: action.payload.Data,
      };
    }
    case "STORE_RENT_EDIT_DATA":
      return {
        ...state,
        editData: action.payload,
      };
    case "FLUSH_RENT_EDIT_DATA":
      return {
        ...state,
        editData: {},
      };
    default:
      return state;
  }
}
