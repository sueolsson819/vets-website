import '../../../../tests/e2e/commands';
import ApiInitializer from '../../../../api/local-mock-api/e2e/ApiInitializer';
import ValidateVeteran from '../../../../tests/e2e/pages/ValidateVeteran';
import Appointments from '../pages/Appointments';
import Demographics from '../../../../tests/e2e/pages/Demographics';
import EmergencyContact from '../../../../tests/e2e/pages/EmergencyContact';
import NextOfKin from '../../../../tests/e2e/pages/NextOfKin';

describe('Check In Experience', () => {
  describe('Appointment display', () => {
    beforeEach(() => {
      const appointments = [{ eligibility: 'ELIGIBLE' }];
      const {
        initializeFeatureToggle,
        initializeSessionGet,
        initializeSessionPost,
        initializeCheckInDataGet,
      } = ApiInitializer;
      initializeFeatureToggle.withCurrentFeatures();
      initializeSessionGet.withSuccessfulNewSession();
      initializeSessionPost.withSuccess();
      initializeCheckInDataGet.withSuccess({ appointments });
      cy.visitWithUUID();
      ValidateVeteran.validatePage.dayOf();
      ValidateVeteran.validateVeteran();
      ValidateVeteran.attemptToGoToNextPage();
      Demographics.attemptToGoToNextPage();
      EmergencyContact.attemptToGoToNextPage();
      NextOfKin.attemptToGoToNextPage();
    });
    afterEach(() => {
      cy.window().then(window => {
        window.sessionStorage.clear();
      });
    });
    it('Appointment is eligible for checkin and button is present.', () => {
      Appointments.validateEligibleStatus();
      cy.injectAxeThenAxeCheck();
    });
  });
});
