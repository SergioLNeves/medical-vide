describe('Medico - Dashboard', () => {
    beforeEach(() => {
        // Limpar dados de sessão
        cy.clearCookies();
        cy.clearLocalStorage();

        // Login como médico
        cy.visit('/');
        cy.get('input[type="email"]').type('medico@test.com');
        cy.get('input[type="password"]').type('123456');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/medico');
    });

    it('should display dashboard elements', () => {
        // Screenshot do dashboard
        cy.screenshotStep('dashboard-inicial');

        // Verificar elementos principais
        cy.contains(/Painel do Médico|Bem-vindo/i).should('be.visible');
        cy.contains(/Configurações|Editar Perfil/i).should('be.visible');
        cy.contains(/Agenda de Consultas/i).should('be.visible');

        // Verificar que o calendário existe
        cy.get('[class*="calendar"], [class*="Calendar"], .overflow-hidden.rounded-lg.border').should('exist');
    });
});
