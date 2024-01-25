import { STORE_ALL_VENDOR_INFO } from "../../../actions/types";

const initialState = {
  CompanyId: "",
  ClientId: "",
  Crid: "",
  VendorInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_ALL_VENDOR_INFO:
      // const tableData = lstBankAccountInformation.filter(row => row.Status !== 0); // 0 is for Deleted
      return {
        ...state,
        VendorInfo: action.payload.Data,
        ClientId: action.payload.Data.ClientId,
        CompanyId: action.payload.Data.ComapanyId,
        Crid: action.payload.Data.Crid,
      };
    case "FLUSH_VENDOR_INFORMATION":
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
