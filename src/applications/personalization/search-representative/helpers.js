const loggedInRetriever = () => {
  let _isLoggedIn = null;

  const isLoggedIn = () => {
    /* eslint-disable-next-line no-console */
    console.log('Retrieving stored login value:', _isLoggedIn);
    return _isLoggedIn;
  };

  const thunk = (dispatch, getState) => {
    const state = getState();
    /* eslint-disable-next-line no-console */
    console.log('isLoggedIn', state.user.login.currentlyLoggedIn);
    _isLoggedIn = state.user.login.currentlyLoggedIn;
  };

  return {
    thunk,
    isLoggedIn,
  };
};

export const loginChecker = loggedInRetriever();
