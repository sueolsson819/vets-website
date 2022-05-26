/**
 * Module for functions related to starting up and application
 * @module platform/startup
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, useRouterHistory, browserHistory } from 'react-router';
import { createHistory } from 'history';
import startReactApp from './react';
import setUpCommonFunctionality from './setup';

/**
 * Starts an application in the default element for standalone React
 * applications. It also sets up the common store, starts the site-wide
 * components (like the header menus and login widget), and wraps the provided
 * routes in the Redux and React Router boilerplate common to most applications.
 *
 * @param {object} appInfo The UI and business logic of your React application
 * @param {Route|array<Route>} appInfo.routes The routes for the application
 * @param {ReactElement} appInfo.component A React element to render. Only used if routes
 * is not passed
 * @param {object} appInfo.reducer An object containing reducer functions. Will have
 * combineReducers run on it after being merged with the common, cross-site reducer.
 * @param {string} appInfo.url The base url for the React application
 * @param {array} appInfo.analyticsEvents An array which contains analytics events to collect
 * when the respective actions are fired.
 */
export default function startApp({
  routes,
  createRoutesWithStore,
  component,
  reducer,
  url,
  analyticsEvents,
  entryName = 'unknown',
}) {
  const store = setUpCommonFunctionality({
    entryName,
    url,
    reducer,
    analyticsEvents,
  });

  let history = browserHistory;
  if (url) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    history = useRouterHistory(createHistory)({
      basename: url,
    });
  }
  let content = component;
  if (createRoutesWithStore) {
    content = <Router history={history}>{createRoutesWithStore(store)}</Router>;
  } else if (routes) {
    content = <Router history={history}>{routes}</Router>;
  }

  startReactApp(<Provider store={store}>{content}</Provider>);

  return store;
}

const check = () => {
  // eslint-disable-next-line no-console
  console.log('Checking for browser support');
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!');
  }
  if (!('PushManager' in window)) {
    throw new Error('No Push API Support!');
  }
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification');
  }
};

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    // here you can add more properties like icon, image, vibrate, etc.
    icon: '/img/vic-va-seal.png',
  };
  swRegistration.showNotification(title, options);
};

// This function is needed because Chrome doesn't accept a base64 encoded string
// as value for applicationServerKey in pushManager.subscribe yet
// https://bugs.chromium.org/p/chromium/issues/detail?id=802280
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const main = async () => {
  check();
  const swRegistration = await navigator.serviceWorker.register(
    '/generated/service.entry.js',
  );
  await requestNotificationPermission();
  showLocalNotification(
    'Benefits eligibility',
    'Your benefits application has been reviewed and you will now receive benefits.',
    swRegistration,
  );

  swRegistration.pushManager
    .getSubscription()
    .then(async subscription => {
      // If a subscription was found, return it.
      if (subscription) {
        return subscription;
      }

      // Get the server's public key
      const response = await fetch('http://localhost:4000/vapidPublicKey');
      const vapidPublicKey = await response.text();
      // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
      // urlBase64ToUint8Array() is defined in /tools.js
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

      // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
      // send notifications that don't have a visible effect for the user).
      return swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
    })
    .then(subscription => {
      fetch('http://localhost:4000/register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
        }),
      });
    });
};
main();
