describe('Patient Schedule Page', () => {
    beforeEach(() => {
        // Este teste pode ser pulado pois a rota é protegida pelo middleware
        // Vamos apenas testar se a página existe quando acessada diretamente
        cy.visit('/paciente/schedule', { failOnStatusCode: false });
    });

    it('should redirect unauthenticated users', () => {
        // Como não estamos autenticados, o middleware deve nos redirecionar para /
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should show login page after redirect', () => {
        // Após o redirecionamento, devemos estar na página de login
        cy.contains('Entrar no Medical Vide').should('be.visible');
    });
});
