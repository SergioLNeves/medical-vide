describe('Debug Forgot Password', () => {
    beforeEach(() => {
        cy.visit('/forgot-password');
    });

    it('should test successful email submission (copy of original)', () => {
        cy.log('Success: Initial state');
        cy.screenshot('success-initial');

        // Preencher campo de email
        cy.get('input[type="email"]').type('admin@test.com');
        cy.log('Success: Email filled');
        cy.screenshot('success-email-filled');

        // Submeter formulário
        cy.get('button[type="submit"]').click();

        // Aguardar processamento com tempo adequado
        cy.wait(5000);

        // Screenshot após submissão
        cy.screenshot('success-submitted');

        // The exact same test as the original - but in debug context
        cy.get('[data-slot="card-title"]').contains('Email Enviado!').should('be.visible');
    });
});
