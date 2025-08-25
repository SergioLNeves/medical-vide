describe('Admin - Criar Usuário', () => {
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

    // Navegar para página de criar usuário
    cy.visit('/admin/create-user');
  });

  it('should display form and fill with valid data', () => {
    // Screenshot inicial
    cy.screenshotStep('formulario-inicial');

    // Verificar elementos principais
    cy.contains(/Criar Novo Usuário/i).should('be.visible');
    cy.contains(/Crie novos usuários/i).should('be.visible');

    // Selecionar função
    cy.contains(/Selecione uma função/i).click();
    cy.contains(/Paciente|Médico|Administrador/i).first().click();

    // Preencher nome e email
    cy.get('input[name="fullName"]').type('Usuário Teste');
    cy.get('input[name="email"]').type('usuario.teste@example.com');

    // Screenshot com formulário preenchido
    cy.screenshotStep('formulario-preenchido');

    // Submeter formulário
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    // Screenshot após submissão
    cy.screenshotStep('apos-submissao');
  });

  it('should navigate back to dashboard', () => {
    // Screenshot antes de voltar
    cy.screenshotStep('antes-voltar');

    // Clicar no botão voltar
    cy.contains(/Voltar|Cancelar/i).click();

    // Verificar redirecionamento
    cy.url().should('include', '/admin').and('not.include', '/create-user');

    // Screenshot após voltar
    cy.screenshotStep('apos-voltar');
  });
});
