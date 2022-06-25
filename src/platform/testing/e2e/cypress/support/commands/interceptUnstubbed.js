/**
 * Returns 200 with empty data for unstubbed API responses.
 * Use this as the LAST intercept, after all your intercepts are stubbed.
 * Helps minimize flakes by preventing any requests to non-existent API-server.
 */

Cypress.Commands.add('interceptUnstubbed', (alias = 'alias') => {
  cy.intercept(
    {
      headers: {
        accept: 'application/json',
      },
    },
    {
      data: null,
      statusCode: 200,
    },
  ).as(alias);
});
