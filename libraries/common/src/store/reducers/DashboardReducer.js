import _ from 'underscore';

import {
  STORE_DASHBOARD_QUICK_LINKS,
  STORE_DASHBOARD_GRAPH_DATA,
  STORE_DASHBOARD_SETTLEMENT_TRANSACTIONS,
  GET_CONNECTION_REQUESTS,
  FETCH_TERMS_AND_POLICIES,
  ACCEPT_TERMS_AND_POLICIES,
} from '../actions/types';

const initialState = {
  quickLinksData: null,
  businessActivationGraphData: [],
  vendorActivationGraphData: [],
  payablesGraphData: [],
  receivablesGraphData: [],
  balanceData: {},
  tableDataPendingCollectionSettlement: [],
  tableDataPendingPaymentSettlement: [],
  businessDashboardResponse: {},
  collectionChartResponse: {},
  paymentChartResponse: {},
  connectionRequests: null,
  showConnectionRequests: false,
  termsAndPolicies: null,
  showTermsAndPolicies: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_DASHBOARD_QUICK_LINKS:
      // Need to extract url & string from the html
      var extractContent = (html) => {
        return new DOMParser().parseFromString(html, 'text/html')
          .documentElement.textContent;
      };

      var extractPath = (html) => {
        return new DOMParser()
          .parseFromString(html, 'text/html')
          .querySelectorAll('a')[0].attributes[0].nodeValue;
      };

      const links = action.payload.lstDashboardNotifications.map(
        (item, index) => {
          return {
            text:
              item.Routes !== ''
                ? extractContent(item.Notification).trim()
                : item.Notification,
            path:
              item.Routes !== ''
                ? extractPath(item.Notification).trim().split('/')[2]
                : '',
            route: item.Routes,
          };
        }
      );

      return {
        ...state,
        quickLinksData: links,
      };
    case STORE_DASHBOARD_GRAPH_DATA:
      const { Data } = action.payload;
      if (action.dataType === 'Business') {
        // Converting to number, because recharts lib requires value to be a number.
        const businessActivation = Data.filter(
          (item) => item.Type === 'BA'
        ).map((item) => ({ ...item, Data: +item.Data }));
        const vendorActivation = Data.filter((item) => item.Type === 'VA').map(
          (item) => ({ ...item, Data: +item.Data })
        );
        const payables = Data.filter((item) => item.Type === 'PA').map(
          (item) => ({ ...item, Data: +item.Data })
        );
        const receivables = Data.filter((item) => item.Type === 'RA').map(
          (item) => ({ ...item, Data: +item.Data })
        );
        return {
          ...state,
          businessActivationGraphData: businessActivation,
          vendorActivationGraphData: vendorActivation,
          payablesGraphData: payables,
          receivablesGraphData: receivables,
        };
      } else if (action.dataType === 'vendor') {
        return {
          ...state,
          balanceData: { ...state.balanceData, [action.currencyType]: Data },
          // balanceData: action.payload.Data.map((item) => ({
          //   ...item,
          //   Data: item.Data,
          // })),
        };
      }

    case STORE_DASHBOARD_SETTLEMENT_TRANSACTIONS:
      const { PendingCollectionSettlement, PendingPaymentSettlement } =
        action.payload;
      return {
        ...state,
        tableDataPendingCollectionSettlement: PendingCollectionSettlement,
        tableDataPendingPaymentSettlement: PendingPaymentSettlement,
      };
    case 'STORE_BUSINESS_DASHBOARD_RESPONSE':
      // Need to extract url & string from the html
      var extractContent = (html) => {
        return new DOMParser().parseFromString(html, 'text/html')
          .documentElement.textContent;
      };

      const businessDashboardLinks =
        action.payload.response.Data.BusinessDashboardnotification.lstDashboardNotifications.map(
          (item, index) => {
            return {
              text:
                item.Notification !== ''
                  ? extractContent(item.Notification).trim()
                  : '-',

              route: item.Routes,
            };
          }
        );

      return {
        ...state,
        businessDashboardResponse: action.payload.response,
        quickLinksData:
          businessDashboardLinks.length > 0 ? businessDashboardLinks : [],
      };
    case 'STORE_BUSINESS_DASHBOARD_CHART_DATA':
      const key =
        action.payload.chartType === 1
          ? 'collectionChartResponse'
          : 'paymentChartResponse';

      return {
        ...state,
        [key]: action.payload.response,
      };
    case 'GET_CONNECTION_REQUESTS':
      return {
        ...state,
        connectionRequests: action.payload,
        showConnectionRequests: action.payload?.Data.length > 0,
      };
    case FETCH_TERMS_AND_POLICIES:
      return {
        ...state,
        termsAndPolicies: action.payload,
      };
    default:
      return state;
  }
}
