import '../../../../tests/e2e/commands';

import ApiInitializer from '../../../../api/local-mock-api/e2e/ApiInitializer';
import ValidateVeteran from '../../../../tests/e2e/pages/ValidateVeteran';

describe('Check In Experience -- ', () => {
  describe('extra validation -- ', () => {
    beforeEach(function() {
      const {
        initializeFeatureToggle,
        initializeSessionGet,
        initializeSessionPost,
      } = ApiInitializer;
      initializeFeatureToggle.withCurrentFeatures();
      initializeSessionGet.withSuccessfulNewSession();
      initializeSessionPost.withSuccess();

      cy.visitWithUUID();
      ValidateVeteran.validatePageLoaded('Check in at VA');
    });
    afterEach(() => {
      cy.window().then(window => {
        window.sessionStorage.clear();
      });
    });
    it('shows the numeric keypad on mobile devices', () => {
      ValidateVeteran.validateLast4InputType();
      cy.injectAxeThenAxeCheck();
    });
  });
});
