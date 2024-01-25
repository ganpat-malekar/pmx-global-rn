/**
 * To view and download the file and manage the state of its modal
 * Stores in reducer -
 * filePopupReducer: state.filePopupReducer,
 *
 * @param {Object} payload - payload (MANDATORY)
 * @param {boolean} payload.isOpen - to open or close modal
 * @param {boolean} payload.isDownloadable - should we show download button?
 * @param {string} payload.content - base64 data
 * @param {string} payload.fileType - MIME type
 * @param {boolean} payload.shouldReset - If true, then we reset all modal state else, only open/close, don't flush data
 * @returns {undefined}
 */
export const handleFileModal = (payload) => (dispatch, getState) => {
  dispatch({
    type: "HANDLE_FILE_MODAL",
    payload,
  });
};

export const closeFileModal = (payload) => (dispatch, getState) => {
  dispatch({
    type: "CLOSE_FILE_MODAL",
    payload,
  });
};
