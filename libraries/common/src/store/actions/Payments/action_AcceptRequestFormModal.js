/**
 * Stores in reducer -
 * acceptRequestFormModal: state.acceptRequestFormModal
 *
 * @param {Object} payload - payload (MANDATORY)
 * @param {string} payload.title
 * @param {boolean} payload.isOpen - to open or close modal
 * @returns {undefined}
 */
export const handleModal = (payload) => (dispatch, getState) => {
  dispatch({
    type: "HANDLE_ACCEPT_REQUEST_FORM_MODAL",
    payload,
  });
};
