import { PROFILE_PATHS } from '../../constants';
import mockUser from '../fixtures/users/user-36.json';
import mockConnectedApps from '../fixtures/connected-apps/mock-connected-apps.json';

/**
 *
 * @param {boolean} mobile - test on a mobile viewport or not
 */

function disconnectApps(mobile = false, error = false) {
  cy.server();
  cy.route('GET', 'v0/profile/connected_applications', mockConnectedApps);

  cy.route({
    method: 'DELETE',
    url: 'v0/profile/connected_applications/0oa3s6dlvxgsZr62p2p7',
    response: error ? { errors: [{ code: 5, status: 500 }] } : {},
    status: error ? 500 : 200,
  }).as('connectedAppDelete1');

  cy.route({
    method: 'DELETE',
    url: 'v0/profile/connected_applications/10oa3s6dlvxgsZr62p2p7',
    response: error ? { errors: [{ code: 5, status: 500 }] } : {},
    status: error ? 500 : 200,
  }).as('connectedAppDelete2');

  cy.visit(PROFILE_PATHS.CONNECTED_APPLICATIONS);
  if (mobile) {
    cy.viewport('iphone-4');
  }

  // should show a loading indicator
  cy.findByRole('progressbar').should('exist');
  cy.findByText(/loading your information/i).should('exist');
  cy.findByText(/loading your information/i).should('not.exist');
  cy.findByRole('progressbar').should('not.exist');

  cy.get('.connected-app').should('have.length', 2);

  // 4 FAQs and 1 in each connected app
  cy.get('.form-expanding-group').should('have.length', 3);

  // Make sure text for non-connected accounts does not show
  cy.findByText(/Third-party apps you can connect to your profile/i).should(
    'not.exist',
  );

  // Click on the disconnect button of the first app
  cy.findByTestId('disconnect-app-0oa3s6dlvxgsZr62p2p7').click({
    force: true,
  });
  // Click in disconnect in the confirmation modal
  cy.findByTestId('confirm-disconnect-Apple Health').click({
    force: true,
  });
}
function checkForSuccess() {
  cy.wait('@connectedAppDelete1');

  // Check for the presence of the disconnect success alert
  cy.findByText(
    /If you have questions about data the app has already collected/i,
  ).should('exist');

  // One of the two apps should now be removed
  cy.get('.connected-app').should('have.length', 1);
  cy.findByTestId('disconnect-app-10oa3s6dlvxgsZr62p2p7').click({
    force: true,
  });

  // Click in disconnect in the confirmation modal
  cy.findByTestId('confirm-disconnect-Test App 2').click({
    force: true,
  });

  cy.wait('@connectedAppDelete2');

  // Check for the presence of 2 disconnect success alerts
  cy.get('.usa-alert-success').should('have.length', 2);

  cy.findByText(/Go to app directory/i).should('exist');
}

function checkForErrors() {
  cy.wait('@connectedAppDelete1');

  // Check for the presence of the disconnect error alert
  cy.findByText(/We’re sorry. We can’t disconnect.*from your VA.gov/i).should(
    'exist',
  );

  // The apps should not be removed
  cy.get('.connected-app').should('have.length', 2);
}

describe('Connected applications', () => {
  beforeEach(() => {
    cy.login(mockUser);
  });
  it('should successfully disconnect apps on Desktop', () => {
    disconnectApps(false);
    checkForSuccess();
  });

  it('should successfully disconnect apps on mobile', () => {
    disconnectApps(true);
    checkForSuccess();
  });
  it('should show error message when it can’t disconnect apps on Desktop', () => {
    disconnectApps(false, true);
    checkForErrors();
  });

  it('should show error message when it can’t disconnect apps on mobile', () => {
    disconnectApps(true, true);
  });
});
