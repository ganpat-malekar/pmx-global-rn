import _ from 'underscore';

import { encryptAES } from '@paymate/common/helpers';

import {
  STORE_BUSINESS_LIST,
  STORE_CONTACT_LIST,
  SAVE_COUNTRY_METADATA_LIST,
  SAVE_EMIRATES_METADATA_LIST,
  SAVE_BANK_METADATA_LIST,
  STORE_CURRENCY_LIST,
  STORE_PAYMENT_TYPES,
  STORE_TYPES,
  STORE_PAY_THROUGH_LIST,
  STORE_MDR_CHARGE_LIST,
  STORE_VENDOR_PAYMENTS_MODES,
  STORE_VENDOR_PAYMENT_THROUGH,
  STORE_REGISTRAR_MASTER,
  STORE_STATUS_CODES,
  STORE_COMPANY_CURRENCY_LIST,
  STORE_CURRENCY_BY_PAYMENT_TYPE_LIST,
} from '../../../actions/types';

const Types = {
  1: 'CommissionType',
  2: 'BusinessMode',
  3: 'ChannelPartner',
  4: 'ServiceMode',
  5: 'ContactType',
  6: 'Discounting',
  7: 'WebSubscription',
  8: 'ApiSubscription',
  9: 'CardType',
  10: 'SubscriptionType',
  11: 'SubscriptionCategory',
  12: 'RiskCompliance',
  120: 'PromoTypesCode',
  17: 'NetworkType',
};

const codeTypes = {
  RLT: 'LeaseType',
  FRQ: 'FrequencyType',
};

const initialState = {
  businessList: [], // List of onboarded companies in the system
  contactList: [], // List of onboarded contacts in the system
  countriesMetadata: [], // List of countries in the system
  emiratesMetadata: [], // List of emirates/states in the system for UAE
  banksMetadata: [], // List of banks of their metadata
  currencyList: [],
  vendorList: [],
  paymentTypeList: [],
  companyCurrencyList: [],
  typesList: {
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
    RiskCompliance: [],
    PromoTypesCode: [],
    NetworkType: [],
  },
  payThroughList: [],
  paymentTypes: [],
  vendorPaymentsModes: [],
  vendorPaymentThrough: [],
  registrarMaster: [],
  statusCodesList: {
    BusinessSubscription: [],
    VendorSubscription: [],
    BusinessDocumentStatus: [],
    BusinessCompanyStatus: [],
    BusinessSubscriptionStatus: [],
    BusinessManageUsers: [],
    VendorKycStatus: [],
    VendorCompanyStatus: [],
    EventLogs: [],
    Incidents: [],
    IncidentsType: [],
    RegisteredProperty: [],
    RegisteredTenant: [],
    BusinsessTrackRent: [],
    ReportsCollection: [],
    TenantrequestRecived: [],
  },
  registrarGateway: [],
  searchedBusinessList: [], // List of business for vendor user dropdown
  currencyByPaymentTypesList: [],
  companyBalance: {},
  codeDetails: {
    // For rent collection dropdowns
    LeaseType: [],
    FrequencyType: [],
  },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_BUSINESS_LIST:
      var business_name_array = [];
      if (!_.isEmpty(action.payload.Data)) {
        action.payload.Data.sort((a, b) =>
          a.CompanyName.localeCompare(b.CompanyName, 'en', {
            sensitivity: 'base',
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
        businessList: business_name_array,
      };
    case STORE_CONTACT_LIST:
      var contact_array = [];
      if (!_.isEmpty(action.payload.Data)) {
        action.payload.Data.sort((a, b) =>
          a.ClientAgencyName.localeCompare(b.ClientAgencyName, 'en', {
            sensitivity: 'base',
          })
        ).forEach((element) => {
          contact_array.push({
            ...element,
            label: element.ClientAgencyName,
            id: encryptAES(element.ClientID),
          });
        });
      }
      return {
        ...state,
        contactList: contact_array,
      };
    case 'STORE_SEARCH_BUSINESS_LIST_DATA':
      var array = [];
      if (!_.isEmpty(action.payload.Data)) {
        action.payload.Data.sort((a, b) =>
          a.CompanyName.localeCompare(b.CompanyName, 'en', {
            sensitivity: 'base',
          })
        ).forEach((element) => {
          array.push({
            ...element,
            label: element.CompanyName,
            id: encryptAES(element.ClientId),
          });
        });
      }
      return {
        ...state,
        searchedBusinessList: array,
      };
    case SAVE_COUNTRY_METADATA_LIST:
      return {
        ...state,
        countriesMetadata: action.payload,
      };
    case SAVE_EMIRATES_METADATA_LIST:
      return {
        ...state,
        emiratesMetadata: action.payload,
      };
    case SAVE_BANK_METADATA_LIST:
      return {
        ...state,
        banksMetadata: action.payload,
      };
    case STORE_CURRENCY_LIST:
      return {
        ...state,
        currencyList: action.payload.Data,
      };
    case STORE_PAYMENT_TYPES:
      return {
        ...state,
        paymentTypeList: action.payload.Data,
      };
    case STORE_TYPES:
      // checking for string or number
      const type = isNaN(Number(action.payload.type))
        ? action.payload.type
        : Types[action.payload.type];

      return {
        ...state,
        typesList: { ...state.typesList, [type]: action.payload.Data },
      };
    case STORE_PAY_THROUGH_LIST:
      return {
        ...state,
        payThroughList: action.payload.Data,
      };
    case STORE_MDR_CHARGE_LIST:
      return {
        ...state,
        mdrCharges: action.payload.Data,
      };
    case STORE_VENDOR_PAYMENTS_MODES:
      return {
        ...state,
        vendorPaymentsModes: action.payload.Data,
      };
    case STORE_VENDOR_PAYMENT_THROUGH:
      return {
        ...state,
        vendorPaymentThrough: action.payload.Data,
      };
    case STORE_REGISTRAR_MASTER:
      return {
        ...state,
        registrarMaster: action.payload,
      };
    case STORE_STATUS_CODES:
      const reportName = action.payload.ReportName;
      return {
        ...state,
        statusCodesList: {
          ...state.statusCodesList,
          [reportName]: action.payload.Data,
        },
      };
    case STORE_COMPANY_CURRENCY_LIST:
      return {
        ...state,
        companyCurrencyList: action.payload.Data,
      };
    case 'STORE_REGISTRAR_GATEWAY':
      return {
        ...state,
        registrarGateway: action.payload.Data,
      };
    case STORE_CURRENCY_BY_PAYMENT_TYPE_LIST:
      return {
        ...state,
        currencyByPaymentTypesList: action.payload,
      };
    case 'STORE_COMPANY_BALANCE':
      return {
        ...state,
        companyBalance: action.payload,
      };
    case 'STORE_CODE_DETAILS':
      return {
        ...state,
        codeDetails: {
          ...state.codeDetails,
          [codeTypes[action.payload.type]]: action.payload.Data,
        },
      };
    default:
      return state;
  }
}
