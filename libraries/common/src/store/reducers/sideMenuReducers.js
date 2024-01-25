import {
  SIDE_BAR_MENU_ITEMS_SUCCESS,
  SIDE_BAR_MENU_ITEMS_FAIL,
} from "../actions/types";

const initialState = {
  sideBarMenuItems: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIDE_BAR_MENU_ITEMS_SUCCESS:
      return {
        ...state,
        sideBarMenuItems: action.payload,
      };
    case SIDE_BAR_MENU_ITEMS_FAIL:
      return {
        ...state,
        sideBarMenuItems: {},
      };
    default:
      return state;
  }
}
