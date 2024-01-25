import {
  STORE_DESTINATION_FIELDS,
  STORE_BULK_CONFIGURATION_LIST_EXPORT,
  STORE_BULK_CONFIGURATION_LIST,
  CLOSE_BULK_PAYMENT_DELETE_DIALOG,
  OPEN_BULK_PAYMENT_DELETE_DIALOG,
} from '../../../actions/types';
import _ from 'underscore';
import { encryptAES } from '@paymate/common/helpers';

const initialState = {
  destinationFieldList: [],
  bulkConfigurationList: {},
  bulkConfigurationListExport: [],
  openDeleteDialog: false,
  detailsForDelete: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_DESTINATION_FIELDS:
      return {
        ...state,
        destinationFieldList: action.payload.Data,
      };
    case STORE_BULK_CONFIGURATION_LIST_EXPORT:
      return {
        ...state,
        bulkConfigurationListExport: action.payload.Data,
      };
    case STORE_BULK_CONFIGURATION_LIST:
      return {
        ...state,
        bulkConfigurationList: action.payload,
      };
    case OPEN_BULK_PAYMENT_DELETE_DIALOG:
      return {
        ...state,
        openDeleteDialog: true,
        detailsForDelete: action.payload,
      };
    case CLOSE_BULK_PAYMENT_DELETE_DIALOG:
      return {
        ...state,
        openDeleteDialog: false,
      };
    default:
      return state;
  }
}
