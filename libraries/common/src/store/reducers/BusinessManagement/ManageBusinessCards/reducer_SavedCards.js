import {
  STORE_CARD_TYPE,
  STORE_ISSUING_BANKS_FOR_CARDS,
  STORE_CARD_CURRENCY,
  STORE_CARD_LIST,
  STORE_CARD_LIST_EXPORT,
  OPEN_MANAGE_CARD_STATUS_DIALOG,
  CLOSE_MANAGE_CARD_STATUS_DIALOG,
} from '../../../actions/types';
import _ from 'underscore';

const initialState = {
  issuingBankList: [],
  cardTypeList: [],
  currencyList: [],
  cardList: {},
  cardListExport: [],
  cardStatusDialog: false,
  cardStatusData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_ISSUING_BANKS_FOR_CARDS:
      return {
        ...state,
        issuingBankList: action.payload.Data,
      };
    case STORE_CARD_TYPE:
      return {
        ...state,
        cardTypeList: action.payload.Data,
      };
    case STORE_CARD_CURRENCY:
      return {
        ...state,
        currencyList: action.payload.Data,
      };
    case STORE_CARD_LIST:
      return {
        ...state,
        cardList: action.payload,
      };
    case STORE_CARD_LIST_EXPORT:
      return {
        ...state,
        cardListExport: action.payload.Data,
      };
    case OPEN_MANAGE_CARD_STATUS_DIALOG:
      return {
        ...state,
        cardStatusDialog: true,
        cardStatusData: action.payload,
      };
    case CLOSE_MANAGE_CARD_STATUS_DIALOG:
      return { ...state, cardStatusDialog: false, cardStatusData: {} };
    default:
      return state;
  }
}
