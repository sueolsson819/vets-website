import features from '../mocks/enabled.json';

import mockCheckIn from '../../api/local-mock-api/mocks/check.in.response';
import mockValidate from '../../api/local-mock-api/mocks/validate.responses';

describe('Check In Experience -- ', () => {
  beforeEach(function() {
    if (Cypress.env('CI')) this.skip();
    cy.intercept('GET', '/check_in/v0/patient_check_ins//*', req => {
      req.reply(mockValidate.createMockSuccessResponse({}));
    });
    cy.intercept('POST', '/check_in/v0/patient_check_ins/', req => {
      req.reply(mockCheckIn.createMockSuccessResponse({}));
    });
    cy.intercept('GET', '/v0/feature_toggles*', features);
    cy.window().then(window => {
      const sample = JSON.stringify({
        token: '46bebc0a-b99c-464f-a5c5-560bc9eae287',
      });
      window.sessionStorage.setItem(
        'health.care.check-in.current.uuid',
        sample,
      );
    });
  });
  it('on page reload, the data should be pull from session storage and redirected to landing screen with data loaded', () => {
    const featureRoute = '/health-care/appointment-check-in/details';
    cy.visit(featureRoute);
    // redirected back to landing page to reload the data
    cy.url().should('match', /id=46bebc0a-b99c-464f-a5c5-560bc9eae287/);
    cy.get('legend > h2').contains('information');
  });
});
