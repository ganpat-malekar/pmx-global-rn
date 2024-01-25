import { STORE_PENDING_APPROVALS } from "../../actions/types";
import _ from "underscore";

const initialState = {
  pendingApprovalsList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_PENDING_APPROVALS:
      // console.log("Reducer: ", action.payload);
      return {
        ...state,
        pendingApprovalsList: action.payload,
      };
    default:
      return state;
  }
}
