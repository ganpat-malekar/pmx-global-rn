import { encryptAES } from '@paymate/common/helpers';
import {
  STORE_PAYMENT_EDIT_DATA,
  FLUSH_PAYMENT_EDIT_DATA,
  STORE_MAKE_A_PAYMENT_TABLE_DATA,
} from '../../actions/types';
import _ from 'underscore';

const initialState = {
  editData: {},
  paymentsTableData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PAYMENT_EDIT_DATA:
      return {
        ...state,
        editData: action.payload,
      };
    case FLUSH_PAYMENT_EDIT_DATA:
      return {
        ...state,
        editData: {},
      };
    case STORE_MAKE_A_PAYMENT_TABLE_DATA:
      return {
        ...state,
        paymentsTableData: action.payload,
      };
    default:
      return state;
  }
}
