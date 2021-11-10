import { generateFeatureToggles } from '../../../../api/local-mock-api/mocks/feature.toggles';
import '../../support/commands';
import Timeouts from 'platform/testing/e2e/timeouts';

describe('Check In Experience -- ', () => {
  describe('phase 3 -- ', () => {
    beforeEach(function() {
      cy.authenticate();
      const appointments = [
        { startTime: '2021-08-19T03:00:00' },
        { startTime: '2021-08-19T13:00:00' },
        { startTime: '2021-08-19T18:00:00' },
      ];
      cy.getAppointments(appointments);
      cy.successfulCheckin();
      cy.intercept(
        'GET',
        '/v0/feature_toggles*',
        generateFeatureToggles({
          checkInExperienceUpdateInformationPageEnabled: false,
        }),
      );
    });
    afterEach(() => {
      cy.window().then(window => {
        window.sessionStorage.clear();
      });
    });
    it('Appointments are displayed in a sorted manner', () => {
      cy.visitWithUUID();
      cy.get('h1').contains('Check in at VA');
      cy.injectAxe();
      cy.axeCheck();
      cy.signIn();
      cy.get('h1', { timeout: Timeouts.slow })
        .should('be.visible')
        .and('contain', 'Your appointments');
      cy.get('.appointment-list > li').should('have.length', 3);
      cy.injectAxe();
      cy.axeCheck();
      cy.get(
        ':nth-child(1) > .appointment-summary > [data-testid=appointment-time]',
        { timeout: Timeouts.slow },
      )
        .should('be.visible')
        .and('contain', '3:00 a.m.');
      cy.get(
        ':nth-child(3) > .appointment-summary > [data-testid=appointment-time]',
        { timeout: Timeouts.slow },
      )
        .should('be.visible')
        .and('contain', '6:00 p.m.');
    });
  });
});
