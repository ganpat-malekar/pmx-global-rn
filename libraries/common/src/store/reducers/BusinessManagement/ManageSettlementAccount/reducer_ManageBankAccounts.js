import {
  STORE_ALL_BANK_ACCOUNT_LIST,
  STORE_ALL_BANK_ACCOUNT_LIST_EXPORT,
  CLOSE_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG,
  OPEN_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG,
} from '../../../actions/types';
import _ from 'underscore';
import { encryptAES, decryptAES } from '@paymate/common/helpers';

const initialState = {
  bankAccountList: {},
  bankAccountListExport: [],
  openDeleteDialog: false,
  detailsForDelete: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case STORE_ALL_BUSINESS_DEPARTMENTS_ROLES:
    //   return {
    //     ...state,
    //     departmentMappedRoleList: action.payload.Data,
    //   };
    case STORE_ALL_BANK_ACCOUNT_LIST:
      return {
        ...state,
        bankAccountList: action.payload,
      };
    case STORE_ALL_BANK_ACCOUNT_LIST_EXPORT:
      return {
        ...state,
        bankAccountListExport: action.payload.Data,
      };
    case OPEN_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG:
      return {
        ...state,
        openDeleteDialog: true,
        detailsForDelete: action.payload,
      };
    case CLOSE_SETTLEMENT_BANK_ACCOUNT_DELETE_DIALOG:
      return {
        ...state,
        openDeleteDialog: false,
      };
    default:
      return state;
  }
}
