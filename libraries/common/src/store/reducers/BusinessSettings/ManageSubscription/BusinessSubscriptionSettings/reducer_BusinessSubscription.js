import _ from "underscore";

import {
  STORE_BUSINESS_SUBSCRIPTION_PLAN_LIST,
  STORE_BUSINESS_SUBSCRIPTION_PLAN_DETAILS,
  STORE_INVOICE_DATA_FOR_SUBSCRIPTIONS,
  REMOVE_INVOICE_DATA_FOR_SUBSCRIPTIONS,
} from "../../../../actions/types";

const initialState = {
  businessSubscriptionPlanDetails: [],
  businessSubscriptionPlanList: [],
  invoiceDataForSubscriptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_BUSINESS_SUBSCRIPTION_PLAN_DETAILS:
      return {
        ...state,
        businessSubscriptionPlanDetails: action.payload,
      };
    case STORE_BUSINESS_SUBSCRIPTION_PLAN_LIST:
      return {
        ...state,
        businessSubscriptionPlanList: action.payload,
      };
    case STORE_INVOICE_DATA_FOR_SUBSCRIPTIONS:
      return {
        ...state,
        invoiceDataForSubscriptions: action.payload,
      };
    case REMOVE_INVOICE_DATA_FOR_SUBSCRIPTIONS:
      return {
        ...state,
        invoiceDataForSubscriptions: [],
      };
    default:
      return state;
  }
}
