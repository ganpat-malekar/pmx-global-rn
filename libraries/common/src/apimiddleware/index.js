/**
 * Injecting the store instance into the relevant files as the app is being created
 * in order to avoid importing the store directly into other codebase files.
 * This is to prevent circular import dependency errors.
 *
 * TL;DR: Directly, but safely accessing the redux store, without using dispatch 😎
 * Reference:
 *      https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 *      https://stackoverflow.com/questions/69145287/react-access-redux-store-in-axios-interceptor
 */
import axios from 'axios';
import _ from 'underscore';

let store;

const URLS = {
  'https://dev.paymate.in/beta/aud': 'https://e.dunomo.au/api',
  'https://dev.paymate.in/beta/sgd': 'https://e.paymate.sg/api',
  'https://dev.paymate.in/beta/myr': 'https://e.paymate.my/api',
  'https://dev.paymate.in/beta/aed': 'https://dev.paymate.in/Beta/GlobalUAEAPI',
  'http://localhost:4200/beta/aud': 'https://e.dunomo.au/api',
  'http://localhost:4200/beta/sgd': 'https://e.paymate.sg/api',
  'http://localhost:4200/beta/myr': 'https://e.paymate.my/api',
  'http://localhost:4200/beta/aed': 'https://dev.paymate.in/Beta/GlobalUAEAPI',
};

export const getBaseUrl = () => {
  const href = window.location.href.toLowerCase();
  //const urls = JSON.parse(process.env.NX_BACKEND_URLS);

  for (const key in URLS) {
    console.log(`${key}: ${URLS[key]}`);
    if (href.includes(key)) {
      return URLS[key];
    }
  }
  return '';
};

export const injectStore = (_store) => {
  store = _store;
};
const instance = axios.create({
  baseURL: 'https://e.dunomo.au/api',
  headers: {
    'content-type': 'application/json',
    ServiceType: 'Web',
    IpAddress: '192.168.0.1',
    ApplicationType: 'react',
  },
});

// export let isTokenExpired = false;

instance.interceptors.request.use(async (config) => {
  config.headers.AuthToken = store.getState().admin.token;

  // Payload parameteres should not have leading and trailing white spaces
  if (!_.isEmpty(config.data)) {
    Object.keys(config.data).forEach((key) => {
      const value = config.data[key];
      if (typeof value === 'string') {
        config.data[key] = value.trim();
      }
    });
  }

  const controller = new AbortController();

  if (false) {
    console.log('aborting...');
    controller.abort();
  }

  return { ...config, signal: controller.signal };
});

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // console.log(error);
//     // if (error.response.status === 404 && error.response?.data?.Message) {
//     //   if (error.response.data.Message === "Token Not found") {
//     //     isTokenExpired = true;
//     //     console.log("from error: ", isTokenExpired);
//     //   }
//     // }
//     // console.log(error.response.data);
//     // console.log(error.response.status);
//     // throw error;
//     // Improve in future
//     // Ref:
//     // https://axios-http.com/docs/interceptors
//     // https://axios-http.com/docs/handling_errors
//     // https://www.freecodecamp.org/news/how-to-use-axios-with-react/
//     // https://rapidapi.com/blog/axios-react-api-tutorial/
//     // https://stackoverflow.com/questions/64680277/how-to-use-axios-instance-in-different-components-in-react
//     // https://stackoverflow.com/questions/58126608/how-to-modify-axios-instance-after-exported-it-in-reactjs
//   }
// );

export default instance;
