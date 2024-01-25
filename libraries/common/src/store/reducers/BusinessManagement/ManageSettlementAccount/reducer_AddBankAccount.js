import _ from "underscore";

const initialState = {
  countries: [],
  banks: [],
  businessDetails: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_BUSINESS_DETAILS":
      return {
        ...state,
        businessDetails: action.payload.businessDetails,
      };
    default:
      return state;
  }
}
