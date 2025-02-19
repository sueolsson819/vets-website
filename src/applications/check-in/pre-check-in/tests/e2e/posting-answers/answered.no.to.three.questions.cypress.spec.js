import '../../../../tests/e2e/commands';

import ApiInitializer from '../../../../api/local-mock-api/e2e/ApiInitializer';
import ValidateVeteran from '../../../../tests/e2e/pages/ValidateVeteran';
import Introduction from '../pages/Introduction';
import Demographics from '../../../../tests/e2e/pages/Demographics';
import NextOfKin from '../../../../tests/e2e/pages/NextOfKin';
import EmergencyContact from '../../../../tests/e2e/pages/EmergencyContact';
import Confirmation from '../pages/Confirmation';

describe('Pre-Check In Experience ', () => {
  let apiData = {};
  beforeEach(() => {
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

    apiData = initializePreCheckInDataGet.withSuccess();

    initializePreCheckInDataPost.withSuccess(req => {
      expect(req.body.preCheckIn.uuid).to.equal(
        '0429dda5-4165-46be-9ed1-1e652a8dfd83',
      );
      expect(req.body.preCheckIn.demographicsUpToDate).to.equal(false);
      expect(req.body.preCheckIn.nextOfKinUpToDate).to.equal(false);
      expect(req.body.preCheckIn.emergencyContactUpToDate).to.equal(false);
    });
  });
  afterEach(() => {
    cy.window().then(window => {
      window.sessionStorage.clear();
    });
  });
  it('Answered yes to both questions', () => {
    cy.visitPreCheckInWithUUID();
    // page: Validate
    ValidateVeteran.validatePage.preCheckIn();
    cy.injectAxeThenAxeCheck();
    ValidateVeteran.validateVeteran();

    ValidateVeteran.attemptToGoToNextPage();

    // page: Introduction
    Introduction.validatePageLoaded();
    cy.injectAxeThenAxeCheck();

    Introduction.countAppointmentList(apiData.payload.appointments.length);
    Introduction.attemptToGoToNextPage();

    // page: Demographics
    Demographics.validatePageLoaded();
    cy.injectAxeThenAxeCheck();

    Demographics.attemptToGoToNextPage('no');

    // page: Emergency Contact
    EmergencyContact.validatePageLoaded();
    cy.injectAxeThenAxeCheck();

    EmergencyContact.attemptToGoToNextPage('no');

    // page: Next of Kin
    NextOfKin.validatePageLoaded();
    cy.injectAxeThenAxeCheck();

    NextOfKin.attemptToGoToNextPage('no');

    // page: Confirmation
    Confirmation.validatePageLoaded();
    cy.injectAxeThenAxeCheck();
  });
});
