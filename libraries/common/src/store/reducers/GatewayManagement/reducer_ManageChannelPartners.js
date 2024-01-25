import _ from 'underscore';

import { encryptAES } from '@paymate/common/helpers';

import {
  STORE_CAHNNEL_PARTNER_CARD_TYPES,
  STORE_ALL_REGISTRAR_TYPES,
  STORE_CHANNEL_PARTNER_LIST_EXPORT,
  STORE_CHANNEL_PARTNER_LIST,
  STORE_GATEWAY_ROW_DATA_EXPORT,
  CLOSE_MANAGE_PAYMENT_GATEWAY_STATUS_DIALOG,
  OPEN_MANAGE_PAYMENT_GATEWAY_STATUS_DIALOG,
} from '../../actions/types';

const initialState = {
  cardTypeList: [],
  registrarTypeList: [],
  channelPartnerList: {},
  channelPartnerListExport: [],
  rowDataExport: [],
  dialogState: false,
  dialogData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_CAHNNEL_PARTNER_CARD_TYPES:
      return {
        ...state,
        cardTypeList: action.payload.Data,
      };
    case STORE_ALL_REGISTRAR_TYPES:
      var registrar_array = _.uniq(
        action.payload.Data,
        (item) => item.RegistrarType
      )?.map((item) => ({
        RegistrarTypeName: item.RegistrarTypeName,
        RegistrarType: encryptAES(item.RegistrarType),
      }));

      return {
        ...state,
        registrarTypeList: registrar_array,
      };
    case STORE_CHANNEL_PARTNER_LIST_EXPORT:
      return {
        ...state,
        channelPartnerListExport: action.payload.Data,
      };
    case STORE_GATEWAY_ROW_DATA_EXPORT:
      return {
        ...state,
        rowDataExport: action.payload.Data,
      };
    case STORE_CHANNEL_PARTNER_LIST:
      return {
        ...state,
        channelPartnerList: action.payload,
      };
    case OPEN_MANAGE_PAYMENT_GATEWAY_STATUS_DIALOG:
      return {
        ...state,
        dialogState: true,
        dialogData: action.payload,
      };
    case CLOSE_MANAGE_PAYMENT_GATEWAY_STATUS_DIALOG:
      return {
        ...state,
        dialogState: false,
        dialogData: {},
      };
    default:
      return state;
  }
}
