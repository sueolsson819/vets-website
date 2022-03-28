import React, { useMemo } from 'react';
import environment from 'platform/utilities/environment';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import recordEvent from 'platform/monitoring/record-event';
import GreetUser from './makeBotGreetUser';
import MarkdownRenderer from './markdownRenderer';

const renderMarkdown = text => MarkdownRenderer.render(text);

const WebChat = ({ token, WebChatFramework, apiSession }) => {
  const { ReactWebChat, createDirectLine, createStore } = WebChatFramework;
  const csrfToken = localStorage.getItem('csrfToken');
  const userFirstName = useSelector(state =>
    _.upperFirst(_.toLower(state.user.profile.userFullName.first)),
  );

  const isLoggedIn = useSelector(state => state.user.login.currentlyLoggedIn);
  const store = useMemo(
    () =>
      createStore(
        {},
        GreetUser.makeBotGreetUser(
          csrfToken,
          apiSession,
          environment.API_URL,
          environment.BASE_URL,
          userFirstName === '' ? 'noFirstNameFound' : userFirstName,
          isLoggedIn,
        ),
      ),
    [createStore],
  );

  let conversationId = '';
  let watermark = '';
  if (localStorage.getItem('counter') >= 2) {
    conversationId = localStorage.getItem('conversationId');
    watermark = '000000';
  }

  const directLine = useMemo(
    () =>
      createDirectLine({
        token: localStorage.getItem('token'),
        domain:
          'https://northamerica.directline.botframework.com/v3/directline',
        conversationId,
        watermark,
      }),
    [token, createDirectLine],
  );

  const styleOptions = {
    hideUploadButton: true,
    botAvatarBackgroundColor: '#003e73', // color-primary-darker
    botAvatarInitials: 'VA',
    userAvatarBackgroundColor: '#003e73', // color-primary-darker
    userAvatarInitials: 'You',
    primaryFont: 'Source Sans Pro, sans-serif',
    bubbleBorderRadius: 5,
    bubbleFromUserBorderRadius: 5,
    bubbleBorderWidth: 0,
    bubbleFromUserBorderWidth: 0,
    bubbleBackground: '#e1f3f8',
    bubbleFromUserBackground: '#f1f1f1',
    bubbleNubSize: 10,
    bubbleFromUserNubSize: 10,
    timestampColor: '#000000',
    suggestedActionLayout: 'flow',
    suggestedActionBackground: '#0071BB',
    suggestedActionTextColor: 'white',
    suggestedActionBorderRadius: '5px',
    suggestedActionBorderWidth: 0,
  };

  const handleTelemetry = event => {
    const { name } = event;

    if (name === 'submitSendBox') {
      recordEvent({
        event: 'cta-button-click',
        'button-type': 'default',
        'button-click-label': 'submitSendBox',
        'button-background-color': 'gray',
        time: new Date(),
      });
    }
  };

  return (
    <div data-testid="webchat" style={{ height: '550px', width: '100%' }}>
      <ReactWebChat
        styleOptions={styleOptions}
        directLine={directLine}
        store={store}
        renderMarkdown={renderMarkdown}
        onTelemetry={handleTelemetry}
      />
    </div>
  );
};

export default WebChat;
