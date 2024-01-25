import { showAlert } from "../store/actions/UIActions";
import { clearLoggedInUser, signOut } from "../store/actions/adminActions";

export default (error, dispatch) => {
  if (error.response) {
    // Request made and server responded
    let { status, data, statusText } = error.response;
    if (
      // status === 401 ||
      status === 404 &&
      data.Message === "Token Not found"
    ) {
      dispatch(clearLoggedInUser());
      dispatch({ type: "FLUSH_AUTHENTICATION" });
      const message = "Session was expired";

      dispatch(
        showAlert({
          type: "danger",
          message: `Error: ${error.response.status} - ${message}`,
        })
      );
    }
    if (status === 404) {
      console.log(`Error: ${status} - ${statusText}`);
    } else {
      dispatch(
        showAlert({
          type: "danger",
          message: `Error: ${status} - ${statusText}`,
        })
      );
      return false;
    }
  } else if (error.request) {
    // The request was made but no response was received
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    dispatch({ type: "FLUSH_AUTHENTICATION" });
    const message =
      "No response was received. Probably, server is down or session was expired";
    dispatch(
      showAlert({
        type: "danger",
        message,
      })
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    dispatch(
      showAlert({
        type: "danger",
        message: `Error: ${error.message}`,
      })
    );
  }
};
