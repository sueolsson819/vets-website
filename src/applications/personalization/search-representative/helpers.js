/* eslint-disable no-console */
// export const thunkFunction = (dispatch, getState) => {
//   const state = getState();
//   console.log('STATE', state);
//   console.log('isLoggedIn', state.user.login.currentlyLoggedIn);
// };

const loggedInRetriever = () => {
  let _isLoggedIn = null;

  const isLoggedIn = () => {
    console.log('Retrieving stored login value:', _isLoggedIn);
    return _isLoggedIn;
  };

  const thunk = (dispatch, getState) => {
    const state = getState();
    console.log('STATE', state);
    console.log('isLoggedIn', state.user.login.currentlyLoggedIn);
    _isLoggedIn = state.user.login.currentlyLoggedIn;
  };

  return {
    thunk,
    isLoggedIn,
  };
};

export const loginChecker = loggedInRetriever();
