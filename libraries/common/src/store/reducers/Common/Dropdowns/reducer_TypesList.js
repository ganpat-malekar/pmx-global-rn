import {
  COMMISSION_TYPE,
  BUSINESS_MODE,
  CHANNEL_PARTNER,
  SERVICE_MODE,
  CONTACT_TYPE,
  DISCOUNTING,
  WEB_SUBSCRIPTION,
  API_SUBSCRIPTION,
  CARD_TYPE,
  SUBSCRIPTION_TYPE,
  SUBSCRIPTION_CATEGORY,
} from "../../../actions/types";

const initialState = {
  CommissionType: [],
  BusinessMode: [],
  ChannelPartner: [],
  ServiceMode: [],
  ContactType: [],
  Discounting: [],
  WebSubscription: [],
  ApiSubscription: [],
  CardType: [],
  SubscriptionType: [],
  SubscriptionCategory: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMISSION_TYPE:
      return {
        ...state,
        CommissionType: action.payload,
      };
    case BUSINESS_MODE:
      return {
        ...state,
        BusinessMode: action.payload,
      };
    case CHANNEL_PARTNER:
      return {
        ...state,
        ChannelPartner: action.payload,
      };
    case SERVICE_MODE:
      return {
        ...state,
        ServiceMode: action.payload,
      };
    case CONTACT_TYPE:
      return {
        ...state,
        ContactType: action.payload,
      };
    case DISCOUNTING:
      return {
        ...state,
        Discounting: action.payload,
      };
    case WEB_SUBSCRIPTION:
      return {
        ...state,
        WebSubscription: action.payload,
      };
    case API_SUBSCRIPTION:
      return {
        ...state,
        ApiSubscription: action.payload,
      };
    case CARD_TYPE:
      return {
        ...state,
        CardType: action.payload,
      };
    case SUBSCRIPTION_TYPE:
      return {
        ...state,
        SubscriptionType: action.payload,
      };
    case SUBSCRIPTION_CATEGORY:
      return {
        ...state,
        SubscriptionCategory: action.payload,
      };
    default:
      return state;
  }
}
