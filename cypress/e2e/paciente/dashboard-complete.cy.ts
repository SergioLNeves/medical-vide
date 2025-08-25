describe('Paciente - Dashboard Completo', () => {
    beforeEach(() => {
        // Limpar dados de sessão
        cy.clearCookies();
        cy.clearLocalStorage();

        // Login como paciente
        cy.visit('/');
        cy.get('input[type="email"]').type('paciente@test.com');
        cy.get('input[type="password"]').type('123456');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/paciente');
    });

    it('should display all dashboard elements and functionality', () => {
        // Screenshot do dashboard completo
        cy.screenshotStep('dashboard-completo-inicial');

        // Verificar todos os elementos principais
        cy.contains('Agendar Consulta').should('be.visible');
        cy.contains('Configurações do Perfil').should('be.visible');
        cy.contains('Meus Agendamentos').should('be.visible');

        // Verificar cards de ação
        cy.contains('Agendar').should('be.visible');
        cy.contains('Editar Perfil').should('be.visible');

        // Verificar seção de agendamentos
        cy.get('#agendamentos').should('be.visible');

        // Verificar navbar
        cy.get('nav, header').should('exist');

        // Testar navegação para edição de perfil
        cy.contains('Editar Perfil').click();
        cy.url().should('include', '/complement-info');
        cy.screenshotStep('navegacao-edicao-perfil');

        // Voltar para dashboard e testar navegação para agendamento
        cy.visit('/paciente');
        cy.contains('Agendar').click();
        cy.url().should('include', '/schedule');
        cy.screenshotStep('navegacao-agendar');
    });
});
