import { encryptAES } from "../../../../helper/cryptography";
import _ from "underscore";

const initialState = {
  riskHistory: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_RISK_COMPLIANCE_HISTORY":
      return {
        ...state,
        riskHistory: action.payload.Data,
      };
    case "FLUSH_RISK_COMPLIANCE_HISTORY":
      return {
        ...state,
        riskHistory: [],
      };
    default:
      return state;
  }
}
