/**
 * To view all columns of a row, if not fitting in the current screen size.
 * Stores in reducer -
 * viewColumns: state.viewColumns,
 *
 * @param {Object} payload - payload (MANDATORY)
 * @param {string} payload.title - Title for the modal, defaul is "All Columns"
 * @param {Array} payload.columnNames - Array of strings, Names of columns in desired order
 * @param {Array} payload.columnData - Array of strings/objects. Must be in the same order as comumnNames
 * @param {boolean} payload.isModalOpen - state of the modal
 * @returns {undefined}
 */
export const openViewColumnModal = (payload) => (dispatch, getState) => {
  dispatch({
    type: "OPEN_VIEW_COLUMN_DIALOG_BOX",
    payload,
  });
};

export const closeViewColumnModal = (payload) => (dispatch, getState) => {
  dispatch({
    type: "CLOSE_VIEW_COLUMN_DIALOG_BOX",
    payload,
  });
};
