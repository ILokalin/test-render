import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import store from './store/store.js';
import App from './App.jsx';
import resources from './locales/index.js';
import addRussianDictionary from './utils/addDictionary.js';

const init = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    debug: false,
    lng: 'ru',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
  await addRussianDictionary('ru');

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstance}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};

export default init;
