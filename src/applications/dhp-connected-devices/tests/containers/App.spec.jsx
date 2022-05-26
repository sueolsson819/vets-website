import { expect } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import App from '../../containers/App';

function getStore(loading = false, currentlyLoggedIn = false) {
  return {
    getState: () => ({
      featureToggles: {
        loading,
      },
      user: {
        login: {
          currentlyLoggedIn,
        },
        profile: {
          loa: {
            current: 1,
          },
          userFullName: {
            first: null,
          },
        },
      },
    }),
  };
}

describe('App', () => {
  it('renders the the loading indicator when page is loading', () => {
    const mockStore = getStore(true, true);
    const wrapper = render(
      <Provider store={mockStore}>
        <App />
      </Provider>,
    );

    expect(wrapper.find('va-loading-indicator').length).to.equal(1);
  });

  it('renders the authenticated page content when a user is logged in', () => {
    const mockStore = getStore(false, true);
    const wrapper = render(
      <Provider store={mockStore}>
        <App />
      </Provider>,
    );

    expect(wrapper.find('va-loading-indicator').length).to.equal(0);
    expect(
      wrapper
        .find('h2')
        .first()
        .text(),
    ).to.eq('Your connected devices');
  });

  it('renders the un-authenticated page content when a user is logged out', () => {
    const mockStore = getStore(false, false);
    const wrapper = render(
      <Provider store={mockStore}>
        <App />
      </Provider>,
    );

    expect(wrapper.find('va-loading-indicator').length).to.equal(0);
    expect(
      wrapper
        .find('h3')
        .first()
        .text(),
    ).to.eq('Please sign in to connect a device');
  });
});
