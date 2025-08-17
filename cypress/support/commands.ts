// ***********************************************
// This commands file allows you to create custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to simulate login
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button', 'Entrar').click();
});

// Custom command to check if form has validation error
Cypress.Commands.add('hasFormError', (errorMessage: string) => {
    cy.contains(errorMessage).should('be.visible');
});

export { }; // Make this a module

// Extend Cypress namespace
declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>;
            hasFormError(errorMessage: string): Chainable<void>;
        }
    }
}
