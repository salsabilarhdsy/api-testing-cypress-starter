// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAPI', (username = 'emilys', password = 'emilyspass') => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      body: {
        username,
        password,
      },
    }).then((res) => {
      // Validate the response status
      expect(res.status).to.eq(200)
      // Save the token to Cypress environment variable
      Cypress.env('token', res.body.accessToken)
    })
  })
