import moment from 'moment';
import { getRegionCode } from '@paymate/common/helpers';

import {
  LOADING,
  LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_USER_IP,
  SAVE_EXISTING_AUTH_TOKEN,
  EXTEND_SESSION,
  SAVE_TOKEN_DATA,
  SAVE_USER_BASIC_INFORMATION,
  STORE_PROFILE_MENU_DETAILS,
  UPDATE_TERMS_AND_POLICY,
  STORE_MULTIPLE_ACCOUNTS,
  UPDATE_BUSINESS_USER,
  STORE_GEOGRAPHIC_DETAILS,
  STORE_REGION_CODE,
} from '../actions/types';

const initialState = {
  profileMenuData: {},
  token: '', //check for flushing in from ls
  isAuthenticated: false,
  isLoading: false,
  user: null,
  userIpAddress: '',
  tokenData: {},
  basicInfo: null,
  multipleAccountsData: {},
  geographicDetails: null,
  regionCode: null,
  // extract all user data {..} and store here
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_REGION_CODE:
      console.log(action.payload);
      return {
        ...state,
        regionCode: action.payload,
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.Data,
        },
        isAuthenticated: true,
        token: action.payload.AuthToken,
      };
    case UPDATE_BUSINESS_USER:
      return {
        ...state,
        user: {
          ...state.user,
          AuthToken: action.payload.AuthToken,
          BusinessName: action.payload.BusinessName,
          CompanyclientStatus: action.payload.CompanyclientStatus,
          IsBusinessActive: action.payload.IsBusinessActive,
          IsExpired: action.payload.IsExpired,
          IsHelpNotificationClosed: action.payload.IsHelpNotificationClosed,
          IsOldUserLogin: action.payload.IsOldUserLogin,
          isSubscriptionActive: action.payload.isSubscriptionActive,
          ProgressStatus: action.payload.ProgressStatus,
          RedirectUrl: action.payload.redirectto,
          RoleIds: action.payload.RoleId,
          RoleName: action.payload.RoleName,
          RoleType: action.payload.RoleType,
          TermsAccepted: action.payload.TermsAccepted,
          TokenActiveSession: action.payload.TokenActiveSession,
          TokenExpiresOn: action.payload.TokenExpiresOn,
          TokenIssuedOn: action.payload.TokenIssuedOn,
          UserId: action.payload.userId,
          WrongTries: action.payload.WrongTries,
          ErrMsg: action.payload.ErrMsg,
          ErrorCode: action.payload.ErrorCode,
          isPartialTermsAccepted: action.payload.isPartialTermsAccepted,
          MailContent: action.payload.MailContent,
          MailSubject: action.payload.MailSubject,
          MailTo: action.payload.MailTo,
          Status: action.payload.Status,
        },
        isAuthenticated: true,
        token: action.payload.AuthToken,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case GET_USER_IP:
      return {
        ...state,
        userIpAddress: action.payload,
      };
    case SAVE_EXISTING_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload.AuthToken,
      };
    case EXTEND_SESSION:
      return {
        ...state,
        user: {
          ...state.user,
          TokenExpiresOn: action.payload.ExpiresOn,
          TokenIssuedOn: action.payload.IssuedOn,
          loginTimeStamp: moment().format(),
        },
        isAuthenticated: true,
        token: action.payload.AuthToken,
      };
    case SAVE_TOKEN_DATA:
      const data = { ...action.payload.Data };
      data.UserType = data.CompanyId === 1 ? 'Admin' : 'Business';
      return {
        ...state,
        tokenData: data,
      };
    case 'FLUSH_AUTHENTICATION':
      localStorage.clear();
      return {
        ...initialState,
      };
    case SAVE_USER_BASIC_INFORMATION:
      return {
        ...state,
        basicInfo: action.payload,
      };
    case STORE_PROFILE_MENU_DETAILS:
      return {
        ...state,
        profileMenuData: action.payload,
      };
    case UPDATE_TERMS_AND_POLICY:
      return {
        ...state,
        user: {
          ...state.user,
          TermsAccepted: true,
        },
      };
    case STORE_MULTIPLE_ACCOUNTS:
      return {
        ...state,
        multipleAccountsData: action.payload,
      };
    case STORE_GEOGRAPHIC_DETAILS:
      console.log(action.payload);
      return {
        ...state,
        geographicDetails: action.payload,
      };
    default:
      return state;
  }
}
