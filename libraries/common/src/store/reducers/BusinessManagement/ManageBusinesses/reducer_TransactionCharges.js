import _ from "underscore";

import {
  ADD_ACQUIRING_BANKS,
  ADD_ISSUING_BANKS,
  ADD_ISSUING_BANK_RELATIONSHIP_USERS,
  ADD_REGISTRAR_GATEWAYS,
  ADD_COMPANY_CURRENCIES,
  ADD_COUNTRY_WISE_TAXES,
  ADD_SETTLEMENT_BANKS,
  STORE_TRANSACTION_CHARGES_TABLE_DATA,
  STORE_SETTLEMENT_CHARGES_TABLE_DATA,
  STORE_GATEWAY_CHARGES_HISTORY,
} from "../../../actions/types";

const initialState = {
  acquiringBanks: [],
  issuingBanks: [],
  issuingBankRelationshipUsers: [],
  registrarGatEways: [],
  companyCurrencies: [],
  countryWiseTaxes: [],
  settlementBanks: [],
  transactionChargesTableData: [],
  settlementChargesTableData: [],
  gatewayChargesHistory: [],
  showGatewayChargesPopup: false,
  settlementChargeModes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ACQUIRING_BANKS:
      return {
        ...state,
        acquiringBanks: action.acquiringBanks,
      };
    case ADD_ISSUING_BANKS:
      return {
        ...state,
        issuingBanks: action.issuingBanks,
      };
    case ADD_ISSUING_BANK_RELATIONSHIP_USERS:
      return {
        ...state,
        issuingBankRelationshipUsers: action.issuingBankRelationshipUsers,
      };
    case ADD_REGISTRAR_GATEWAYS:
      return {
        ...state,
        registrarGateways: action.registrarGateways,
      };
    case ADD_COMPANY_CURRENCIES:
      return {
        ...state,
        companyCurrencies: action.companyCurrencies,
      };
    case ADD_COUNTRY_WISE_TAXES:
      return {
        ...state,
        countryWiseTaxes: action.countryWiseTaxes,
      };
    case ADD_SETTLEMENT_BANKS:
      return {
        ...state,
        settlementBanks: action.settlementBanks,
      };
    case STORE_TRANSACTION_CHARGES_TABLE_DATA:
      return {
        ...state,
        transactionChargesTableData: action.payload,
      };
    case STORE_SETTLEMENT_CHARGES_TABLE_DATA:
      return {
        ...state,
        settlementChargesTableData: action.payload,
      };
    case STORE_GATEWAY_CHARGES_HISTORY:
      console.log("called");
      return {
        ...state,
        gatewayChargesHistory: action.payload,
      };
    case "STORE_SETTLEMENT_CHARGE_MODES":
      // Finally, store in reducer
      // ?. optional chaining is not support in this react-script version
      // Getting all unique objects based on ChargesModeId and must have only two properties
      let data = action.payload.Data;
      data = !_.isEmpty(data) ? data : [];
      let arr = data.map(({ ChargesModeName, ChargesModeId }) => ({
        CodeName: ChargesModeName,
        DetailId: ChargesModeId,
      }));
      let chargeModes = arr.filter(
        (v, i, a) => a.findIndex((t) => t.DetailId === v.DetailId) === i
      );
      console.log(chargeModes);
      return {
        ...state,
        settlementChargeModes: chargeModes,
      };
    default:
      return state;
  }
}
