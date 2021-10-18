const GreetUser = {
  makeBotGreetUser: (
    csrfToken,
    apiSession,
    apiURL,
    baseURL,
    userFirstName,
  ) => ({ dispatch }) => next => action => {
    if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
      dispatch({
        meta: {
          method: 'keyboard',
        },
        payload: {
          activity: {
            channelData: {
              postBack: true,
            },
            // Web Chat will show the 'Greeting' System Topic message which has a trigger-phrase 'hello'
            name: 'startConversation',
            type: 'event',
            value: {
              csrfToken,
              apiSession,
              apiURL,
              baseURL,
              userFirstName,
            },
          },
        },
        type: 'DIRECT_LINE/POST_ACTIVITY',
      });

      dispatch({
        type: 'WEB_CHAT/SET_NOTIFICATION',
        payload: {
          id: 'first',
          level: 'warn',
          message:
            'This virtual agent is still in development and cannot help with personal, medical or mental health emergencies. Thank you for understanding.',
        },
      });

      dispatch({
        type: 'WEB_CHAT/SET_NOTIFICATION',
        payload: {
          id: 'very long',
          level: 'success',
          message:
            'We keep a record of all virtual agent conversations, so we ask that you do not enter personal information that can be used to identify you.',
        },
      });
    }
    return next(action);
  },
};

export default GreetUser;
