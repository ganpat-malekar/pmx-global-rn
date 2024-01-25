import {
  STORE_INCIDENTS_EXPORT,
  STORE_INCIDENTS,
  STORE_EVENT_LOGS_EXPORT,
  STORE_EVENT_LOGS,
  OPEN_VIEW_INCIDENT_DIALOG,
  CLOSE_VIEW_INCIDENT_DIALOG,
} from "../../actions/types";
import _ from "underscore";

const initialState = {
  incidentList: {},
  incidentListExport: [],
  eventLogList: {},
  eventLogListExport: [],
  incidentInformation: [],
  openViewIncidentDialog: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_INCIDENTS:
      console.log(action.payload);
      return {
        ...state,
        incidentList: action.payload,
      };
    case STORE_INCIDENTS_EXPORT:
      return {
        ...state,
        incidentListExport: action.payload,
      };
    case STORE_EVENT_LOGS:
      return {
        ...state,
        eventLogList: action.payload,
      };
    case STORE_EVENT_LOGS_EXPORT:
      return {
        ...state,
        eventLogListExport: action.payload,
      };
    case OPEN_VIEW_INCIDENT_DIALOG:
      return {
        ...state,
        openViewIncidentDialog: true,
      };
    case CLOSE_VIEW_INCIDENT_DIALOG:
      return {
        ...state,
        openViewIncidentDialog: false,
        incidentInformation: [],
      };
    default:
      return state;
  }
}
