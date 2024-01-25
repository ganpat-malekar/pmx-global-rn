import _ from "underscore";

import {
  STORE_CONTACT_TYPES,
  STORE_COMPANIES,
  STORE_MANAGE_CONTACT_LIST,
  STORE_MANAGE_CONTACT_EXPORT,
  STORE_VENDOR_VIEW_INFO,
  OPEN_DEACTIVATE_VENDOR_DIALOG,
  CLOSE_DEACTIVATE_VENDOR_DIALOG,
  OPEN_VIEW_VENDOR_DIALOG,
  CLOSE_VIEW_VENDOR_DIALOG,
  OPEN_DELETE_VENDOR_DIALOG,
  CLOSE_DELETE_VENDOR_DIALOG,
  OPEN_APPROVE_REJECT_VENDOR_MODAL,
  CLOSE_APPROVE_REJECT_VENDOR_MODAL,
} from "../../../actions/types";

const initialState = {
  companyList: [],
  contactTypeList: [],
  contactList: {},
  contactListExport: [],
  vendorViewInfo: {},
  deactivateVendorDialog: false,
  deactivateVendorData: {},
  viewVendorDialog: false,
  viewVendorData: {},
  deleteVendorDialog: false,
  deleteVendorData: {},
  approveRejectVendorDialog: false,
  approveRejectVendorData: {},
  viewOnly: false,
  requestType: "",
  bookAppointmentModalData: {
    isPromptOpen: false,
    apiData: {},
    submitToApi: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_COMPANIES:
      // console.log(action.payload);
      var company_array = [];
      action.payload
        .map(({ BasicInformation }) => ({
          ClientAgencyName: BasicInformation.ClientAgencyName,
          ClientId: BasicInformation.ClientId,
        }))
        .sort((a, b) =>
          a.ClientAgencyName.localeCompare(b.ClientAgencyName, "en", {
            sensitivity: "base",
          })
        )
        .forEach((element) => {
          company_array.push({
            ...element,
          });
        });
      return {
        ...state,
        companyList: company_array,
      };
    case STORE_CONTACT_TYPES:
      var contact_array = action.payload.Data.map(({ CodeName, DetailId }) => ({
        CodeName,
        DetailId,
      }));
      return {
        ...state,
        contactTypeList: contact_array,
      };
    case STORE_MANAGE_CONTACT_LIST:
      return {
        ...state,
        contactList: action.payload,
      };
    case STORE_MANAGE_CONTACT_EXPORT:
      return {
        ...state,
        contactListExport: action.payload,
      };
    case STORE_VENDOR_VIEW_INFO:
      return {
        ...state,
        viewVendorData: action.payload.data,
        viewOnly: action.payload.viewOnly,
        requestType: action.payload.requestType,
      };
    case OPEN_DEACTIVATE_VENDOR_DIALOG:
      return {
        ...state,
        deactivateVendorDialog: true,
        deactivateVendorData: action.payload,
      };
    case CLOSE_DEACTIVATE_VENDOR_DIALOG:
      return {
        ...state,
        deactivateVendorDialog: false,
        deactivateVendorData: {},
      };
    case OPEN_VIEW_VENDOR_DIALOG:
      return {
        ...state,
        viewVendorDialog: true,
      };
    case CLOSE_VIEW_VENDOR_DIALOG:
      return {
        ...state,
        viewVendorDialog: false,
        viewVendorData: {},
        viewOnly: false,
      };
    case OPEN_DELETE_VENDOR_DIALOG:
      return {
        ...state,
        deleteVendorDialog: true,
        deleteVendorData: action.payload,
      };
    case CLOSE_DELETE_VENDOR_DIALOG:
      return {
        ...state,
        deleteVendorDialog: false,
        deleteVendorData: {},
      };
    case OPEN_APPROVE_REJECT_VENDOR_MODAL:
      return {
        ...state,
        approveRejectVendorDialog: true,
        approveRejectVendorData: action.payload,
      };
    case CLOSE_APPROVE_REJECT_VENDOR_MODAL:
      return {
        ...state,
        approveRejectVendorDialog: false,
        approveRejectVendorData: {},
      };
    case "OPEN_BOOK_APPOINTMENT_MODAL":
      return {
        ...state,
        bookAppointmentModalData: action.payload,
      };
    case "CLOSE_BOOK_APPOINTMENT_MODAL":
      return {
        ...state,
        bookAppointmentModalData: { ...initialState.bookAppointmentModalData },
      };

    default:
      return state;
  }
}
