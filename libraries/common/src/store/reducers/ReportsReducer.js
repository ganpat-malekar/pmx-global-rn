import _ from "underscore";

import {
  STORE_COLLECTIONS_REPORTS_STATUS_CODES,
  STORE_PAYMENTS_REPORTS_STATUS_CODES,
  STORE_GATEWAY_REPORTS_STATUS_CODES,
  STORE_SETTLEMENT_REPORTS_STATUS_CODES,
  STORE_PAYMENT_RECEIVED_REPORT,
  STORE_PAYMENT_RECEIVED_REPORT_EXPORT,
  STORE_MAKE_PAYMENTS_REPORT,
  STORE_MAKE_PAYMENTS_REPORT_EXPORT,
  STORE_GATEWAY_TRANSACTION_BUSINESS_REPORT,
  STORE_GATEWAY_TRANSACTION_BUSINESS_REPORT_EXPORT,
  STORE_BUSINESS_SUBSCRIPTION_REPORT,
  STORE_BUSINESS_SUBSCRIPTION_REPORT_EXPORT,
  STORE_ACCOUNT_BALANCE_HISTORY_REPORT,
  STORE_ACCOUNT_BALANCE_HISTORY_REPORT_EXPORT,
  STORE_VENDOR_SUBSCRIPTION_REPORT,
  STORE_VENDOR_SUBSCRIPTION_REPORT_EXPORT,
  STORE_SETTLEMENT_TRANSACTION_REPORT,
  STORE_SETTLEMENT_TRANSACTION_REPORT_EXPORT,
  STORE_RECEIVED_PAYMENT_VIEW_SUMMARY_REPORT,
  STORE_MAKE_PAYMENT_HISTORY,
  STORE_MAKE_PAYMENT_HISTORY_GRID,
  STORE_INVOICE_ATTACHMENT,
  FETCH_VENDORS_BY_COMPANY,
  OPEN_VIEW_COLLECTION_DIALOG,
  CLOSE_VIEW_COLLECTION_DIALOG,
  CLOSE_VIEW_PAYMENT_DIALOG,
  OPEN_VIEW_PAYMENT_DIALOG,
  OPEN_VIEW_GATEWAY_SUMMARY_DIALOG,
  CLOSE_VIEW_GATEWAY_SUMMARY_DIALOG,
  STORE_TAX_PAYMENT_REPORT,
  STORE_REGISTERED_BUSINESS_REPORT,
  STORE_MADE_PAYMENTS_REPORT,
  OPEN_DOWNLOAD_ATTACHMENT_DIALOG,
  CLOSE_DOWNLOAD_ATTACHMENT_DIALOG,
  STORE_GIBAN_DETAILS,
  STORE_DISCOUNTING_REPORTS,
  STORE_MANAGE_CONTRACTS,
  STORE_PAYMENT_RECEIVED_VENDOR_REPORTS,
  STORE_VENDOR_PAYMENTS_REPORTS_STATUS_CODES,
  STORE_RENT_COLLECTION_REPORTS,
} from "../actions/types";

