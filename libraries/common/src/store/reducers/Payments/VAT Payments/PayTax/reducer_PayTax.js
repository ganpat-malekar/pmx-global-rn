const initialState = {
  editData: {},
  payTaxTableData: {},
  businessDropdown: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_TAX_PAYMENT_EDIT_DATA":
      return {
        ...state,
        editData: action.payload,
      };
    case "FLUSH_TAX_PAYMENT_EDIT_DATA":
      return {
        ...state,
        editData: {},
      };
    case "STORE_TAX_PAYMENT_TABLE_DATA":
      return {
        ...state,
        payTaxTableData: action.payload,
      };
    case "STORE_PAYTAX_BUSINESS_DROPDOWN":
      return {
        ...state,
        businessDropdown: action.payload.Data,
      };
    default:
      return state;
  }
}
