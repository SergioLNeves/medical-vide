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

// Custom command to take screenshot with descriptive name
Cypress.Commands.add('takeScreenshot', (name: string) => {
    cy.screenshot(name, { capture: 'fullPage' });
});

// Custom command to take screenshot on test steps
Cypress.Commands.add('screenshotStep', (stepName: string) => {
    const testName = Cypress.currentTest.title;
    const specName = Cypress.spec.name;

    // Extrair a categoria da pasta do arquivo de teste
    const pathParts = specName.split('/');
    const category = pathParts.length > 1 ? pathParts[pathParts.length - 2] : 'general';

    // Criar nome do screenshot organizando por categoria
    const screenshotPath = `${category}/${testName.replace(/\s+/g, '-')}-${stepName}`;

    cy.screenshot(screenshotPath, { capture: 'viewport' });
});

export { }; // Make this a module

// Extend Cypress namespace
declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>;
            hasFormError(errorMessage: string): Chainable<void>;
            takeScreenshot(name: string): Chainable<void>;
            screenshotStep(stepName: string): Chainable<void>;
        }
    }
}
