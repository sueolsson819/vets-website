import appendQuery from 'append-query';
import * as Sentry from '@sentry/browser';
import 'url-search-params-polyfill';
import environment from 'platform/utilities/environment';
import { setLoginAttempted } from 'platform/utilities/sso/loginAttempted';
import { getInfoToken, infoTokenExists } from 'platform/utilities/oauth';
import { externalApplicationsConfig } from './usip-config';
import {
  AUTH_EVENTS,
  AUTHN_SETTINGS,
  API_VERSION,
  EXTERNAL_APPS,
  EXTERNAL_REDIRECTS,
  GA_TRACKING_ID_KEY,
  VAGOV_TRACKING_IDS,
  CSP_IDS,
  POLICY_TYPES,
  SIGNUP_TYPES,
  API_SESSION_URL,
  GA_CLIENT_ID_KEY,
  EBENEFITS_DEFAULT_PATH,
  API_SIGN_IN_SERVICE_URL,
  AUTH_PARAMS,
} from './constants';
import recordEvent from '../../monitoring/record-event';

// NOTE: the login app typically has URLs that being with 'sign-in',
// however there is at least one CMS page, 'sign-in-faq', that we don't
// want to resolve with the login app
export const loginAppUrlRE = new RegExp('^/sign-in(/.*)?$');

export const getQueryParams = () => {
  return Object.keys(AUTH_PARAMS).reduce((paramsObj, paramKey) => {
    const paramValue = new URLSearchParams(window.location.search).get(
      AUTH_PARAMS[paramKey],
    );
    return { ...paramsObj, ...(paramValue && { [paramKey]: paramValue }) };
  }, {});
};

export const reduceAllowedProviders = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) acc.push(key);
    return acc;
  }, []);

export const isExternalRedirect = () => {
  const { application } = getQueryParams();
  return (
    loginAppUrlRE.test(window.location.pathname) &&
    Object.keys(EXTERNAL_REDIRECTS).includes(application)
  );
};

export const sanitizeUrl = (url, path = '') => {
  if (!url) return null;
  const updatedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const updatedPath = path ?? '';
  return `${updatedUrl}${updatedPath}`.replace('\r\n', ''); // Prevent CRLF injection.
};

export const sanitizePath = to => {
  if (!to) {
    return '';
  }
  return to.startsWith('/') ? to : `/${to}`;
};

export const generateReturnURL = (returnUrl, redirectToMyVA) => {
  return [
    `${environment.BASE_URL}/?next=loginModal`,
    `${environment.BASE_URL}`,
  ].includes(returnUrl) && redirectToMyVA
    ? `${environment.BASE_URL}/my-va/`
    : returnUrl;
};

export const createExternalApplicationUrl = () => {
  const { application, to } = getQueryParams();
  if (!application) {
    return null;
  }
  const { externalRedirectUrl } = externalApplicationsConfig[application];
  let URL = '';

  switch (application) {
    case EXTERNAL_APPS.VA_FLAGSHIP_MOBILE:
    case EXTERNAL_APPS.VA_OCC_MOBILE:
      URL = sanitizeUrl(`${externalRedirectUrl}${window.location.search}`);
      break;
    case EXTERNAL_APPS.EBENEFITS:
      URL = sanitizeUrl(
        `${externalRedirectUrl}`,
        `${!to ? EBENEFITS_DEFAULT_PATH : sanitizePath(to)}`,
      );
      break;
    case EXTERNAL_APPS.MHV:
      URL = sanitizeUrl(
        `${externalRedirectUrl}`,
        `${!to ? '' : `?deeplinking=${to}`}`,
      );
      break;
    case EXTERNAL_APPS.MY_VA_HEALTH:
      URL = sanitizeUrl(`${externalRedirectUrl}`, sanitizePath(to));
      break;
    default:
      break;
  }
  return URL;
};

// Return URL is where a user will be forwarded post successful authentication
export const createAndStoreReturnUrl = () => {
  let returnUrl;
  if (loginAppUrlRE.test(window.location.pathname)) {
    if (isExternalRedirect()) {
      returnUrl = createExternalApplicationUrl();
    } else {
      // Return user to home page if internal authentication via USiP
      returnUrl = window.location.origin;
    }
  } else {
    // If we are not on the USiP, we should always return the user back to their current location
    returnUrl = window.location.toString();
  }

  sessionStorage.setItem(AUTHN_SETTINGS.RETURN_URL, returnUrl);
  return returnUrl;
};

export const generateConfigQueryParams = ({ config, params }) => {
  const { queryParams, OAuthEnabled } = config;
  const isOauthEnabled =
    OAuthEnabled && queryParams.allowOAuth && params.oauth === 'true';
  return {
    ...(isOauthEnabled && {
      [AUTH_PARAMS.codeChallenge]: params.codeChallenge,
      [AUTH_PARAMS.codeChallengeMethod]: params.codeChallengeMethod,
      oauth: params.oauth,
    }),
    ...(queryParams.allowPostLogin && { postLogin: true }),
    ...(queryParams.allowRedirect && {
      redirect: createExternalApplicationUrl(),
    }),
  };
};

