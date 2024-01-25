const initialState = {
  formEditData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_EDIT_GIBAN_FORM_DATA":
      return {
        ...state,
        formEditData: action.payload.Data,
      };
    case "FLUSH_EDIT_GIBAN_FORM_DATA":
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
