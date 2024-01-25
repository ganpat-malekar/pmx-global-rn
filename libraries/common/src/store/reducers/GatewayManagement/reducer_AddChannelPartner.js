import {
  STORE_CHANNEL_PARTNER_REGISTRARS,
  STORE_CHANNEL_PARTNER_CHARGE_TYPES,
  STORE_CHANNEL_PARTNER_CHARGE_BANKS,
  STORE_CHANNEL_PARTNER_PROCESSING_TYPES,
  STORE_CHANNEL_PARTNER_FETCHED_FORM_DATA,
} from "../../actions/types";
import _ from "underscore";

const initialState = {
  registrars: [],
  chargeTypes: [],
  banks: [],
  processingTypes: [],
  fetchedFormData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_CHANNEL_PARTNER_REGISTRARS:
      return {
        ...state,
        registrars: action.payload.Data,
      };
    case STORE_CHANNEL_PARTNER_CHARGE_TYPES:
      return {
        ...state,
        chargeTypes: action.payload.Data,
      };
    case STORE_CHANNEL_PARTNER_CHARGE_BANKS:
      return {
        ...state,
        banks: action.payload.Data,
      };
    case STORE_CHANNEL_PARTNER_PROCESSING_TYPES:
      const { Data, BankType } = action.payload;
      const processingTypes_array =
        BankType !== "Acquiring Bank"
          ? Data.filter((item) => item.CodeName === "EFT")
          : Data;
      return {
        ...state,
        processingTypes: processingTypes_array,
      };
    case STORE_CHANNEL_PARTNER_FETCHED_FORM_DATA:
      const formData = action.payload.Data[0];
      return {
        ...state,
        fetchedFormData: formData,
      };
    default:
      return state;
  }
}
