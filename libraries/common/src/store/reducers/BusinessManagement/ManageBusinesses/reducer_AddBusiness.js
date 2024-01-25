import { SAVE_BUSINESS_INFORMATION } from "../../../actions/types";

const initialState = {
  CompanyId: "",
  XpressID: "",
  BusinessInfo: {}, // Becareful and use _.isEmpty(BusinessInfo);
  tabIndex: 0,
  Status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_BUSINESS_INFORMATION:
      const { CompanyId, XpressID, BusinessInfo, Status } = action.payload;
      return {
        ...state,
        XpressID,
        CompanyId,
        BusinessInfo,
        tabIndex: BusinessInfo ? BusinessInfo.TabIndex : 0,
        Status,
      };
    case "FLUSH_BUSINESS_INFORMATION":
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
