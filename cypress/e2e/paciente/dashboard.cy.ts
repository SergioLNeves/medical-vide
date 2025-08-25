describe('Paciente - Dashboard', () => {
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

  it('should display dashboard elements', () => {
    // Screenshot do dashboard
    cy.screenshotStep('dashboard-inicial');

    // Verificar elementos principais
    cy.contains(/Agendar Consulta|Agendar/i).should('be.visible');
    cy.contains(/Configurações|Perfil/i).should('be.visible');
    cy.get('#agendamentos').should('be.visible');

    // Verificar que o botão de Agendar existe
    cy.contains(/Agendar/i).should('be.visible');
  });
});
