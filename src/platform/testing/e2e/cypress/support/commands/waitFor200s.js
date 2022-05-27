/**
 * Waits on intercept-response(s) AND asserts 200 HTTP response-code(s).
 * This can help further minimize flakiness by further delaying downstream commands/assertions.
 *
 * @function waitFor200s
 * @param {string[]|string} aliases - Intercept-alias(es) to wait & assert on.
 * E.g., ['@featureToggles', '@personalInfo'] or '@featureToggles'.
 * @yields {object[]|object} Interception(s) waited & asserted on.
 */

Cypress.Commands.add('waitFor200s', aliases => {
  function assert200(intercept) {
    expect(intercept.response.statusCode).eq(200);
  }

  if (Array.isArray(aliases)) {
    // if multiple aliases...
    cy.wait(aliases).then(intercepts => {
      intercepts.forEach(i => {
        assert200(i);
      });
    });
  } else {
    // if single alias
    cy.wait(aliases).then(intercept => {
      assert200(intercept);
    });
  }
});
