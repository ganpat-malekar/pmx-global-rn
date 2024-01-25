import {
  SEARCH_ALL_BUSINESS,
  STORE_COLLECTION_PAYMENTS,
  STORE_PAYABLE_PAYMENTS,
  STORE_TAXABLE_PAYMENTS,
  STORE_SETTLEMENT_TRANSACTION_VIEW_HISTORY,
  OPEN_VIEW_SETTLEMENT_DIALOG,
  CLOSE_VIEW_SETTLEMENT_DIALOG,
} from "../../actions/types";
import _ from "underscore";

const initialState = {
  searchAllBusinessList: [],
  collectionPaymentList: [],
  pgTransactionList: [],
  payablePaymentList: [],
  taxablePaymentList: [],
  settlementInfo: [],
  settlementTransactionViewHistoryList: [],
  openViewSettlementDialog: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ALL_BUSINESS:
      var business_name_array = [];
      if (!_.isEmpty(action.payload.Data)) {
        action.payload.Data.sort((a, b) =>
          a.CompanyName.localeCompare(b.CompanyName, "en", {
            sensitivity: "base",
          })
        ).forEach((element) => {
          business_name_array.push({
            ...element,
            label: element.CompanyName,
            id: element.CompanyId,
          });
        });
      }
      return {
        ...state,
        searchAllBusinessList: business_name_array,
      };
    case STORE_COLLECTION_PAYMENTS:
      return {
        ...state,
        collectionPaymentList: action.payload,
      };
    case STORE_PAYABLE_PAYMENTS:
      return {
        ...state,
        payablePaymentList: action.payload,
      };
    case STORE_TAXABLE_PAYMENTS:
      return {
        ...state,
        taxablePaymentList: action.payload,
      };
    case STORE_SETTLEMENT_TRANSACTION_VIEW_HISTORY:
      return {
        ...state,
        settlementTransactionViewHistoryList: action.payload,
      };
    case OPEN_VIEW_SETTLEMENT_DIALOG:
      return {
        ...state,
        openViewSettlementDialog: true,
      };
    case CLOSE_VIEW_SETTLEMENT_DIALOG:
      return {
        ...state,
        openViewSettlementDialog: false,
        settlementInfo: [],
      };
    default:
      return state;
  }
}
