import {
  STORE_BANK_ACCOUNT_COUNTRIES,
  STORE_BANK_ACCOUNT_BANKS,
  STORE_BANK_ACCOUNT_TABLE_DATA,
} from '../../../actions/types';
import _ from 'underscore';

const initialState = {
  countries: [],
  banks: [],
  tableData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_BANK_ACCOUNT_COUNTRIES:
      return {
        ...state,
        countries: action.payload.Data,
      };
    case STORE_BANK_ACCOUNT_BANKS:
      return {
        ...state,
        banks: action.payload.Data,
      };
    case STORE_BANK_ACCOUNT_TABLE_DATA:
      return {
        ...state,
        tableData: !_.isEmpty(action.payload.Data) ? action.payload.Data : [],
      };
    case 'FLUSH_BANK_ACCOUNT_TABLE_DATA':
      return {
        ...state,
        tableData: [],
      };
    default:
      return state;
  }
}
