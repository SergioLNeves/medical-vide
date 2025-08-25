describe('Admin - Dashboard', () => {
  beforeEach(() => {
    // Limpar dados de sessão
    cy.clearCookies();
    cy.clearLocalStorage();

    // Login como admin
    cy.visit('/');
    cy.get('input[type="email"]').type('admin@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin');
  });

  it('should display dashboard with user management interface', () => {
    // Screenshot do dashboard
    cy.screenshotStep('dashboard-inicial');

    // Verificar elementos principais
    cy.contains(/Gerenciar Usuários/i).should('be.visible');
    cy.contains(/Gerencie todos os usuários/i).should('be.visible');

    // Verificar campo de busca
    cy.get('input[placeholder*="Filtrar"]').should('be.visible');

    // Verificar botão de adicionar usuário
    cy.contains(/Adicionar Usuário/i).should('be.visible');

    // Verificar tabela de usuários
    cy.get('table, [class*="border"]').should('be.visible');

    // Screenshot da tabela
    cy.screenshotStep('tabela-usuarios');
  });

  it('should navigate to create user page', () => {
    // Screenshot antes de navegar
    cy.screenshotStep('antes-navegacao');

    // Clicar no botão de adicionar usuário
    cy.contains(/Adicionar Usuário/i).click();

    // Verificar redirecionamento
    cy.url().should('include', '/admin/create-user');

    // Verificar título da página
    cy.contains(/Criar Novo Usuário/i).should('be.visible');

    // Screenshot da página de criar usuário
    cy.screenshotStep('pagina-criar-usuario');
  });
});
