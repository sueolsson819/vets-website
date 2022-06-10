// makeUserObject used to be defined in this file. To avoid updating all places
// that were already using it, we're just re-exporting it
export { makeUserObject } from '~/applications/personalization/common/helpers';

export function mockLocalStorage() {
  // make sure no first-time UX modals are in the way
  window.localStorage.setItem(
    'DISMISSED_ANNOUNCEMENTS',
    JSON.stringify(['single-sign-on-intro', 'find-benefits-intro']),
  );
}

export function mock404s() {
  // a "catch-all" for unstubbed API calls in a test -- ensure this is the LAST intercept
  // returns 404s for all Ajax application/json requests
  cy.intercept(
    {
      headers: {
        accept: 'application/json',
      },
    },
    {
      statusCode: 404,
    },
  ).as('mock404');
}
