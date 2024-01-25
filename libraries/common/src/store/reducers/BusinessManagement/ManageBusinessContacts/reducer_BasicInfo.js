import {
  STORE_COMPANY_DETAILS,
  STORE_BASIC_INFO_RESPONSE,
  STORE_INTERNAL_KYC_API_RESPONSE,
  STORE_EXTERNAL_KYC_API_RESPONSE,
} from "../../../actions/types";

const initialState = {
  ClientAgencyName: null, // This is the Company Name, BeneficiaryName
  CompanyId: null,
  ClientId: null,
  ClientRelationShipNo: null,
  Crid: null,
  TaskId: null,
  CaseId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_COMPANY_DETAILS:
      return {
        ...state,
        ClientAgencyName: action.payload.ClientAgencyName,
        CompanyId: action.payload.CompanyId,
      };
    case STORE_BASIC_INFO_RESPONSE:
      const { ClientId, ClientRelationShipNo, Crid } = action.payload;
      return {
        ...state,
        ClientId,
        ClientRelationShipNo,
        Crid,
      };
    case STORE_INTERNAL_KYC_API_RESPONSE:
      return {
        ...state,
        TaskId: action.TaskId,
      };
    case STORE_EXTERNAL_KYC_API_RESPONSE:
      return {
        ...state,
        CaseId: action.CaseId,
      };
    default:
      return state;
  }
}
