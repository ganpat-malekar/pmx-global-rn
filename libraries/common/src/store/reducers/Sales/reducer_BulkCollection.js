const initialState = {
  bulkCollectionTableData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "STORE_BULK_COLLECTION_TABLE_DATA":
      return {
        ...state,
        bulkCollectionTableData: action.payload,
      };
    case "CLEAR_BULK_COLLECTION_TABLE_DATA":
      return {
        ...state,
        bulkCollectionTableData: {},
      };
    default:
      return state;
  }
}
