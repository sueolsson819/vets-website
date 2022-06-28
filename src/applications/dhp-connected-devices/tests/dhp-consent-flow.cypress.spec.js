import manifest from '../manifest.json';

describe(manifest.appName, () => {
  beforeEach(() => {
    const featureToggles = {
      data: {
        type: 'feature_toggles',
        features: [
          {
            name: 'dhp_connected_devices_fitbit',
            value: true,
          },
        ],
      },
    };
    cy.intercept('GET', '/v0/feature_toggles*', featureToggles);
  });

  it('is accessible', () => {
    cy.visit(manifest.rootUrl);
    cy.injectAxe();
    cy.axeCheck();

    cy.url().should(
      'eq',
      'http://localhost:3001/health-care/connected-devices/',
    );
  });

  it("displays login modal after clicking 'Sign in or create an account' for veteran NOT logged in", () => {
    cy.findAllByText('Sign in or create an account').click({
      multiple: true,
      force: true,
      waitForAnimations: true,
    });
    // Tests that login modal appears after clicking
    cy.get('#signin-signup-modal').should('be.visible');
    cy.injectAxe();
    cy.axeCheck();

    cy.get('.va-modal-close').click({
      multiple: true,
      force: true,
      waitForAnimations: true,
    });
    cy.get('#signin-signup-modal').should('not.exist');
  });
});
