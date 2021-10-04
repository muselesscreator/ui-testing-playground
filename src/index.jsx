import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import store from 'data/store';
import {
  APP_READY,
  APP_INIT_ERROR,
  initialize,
  subscribe,
} from '@edx/frontend-platform';
import { messages as footerMessages } from '@edx/frontend-component-footer';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import messages from './i18n';

import App from './App';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <IntlProvider locale="en" messages={messages.en}>
      <AppProvider store={store}>
        <App />
      </AppProvider>
    </IntlProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById('root'),
  );
});

initialize({
  messages: [
    messages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
});
