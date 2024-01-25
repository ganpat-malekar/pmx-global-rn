import _ from "underscore";

import {
  MANAGE_BUSINESS_DATATABLE,
  GET_SALES_REPRESENTATIVE,
  GET_BUSINESS_INFORMATION,
  OPEN_VIEW_BUSINESS_DIALOG,
  CLOSE_VIEW_BUSINESS_DIALOG,
  ACTIVATE_BUSINESS,
  DELETE_BUSINESS,
  DEACTIVATE_BUSINESS,
  ASSIGN_TO_SALES_TEAM,
  OPEN_COMPANY_STATUS_DIALOG,
  CLOSE_COMPANY_STATUS_DIALOG,
  GET_BUSINESS_CONFIGURATIONS_TO_EXPORT,
  FLUSH_BUSINESS_CONFIGURATIONS_TO_EXPORT,
  OPEN_KYC_VERIFICATION_DIALOG,
  CLOSE_KYC_VERIFICATION_DIALOG,
  FETCH_KYC_DOCUMENT_DETAILS,
  FETCH_KYC_SINGLE_DOCUMENT_DETAILS,
  FLUSH_KYC_SINGLE_DOCUMENT_DETAILS,
  FETCH_AML_PROFILES,
  OPEN_AML_PROFILES_DIALOG,
  CLOSE_AML_PROFILES_DIALOG,
  CLOSE_AML_REMARK_DIALOG,
  OPEN_AML_REMARK_DIALOG,
  RESOLVE_AML_PROFILES,
  SUBMIT_AML_PROFILE_FEEDBACK,
  RESET_API_STATUS,
  OPEN_CHARGED_SETTINGS_DIALOG,
  CLOSE_CHARGED_SETTINGS_DIALOG,
} from "../../../actions/types";

const initialState = {
  business_configurations: [],
  business_configurations_to_export: [],
  business_names: [],
  sales_representative: [],
  totalRecords: 0,
  apiStatus: null,
  openViewBusinessDialog: false,
  business_information: {},
  viewOnly: true,
  companyStatusDialog: false,
  companyStatusData: {},
  kycVerificationDialog: false,
  kycVerificationDetails: [],
  singleKycDocumentDetail: [],
  amlProfiles: {},
  openAmlProfilesDialog: false,
  openAmlRemarkDialog: false,
  viewOnlyAmlProfiles: false,
  session_crid: "",
  refresh: false,
  openChargedSettingsDialog: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MANAGE_BUSINESS_DATATABLE:
      var business_name_array = [];
      if (!_.isEmpty(action.payload.Data)) {
        action.payload.Data.forEach((element) => {
          business_name_array.push({
            label: element.CompanyName,
            id: element.CompanyId,
          });
        });
      }
      return {
        ...state,
        business_configurations: action.payload.Data,
        business_names: business_name_array,
        totalRecords: action.payload.TotalRecords,
        apiStatus: action.payload.Status,
      };
    case RESET_API_STATUS:
      return {
        ...state,
        apiStatus: null,
      };
    case GET_BUSINESS_CONFIGURATIONS_TO_EXPORT:
      console.log(action.payload);
      return {
        ...state,
        business_configurations_to_export: action.payload,
      };
    case FLUSH_BUSINESS_CONFIGURATIONS_TO_EXPORT:
      console.log(action.payload);
      return {
        ...state,
        business_configurations_to_export: [],
      };
    case GET_BUSINESS_INFORMATION:
      return {
        ...state,
        business_information: action.payload.data,
        viewOnly: action.payload.viewOnly,
      };
    case GET_SALES_REPRESENTATIVE:
      return {
        ...state,
        sales_representative: action.Data,
      };
    case OPEN_VIEW_BUSINESS_DIALOG:
      return {
        ...state,
        openViewBusinessDialog: true,
      };
    case CLOSE_VIEW_BUSINESS_DIALOG:
      return {
        ...state,
        openViewBusinessDialog: false,
        business_information: {},
        viewOnly: true,
      };
    case OPEN_COMPANY_STATUS_DIALOG:
      return {
        ...state,
        companyStatusDialog: true,
        companyStatusData: action.payload,
      };
    case FETCH_KYC_DOCUMENT_DETAILS:
      return {
        ...state,
        kycVerificationDetails: action.payload,
        session_crid: action.session_crid,
      };
    case FETCH_KYC_SINGLE_DOCUMENT_DETAILS:
      return { ...state, singleKycDocumentDetail: action.payload };
    case FLUSH_KYC_SINGLE_DOCUMENT_DETAILS:
      return { ...state, singleKycDocumentDetail: [] };
    case CLOSE_COMPANY_STATUS_DIALOG:
      return { ...state, companyStatusDialog: false, companyStatusData: {} };
    case ACTIVATE_BUSINESS:
      return { ...state, companyStatusDialog: false };
    case DELETE_BUSINESS:
      return { ...state, companyStatusDialog: false, refresh: true };
    case DEACTIVATE_BUSINESS:
      return { ...state, companyStatusDialog: false };
    case ASSIGN_TO_SALES_TEAM:
      return { ...state, companyStatusDialog: false };
    case OPEN_KYC_VERIFICATION_DIALOG:
      return { ...state, kycVerificationDialog: true };
    case CLOSE_KYC_VERIFICATION_DIALOG:
      return {
        ...state,
        kycVerificationDialog: false,
        kycVerificationDetails: [],
        session_crid: "",
      };
    case FETCH_AML_PROFILES:
      return {
        ...state,
        amlProfiles: action.payload,
      };
    case OPEN_AML_PROFILES_DIALOG:
      return {
        ...state,
        openAmlProfilesDialog: true,
        viewOnlyAmlProfiles: action.payload,
      };
    case CLOSE_AML_PROFILES_DIALOG:
      return {
        ...state,
        openAmlProfilesDialog: false,
        amlProfiles: {},
        viewOnlyAmlProfiles: false,
      };
    case OPEN_AML_REMARK_DIALOG:
      return {
        ...state,
        openAmlRemarkDialog: true,
      };
    case CLOSE_AML_REMARK_DIALOG:
      return {
        ...state,
        openAmlRemarkDialog: false,
      };
    case SUBMIT_AML_PROFILE_FEEDBACK:
      return {
        ...state,
        openAmlRemarkDialog: false,
        openAmlProfilesDialog: false,
        amlProfiles: {},
      };
    case OPEN_CHARGED_SETTINGS_DIALOG:
      return {
        ...state,
        openChargedSettingsDialog: true,
      };
    case CLOSE_CHARGED_SETTINGS_DIALOG:
      return {
        ...state,
        openChargedSettingsDialog: false,
        business_information: {},
      };
    default:
      return state;
  }
}
