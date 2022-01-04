import '../../../../tests/e2e/commands';

import ApiInitializer from '../../../../api/local-mock-api/e2e/ApiInitializer';
import ValidateVeteran from '../../../../tests/e2e/pages/ValidateVeteran';
import Appointments from '../pages/Appointments';
import Demographics from '../../../../tests/e2e/pages/Demographics';
import NextOfKin from '../../../../tests/e2e/pages/NextOfKin';

describe('Check In Experience', () => {
  describe('Appointment display', () => {
    beforeEach(function() {
      const appointments = [
        {
          eligibility: 'INELIGIBLE_TOO_EARLY',
          startTime: '2021-08-19T12:00:00',
          checkInWindowStart: '2021-08-19T11:00:00',
        },
        {
          eligibility: 'INELIGIBLE_TOO_EARLY',
          startTime: '2021-08-19T14:00:00',
          checkInWindowStart: undefined,
        },
      ];
      const {
        initializeFeatureToggle,
        initializeSessionGet,
        initializeSessionPost,
        initializeCheckInDataGet,
      } = ApiInitializer;
      initializeFeatureToggle.withoutEmergencyContact();
      initializeSessionGet.withSuccessfulNewSession();
      initializeSessionPost.withSuccess();
      initializeCheckInDataGet.withSuccess({ appointments });

      cy.visitWithUUID();
      ValidateVeteran.validatePageLoaded('Check in at VA');
      ValidateVeteran.validateVeteran();
      ValidateVeteran.attemptToGoToNextPage();
      Demographics.attemptToGoToNextPage();
      NextOfKin.attemptToGoToNextPage();
      Appointments.validatePageLoaded();
    });
    afterEach(() => {
      cy.window().then(window => {
        window.sessionStorage.clear();
      });
    });
    it('Appointment shows early status with time and without', () => {
      Appointments.validateEarlyStatusWithoutTime();
      Appointments.validateEarlyStatusWithTime();
      cy.injectAxeThenAxeCheck();
    });
  });
});
