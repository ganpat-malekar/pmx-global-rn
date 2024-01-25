import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@paymate/common/store';
import { injectStore } from '@paymate/common/apimiddleware';
import Application from './Application';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

injectStore(store);

function isValidCountry(country) {
  const validCountries = ['aud', 'sgd', 'myr', 'aed'];
  return validCountries.includes(country);
}

function isValidBase(base) {
  // Example validation logic
  const validBases = ['beta']; // replace with your valid bases
  return validBases.includes(base);
}

function App() {
  const [baseName, setBaseName] = useState('');
  const [regionCode, setRegionCode] = useState('');

  const getDynamicBasename = () => {
    const pathParts = window.location.pathname.split('/');
    if (
      pathParts.length > 2 &&
      isValidBase(pathParts[1].toLowerCase()) &&
      isValidCountry(pathParts[2].toLowerCase())
    ) {
      setRegionCode(pathParts[2]);
      setBaseName(`/${pathParts[1]}/${pathParts[2]}`);
    } else {
      setBaseName('/Beta/AUD');
      setRegionCode('aud');
    }
  };

  useEffect(() => {
    getDynamicBasename();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename={baseName}>
          <Application regionCode={regionCode} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
