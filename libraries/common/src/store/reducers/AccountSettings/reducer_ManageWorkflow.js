import _ from "underscore";

import {
  STORE_APPROVAL_WORKFLOW_LIST,
  STORE_LIST_LIMIT_WORKFLOW,
  STORE_BIND_LIMITS,
  STORE_BIND_USER_ROLES,
  STORE_WORKFLOW_PAYMENT_TYPES,
  SAVE_EDIT_LIMIT_WORKFLOW,
} from "../../actions/types";

const initialState = {
  // FIXME: if we are storing response, which is an object, then these defuals should be empty object instead of array
  // TODO: Check with Vandita if there are any dependencies in this
  workflowList: [],
  listLimitWorkflow: [],
  bindLimitsList: {},
  workflowPaymentTypesList: [],
  bindUserRolesList: {},
  saveEditLimitWorkflow: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_APPROVAL_WORKFLOW_LIST:
      return {
        ...state,
        workflowList: action.payload,
      };
    case STORE_LIST_LIMIT_WORKFLOW:
      return {
        ...state,
        listLimitWorkflow: action.payload,
      };
    case STORE_WORKFLOW_PAYMENT_TYPES:
      return {
        ...state,
        workflowPaymentTypesList: action.payload,
      };
    case STORE_BIND_LIMITS:
      return {
        ...state,
        bindLimitsList: action.payload,
      };
    case "FLUSH_BIND_LIMITS":
      return {
        ...state,
        bindLimitsList: {},
      };
    case STORE_BIND_USER_ROLES:
      return {
        ...state,
        bindUserRolesList: action.payload,
      };
    case SAVE_EDIT_LIMIT_WORKFLOW:
      return {
        ...state,
        saveEditLimitWorkflow: action.payload,
      };
    case "FLUSH_LIST_LIMIT_WORKFLOW_DATA":
      return {
        ...state,
        listLimitWorkflow: [],
      };
    default:
      return state;
  }
}
