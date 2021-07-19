/**
 * Initializes error reporting to Sentry when running at a higher enviroment than localhost
 */

import * as Sentry from '@sentry/browser';

import environment from '../utilities/environment';

// url check is necessary for e2e tests and local environments
const trackErrors = environment.BASE_URL.indexOf('localhost') < 0;

if (trackErrors) {
  const url = `${environment.BASE_URL}/js-report/0`.replace('//', '//faker@');
  Sentry.init({
    autoSessionTracking: false,
    dsn: url,
    environment: environment.vspEnvironment(),
    ignoreErrors: [
      // Error generated by a bug in auto-fill library from safari
      // https://github.com/getsentry/sentry/issues/5267
      /Blocked a frame with origin/,
      // Errors generated by Microsoft SafeLink scanner
      // https://forum.sentry.io/t/unhandledrejection-non-error-promise-rejection-captured-with-value/14062/14
      /Non-Error exception captured/,
      /Non-Error promise rejection captured/,
    ],
  });
  Sentry.setTag('source', 'unknown');
  Sentry.configureScope(scope => {
    scope.setLevel('error');
  });
}