export function sessionTypeUrl({
  type = '',
  queryParams = {},
  version = API_VERSION,
}) {
  if (!type) {
    return null;
  }

  // application is fetched from location, not the passed through queryParams arg
  const {
    application,
    OAuth,
    codeChallenge,
    codeChallengeMethod,
  } = getQueryParams();

  const externalRedirect = isExternalRedirect();
  const isSignup = Object.values(SIGNUP_TYPES).includes(type);
  const isLogin = Object.values(CSP_IDS).includes(type);
  const config =
    externalApplicationsConfig[application] ||
    externalApplicationsConfig.default;

  // We should use OAuth when the following are true:
  // OAuth param is 'true'
  // config.OAuthEnabled is true
  const useOAuth = config?.OAuthEnabled && OAuth === 'true';

  // Only require verification when all of the following are true:
  // 1. On the USiP (Unified Sign In Page)
  // 2. The outbound application is one of the mobile apps
  // 3. The generated link type is for signup, and login only
  const requireVerification =
    externalRedirect && (isLogin || isSignup) && config.requiresVerification
      ? '_verified'
      : '';

  const appendParams =
    externalRedirect && isLogin
      ? generateConfigQueryParams({
          config,
          params: {
            codeChallenge,
            codeChallengeMethod,
            ...(useOAuth && { oauth: OAuth }),
          },
        })
      : {};

  return appendQuery(
    useOAuth
      ? API_SIGN_IN_SERVICE_URL({ type: `/${type}` })
      : API_SESSION_URL({
          version,
          type: `${type}${requireVerification}`,
        }),
    { ...queryParams, ...appendParams, application },
  );
}

export function setSentryLoginType(loginType) {
  Sentry.setTag('loginType', loginType);
}

export function clearSentryLoginType() {
  Sentry.setTag('loginType', undefined);
}

export const redirectWithGAClientId = redirectUrl => {
  try {
    // eslint-disable-next-line no-undef
    const trackers = ga.getAll();

    const tracker = trackers.find(t => {
      const trackingId = t.get(GA_TRACKING_ID_KEY);
      return VAGOV_TRACKING_IDS.includes(trackingId);
    });

    const clientId = tracker && tracker.get(GA_CLIENT_ID_KEY);

    window.location = clientId
      ? // eslint-disable-next-line camelcase
        appendQuery(redirectUrl, { client_id: clientId })
      : redirectUrl;
  } catch (e) {
    window.location = redirectUrl;
  }
};

export function redirect(redirectUrl, clickedEvent) {
  const { application } = getQueryParams();
  const externalRedirect = isExternalRedirect();
  const existingReturnUrl = sessionStorage.getItem(AUTHN_SETTINGS.RETURN_URL);

  // Keep track of the URL to return to after auth operation.
  // If the user is coming via the standalone sign-in, redirect to the home page.
  // Do not overwite an existing returnUrl for VERIFY attempts
  if (!(existingReturnUrl && clickedEvent === AUTH_EVENTS.VERIFY)) {
    createAndStoreReturnUrl();
  }

  recordEvent({ event: clickedEvent });

  // Trigger USiP External Auth Event
  if (
    externalRedirect &&
    [AUTH_EVENTS.SSO_LOGIN, AUTH_EVENTS.MODAL_LOGIN].includes(clickedEvent)
  ) {
    recordEvent({
      event: `${AUTHN_SETTINGS.REDIRECT_EVENT}-${application}-inbound`,
    });
  }

  if (redirectUrl.includes(CSP_IDS.ID_ME)) {
    redirectWithGAClientId(redirectUrl);
  } else {
    window.location = redirectUrl;
  }
}

export function login({
  policy,
  version = API_VERSION,
  queryParams = {},
  clickedEvent = AUTH_EVENTS.MODAL_LOGIN,
}) {
  const url = sessionTypeUrl({ type: policy, version, queryParams });

  if (!isExternalRedirect()) {
    setLoginAttempted();
  }

  return redirect(url, clickedEvent);
}

export function mfa(version = API_VERSION) {
  return redirect(
    sessionTypeUrl({ type: POLICY_TYPES.MFA, version }),
    AUTH_EVENTS.MFA,
  );
}

export function verify(version = API_VERSION) {
  return redirect(
    sessionTypeUrl({ type: POLICY_TYPES.VERIFY, version }),
    AUTH_EVENTS.VERIFY,
  );
}

export function logout(
  version = API_VERSION,
  clickedEvent = AUTH_EVENTS.LOGOUT,
  queryParams = {},
) {
  clearSentryLoginType();
  return redirect(
    sessionTypeUrl({ type: POLICY_TYPES.SLO, version, queryParams }),
    clickedEvent,
  );
}

export function signup({ version = API_VERSION, csp = CSP_IDS.ID_ME } = {}) {
  return redirect(
    sessionTypeUrl({
      type: `${csp}_signup`,
      version,
      ...(csp === CSP_IDS.ID_ME && { queryParams: { op: 'signup' } }),
    }),
    `${csp}-${AUTH_EVENTS.REGISTER}`,
  );
}

export const signupUrl = type => {
  const signupType = SIGNUP_TYPES[type] ?? SIGNUP_TYPES[CSP_IDS.ID_ME];
  const queryParams =
    signupType === SIGNUP_TYPES[CSP_IDS.ID_ME]
      ? {
          queryParams: { op: 'signup' },
        }
      : {};

  const opts = {
    type: signupType,
    ...queryParams,
  };

  return sessionTypeUrl(opts);
};

export const logoutUrl = () => {
  return sessionTypeUrl({ type: POLICY_TYPES.SLO, version: API_VERSION });
};

export const checkOrSetSessionExpiration = response => {
  const samlSessionExpiration = response.headers.get('X-Session-Expiration');
  const { refresh_token_expiration: RTExpiration } = getInfoToken();

  if (infoTokenExists() || samlSessionExpiration) {
    localStorage.setItem(
      'sessionExpiration',
      RTExpiration ?? samlSessionExpiration,
    );
  }
};
