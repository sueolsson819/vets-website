import { apiRequest } from 'platform/utilities/api';
import recordEvent from 'platform/monitoring/record-event';
import { GA_PREFIX, handleButtonsPostRender } from './utils';
import * as Sentry from '@sentry/browser';
import localStorage from 'platform/utilities/storage/localStorage';

export const defaultLocale = 'en-US';
const localeRegExPattern = /^[a-z]{2}(-[A-Z]{2})?$/;
let chatBotScenario = 'unknown';

export const extractLocale = localeParam => {
  if (localeParam === 'autodetect') {
    return navigator.language;
  }

  // Before assigning, ensure it's a valid locale string (xx or xx-XX)
  if (localeParam.search(localeRegExPattern) === 0) {
    return localeParam;
  }
  return defaultLocale;
};

export const getUserLocation = callback => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = {
        lat: latitude,
        long: longitude,
      };
      callback(location);
    },
    () => {
      // user declined to share location
      callback();
    },
  );
};

const initBotConversation = jsonWebToken => {
  // extract the data from the JWT
  const tokenPayload = JSON.parse(atob(jsonWebToken.split('.')[1]));
  const user = {
    id: tokenPayload.userId,
    name: tokenPayload.userName,
    locale: tokenPayload.locale,
  };
  let domain = undefined;
  if (tokenPayload.directLineURI) {
    domain = `https://${tokenPayload.directLineURI}/v3/directline`;
  }
  const botConnection = window.WebChat.createDirectLine({
    token: tokenPayload.connectorToken,
    domain,
  });
  const styleOptions = {
    hideSendBox: true,
    botAvatarInitials: 'VA',
    userAvatarInitials: 'You',
    backgroundColor: '#F8F8F8',
    primaryFont: 'Source Sans Pro, sans-serif',
    bubbleMinWidth: 100,
  };

  const webchatStore = window.WebChat.createStore(
    {},
    store => next => action => {
      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        store.dispatch({
          type: 'DIRECT_LINE/POST_ACTIVITY',
          meta: { method: 'keyboard' },
          payload: {
            activity: {
              type: 'invoke',
              name: 'InitConversation',
              locale: user.locale,
              value: {
                // must use for authenticated conversation.
                jsonWebToken,

                // Use the following activity to proactively invoke a bot scenario

                triggeredScenario: {
                  trigger: chatBotScenario,
                },
              },
            },
          },
        });
      } else if (
        action.type === 'DIRECT_LINE/INCOMING_ACTIVITY' &&
        action.payload?.activity?.type === 'event' &&
        action.payload?.activity?.name === 'ShareLocationEvent'
      ) {
        // share
        getUserLocation(location => {
          store.dispatch({
            type: 'WEB_CHAT/SEND_POST_BACK',
            payload: { value: JSON.stringify(location) },
          });
        });
      }
      return next(action);
    },
  );
  return {
    directLine: botConnection,
    styleOptions,
    store: webchatStore,
    userID: user.id,
    username: user.name,
    locale: user.locale,
  };
};

export const requestChatBot = async loc => {
  const params = new URLSearchParams(location.search);
  const locale = params.has('locale')
    ? extractLocale(params.get('locale'))
    : defaultLocale;
  let path = `/coronavirus_chatbot/tokens?locale=${locale}`;

  if (loc) {
    path += `&lat=${loc.lat}&long=${loc.long}`;
  }
  if (params.has('userId')) {
    path += `&userId=${params.get('userId')}`;
  }
  if (params.has('userName')) {
    path += `&userName=${params.get('userName')}`;
  }

  try {
    const csrfTokenStored = localStorage.getItem('csrfToken');
    const { token } = await apiRequest(path, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'X-CSRF-Token': csrfTokenStored,
      },
    });
    return initBotConversation(token);
  } catch (error) {
    Sentry.captureException(error);
    recordEvent({
      event: `${GA_PREFIX}-connection-failure`,
      'error-key': 'XX_failed_to_init_bot_convo',
    });
    throw error;
  }
};

const chatRequested = async scenario => {
  chatBotScenario = scenario;
  const params = new URLSearchParams(location.search);
  if (params.has('shareLocation')) {
    getUserLocation(requestChatBot);
  }
  return requestChatBot();
};

export default async function initializeChatbot() {
  handleButtonsPostRender();
  return chatRequested('va_coronavirus_chatbot');
}