const initialState = {
  collectionStatusList: [],
  paymentStatusList: [],
  vendorPaymentStatusList: [],
  gatewayStatusList: [],
  settlementStatusList: [],
  collectionList: {},
  collectionListExport: [],
  paymentList: {},
  paymentListExport: [],
  gatewayTransactionList: {},
  gatewayTransactionListExport: [],
  businessSubscriptionList: {},
  businessSubscriptionListExport: [],
  accountBalanceHistoryList: {},
  accountBalanceHistoryListExport: [],
  vendorSubscriptionList: {},
  vendorSubscriptionListExport: [],
  settlementTransactionList: {},
  settlementTransactionListExport: [],
  receivedPaymentSummaryReport: {},
  makePaymentHistory: {},
  makePaymentHistoryGrid: {},
  gatewayTransactionExtraData: {},
  invoiceAttachment: {},
  vendorsList: [],
  openViewCollectionDialog: false,
  openViewPaymentDialog: false,
  openDownloadAttachmentDialog: false,
  openViewGatewaySummaryDialog: false,
  taxPaymentList: [],
  gibanDetailsList: [],
  registeredBusinessList: [],
  madePaymentsList: {},
  settlementBanks: [],
  discountingReportsList: null,
  manageContractsList: [],
  paymentReceivedVendorReportsList: [],
  rentCollectionReportsList: [],
  tenantRentPaymentReportResponse: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_COLLECTIONS_REPORTS_STATUS_CODES:
      return {
        ...state,
        collectionStatusList: action.payload.Data,
      };
    case STORE_PAYMENTS_REPORTS_STATUS_CODES:
      return {
        ...state,
        paymentStatusList: action.payload.Data,
      };
    case STORE_VENDOR_PAYMENTS_REPORTS_STATUS_CODES:
      return {
        ...state,
        vendorPaymentStatusList: action.payload.Data,
      };
    case STORE_GATEWAY_REPORTS_STATUS_CODES:
      return {
        ...state,
        gatewayStatusList: action.payload.Data,
      };
    case STORE_SETTLEMENT_REPORTS_STATUS_CODES:
      return {
        ...state,
        settlementStatusList: action.payload.Data,
      };
    case STORE_PAYMENT_RECEIVED_REPORT:
      return {
        ...state,
        collectionList: action.payload,
      };
    case STORE_PAYMENT_RECEIVED_REPORT_EXPORT:
      return {
        ...state,
        collectionListExport: action.payload,
      };
    case STORE_MAKE_PAYMENTS_REPORT:
      return {
        ...state,
        paymentList: action.payload,
      };
    case STORE_MAKE_PAYMENTS_REPORT_EXPORT:
      return {
        ...state,
        paymentListExport: action.payload,
      };
    case STORE_GATEWAY_TRANSACTION_BUSINESS_REPORT:
      return {
        ...state,
        gatewayTransactionList: action.payload,
      };
    case STORE_GATEWAY_TRANSACTION_BUSINESS_REPORT_EXPORT:
      return {
        ...state,
        gatewayTransactionListExport: action.payload,
      };
    case STORE_BUSINESS_SUBSCRIPTION_REPORT:
      return {
        ...state,
        businessSubscriptionList: action.payload,
      };
    case STORE_BUSINESS_SUBSCRIPTION_REPORT_EXPORT:
      return {
        ...state,
        businessSubscriptionListExport: action.payload,
      };
    case STORE_ACCOUNT_BALANCE_HISTORY_REPORT:
      return {
        ...state,
        accountBalanceHistoryList: action.payload,
      };
    case STORE_ACCOUNT_BALANCE_HISTORY_REPORT_EXPORT:
      return {
        ...state,
        accountBalanceHistoryListExport: action.payload,
      };
    case STORE_VENDOR_SUBSCRIPTION_REPORT:
      return {
        ...state,
        vendorSubscriptionList: action.payload,
      };
    case STORE_VENDOR_SUBSCRIPTION_REPORT_EXPORT:
      return {
        ...state,
        vendorSubscriptionListExport: action.payload,
      };
    case STORE_SETTLEMENT_TRANSACTION_REPORT:
      return {
        ...state,
        settlementTransactionList: action.payload,
      };
    case STORE_SETTLEMENT_TRANSACTION_REPORT_EXPORT:
      return {
        ...state,
        settlementTransactionListExport: action.payload,
      };
    case STORE_RECEIVED_PAYMENT_VIEW_SUMMARY_REPORT:
      return {
        ...state,
        receivedPaymentSummaryReport: action.payload,
      };
    case STORE_MAKE_PAYMENT_HISTORY:
      return {
        ...state,
        makePaymentHistory: action.payload,
      };
    case STORE_MAKE_PAYMENT_HISTORY_GRID:
      return {
        ...state,
        makePaymentHistoryGrid: action.payload,
      };
    case STORE_INVOICE_ATTACHMENT:
      return {
        ...state,
        invoiceAttachment: action.payload,
      };
    case FETCH_VENDORS_BY_COMPANY:
      console.log(action.payload);
      return {
        ...state,
        vendorsList: action.payload,
      };
    case OPEN_VIEW_COLLECTION_DIALOG:
      return {
        ...state,
        openViewCollectionDialog: true,
      };
    case CLOSE_VIEW_COLLECTION_DIALOG:
      return {
        ...state,
        openViewCollectionDialog: false,
      };
    case OPEN_VIEW_PAYMENT_DIALOG:
      return {
        ...state,
        openViewPaymentDialog: true,
      };
    case CLOSE_VIEW_PAYMENT_DIALOG:
      return {
        ...state,
        openViewPaymentDialog: false,
      };
    case OPEN_DOWNLOAD_ATTACHMENT_DIALOG:
      return {
        ...state,
        openDownloadAttachmentDialog: true,
      };
    case CLOSE_DOWNLOAD_ATTACHMENT_DIALOG:
      return {
        ...state,
        openDownloadAttachmentDialog: false,
      };
    case OPEN_VIEW_GATEWAY_SUMMARY_DIALOG:
      return {
        ...state,
        openViewGatewaySummaryDialog: true,
        gatewayTransactionExtraData: action.payload,
      };
    case CLOSE_VIEW_GATEWAY_SUMMARY_DIALOG:
      return {
        ...state,
        openViewGatewaySummaryDialog: false,
        gatewayTransactionExtraData: {},
      };
    case STORE_TAX_PAYMENT_REPORT:
      return {
        ...state,
        taxPaymentList: action.payload,
      };
    case STORE_GIBAN_DETAILS:
      return {
        ...state,
        gibanDetailsList: action.payload,
      };
    case STORE_REGISTERED_BUSINESS_REPORT:
      return {
        ...state,
        registeredBusinessList: action.payload,
      };
    case STORE_MADE_PAYMENTS_REPORT:
      return {
        ...state,
        madePaymentsList: action.payload,
      };
    case STORE_DISCOUNTING_REPORTS:
      return {
        ...state,
        discountingReportsList: action.payload,
      };
    case STORE_MANAGE_CONTRACTS:
      return {
        ...state,
        manageContractsList: action.payload,
      };
    case STORE_PAYMENT_RECEIVED_VENDOR_REPORTS:
      return {
        ...state,
        paymentReceivedVendorReportsList: action.payload,
      };
    case STORE_RENT_COLLECTION_REPORTS:
      return {
        ...state,
        rentCollectionReportsList: action.payload,
      };
    case "STORE_TENANT_PAYMENTS_REPORT_RESPONSE":
      return {
        ...state,
        tenantRentPaymentReportResponse: action.payload,
      };
    default:
      return state;
  }
}
