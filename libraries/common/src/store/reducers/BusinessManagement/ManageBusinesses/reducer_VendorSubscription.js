import _ from "underscore";

const initialState = {
  vendorData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SAVE_VENDOR_SUBSCRIPTOIN_INFO":
      return {
        ...state,
        vendorData: action.payload,
      };
    default:
      return state;
  }
}
