import '../../../../tests/e2e/commands';

import ApiInitializer from '../../../../api/local-mock-api/e2e/ApiInitializer';
import ValidateVeteran from '../../../../tests/e2e/pages/ValidateVeteran';
import Introduction from '../pages/Introduction';
import Confirmation from '../pages/Confirmation';
import Demographics from '../../../../tests/e2e/pages/Demographics';
import EmergencyContact from '../../../../tests/e2e/pages/EmergencyContact';

describe('Pre Check In Experience', () => {
  describe('update skip path', () => {
    beforeEach(() => {
      const now = Date.now();
      const today = new Date(now);
      const {
        initializeFeatureToggle,
        initializeSessionGet,
        initializeSessionPost,
        initializePreCheckInDataGet,
        initializePreCheckInDataPost,
      } = ApiInitializer;
      initializeFeatureToggle.withCurrentFeatures();
      initializeSessionGet.withSuccessfulNewSession();
      initializeSessionPost.withSuccess();
      initializePreCheckInDataGet.withSuccess({
        demographicsNeedsUpdate: true,
        demographicsConfirmedAt: today.toISOString(),
        nextOfKinNeedsUpdate: false,
        nextOfKinConfirmedAt: today.toISOString(),
        emergencyContactNeedsUpdate: true,
        emergencyContactConfirmedAt: today.toISOString(),
      });
      initializePreCheckInDataPost.withSuccess();

      cy.visitPreCheckInWithUUID();
      ValidateVeteran.validatePageLoaded();
      ValidateVeteran.validateVeteran();
      ValidateVeteran.attemptToGoToNextPage();
      Introduction.validatePageLoaded();
      Introduction.attemptToGoToNextPage();
    });
    afterEach(() => {
      cy.window().then(window => {
        window.sessionStorage.clear();
      });
    });
    it('update demographics, skip next of kin path, and update emergency contact', () => {
      Demographics.validatePageLoaded();
      Demographics.attemptToGoToNextPage();
      EmergencyContact.validatePageLoaded();
      EmergencyContact.attemptToGoToNextPage();
      Confirmation.validatePageLoaded();
      cy.injectAxeThenAxeCheck();
    });
  });
});
