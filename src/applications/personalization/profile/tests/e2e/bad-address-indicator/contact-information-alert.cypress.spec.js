import { user72Success, badAddress } from '../../../mocks/user';

import { generateFeatureToggles } from '../../../mocks/feature-toggles';

import BadAddressFeature from './BadAddressFeature';

describe('Bad Address Alert -- Contact Page', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '/v0/feature_toggles*',
      generateFeatureToggles({ profileShowBadAddressIndicator: true }),
    );
  });

  it('should display bad address', () => {
    cy.intercept('GET', '/v0/user', badAddress);
    cy.login(badAddress);
    BadAddressFeature.visitContactInformationPage();
    cy.injectAxeThenAxeCheck();
    BadAddressFeature.confirmContactInformationAlertIsShowing();
  });
  it('should not show the bad address', () => {
    cy.intercept('GET', '/v0/user', user72Success);
    cy.login(user72Success);
    BadAddressFeature.visitContactInformationPage();
    cy.injectAxeThenAxeCheck();
    BadAddressFeature.confirmPersonalInformationAlertIsNotShowing();
  });
  it('has the accessability concerns', () => {
    cy.intercept('GET', '/v0/user', badAddress);
    cy.login(badAddress);
    BadAddressFeature.visitContactInformationPage();
    cy.injectAxeThenAxeCheck();
    BadAddressFeature.confirmContactPageHasAccessibilityConcerns();
  });
});
