import { STORE_BUSINESS_SUBSCRIPTION_DATA } from "../../../actions/types";

const initialState = {
  subscriptionData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_BUSINESS_SUBSCRIPTION_DATA:
      return {
        ...state,
        subscriptionData: action.payload,
      };
    case "FLUSH_BUSINESS_SUBSCRIPTION_DATA":
      return {
        ...state,
        subscriptionData: [],
      };
    default:
      return state;
  }
}
