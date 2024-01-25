/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@paymate/common/store';
import { injectStore } from '@paymate/common/apimiddleware';
import { PersistGate } from 'redux-persist/integration/react';

import LoginForm from './LoginForm';

injectStore(store);

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LoginForm />
      </PersistGate>
    </Provider>
  )
};

export default App;
