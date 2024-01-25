import {
  STORE_KYC_DOCUMENT_DETAILS,
  STORE_KYC_DOCUMENT_FILE,
  UNSTORE_KYC_DOCUMENT_FILE,
  STORE_INDIVIDUAL_SHARE_HOLDERS,
  STORE_COMPANY_SHARE_HOLDERS,
  OPEN_FILE_VIEWER_POPUP,
  CLOSE_FILE_VIEWER_POPUP,
} from "../../../../actions/types";

const initailState = {
  BusinessProof: null,
  BankAccountProof: null,
  AddressProof: null,
  ShareHolder: null,
  Crid: null,
  ClientId: null,
  KycStatus: null,
  IsContact: null,
  KYCDocumentFile: null,
  IndividualShareHoldersData: [],
  CompanyShareHoldersData: [],
  showFileViewerPopup: false,
  CompanyTypeId: "",
  CategoryId: "",
  SubCategoryId: "",
  AllData: null,
};

export default function (state = initailState, action) {
  switch (action.type) {
    case STORE_KYC_DOCUMENT_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case STORE_KYC_DOCUMENT_FILE:
      return {
        ...state,
        KYCDocumentFile: action.payload,
      };
    case UNSTORE_KYC_DOCUMENT_FILE:
      return {
        ...state,
        KYCDocumentFile: null,
      };
    case STORE_INDIVIDUAL_SHARE_HOLDERS:
      return {
        ...state,
        IndividualShareHoldersData: action.payload,
      };
    case STORE_COMPANY_SHARE_HOLDERS:
      return {
        ...state,
        CompanyShareHoldersData: action.payload,
      };

    case OPEN_FILE_VIEWER_POPUP:
      return {
        ...state,
        showFileViewerPopup: true,
      };

    case CLOSE_FILE_VIEWER_POPUP:
      return {
        ...state,
        showFileViewerPopup: false,
        KYCDocumentFile: null,
      };
    default:
      return state;
  }
}
