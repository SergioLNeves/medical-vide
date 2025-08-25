describe('Autenticação - Login', () => {
  beforeEach(() => {
    // Limpar dados de sessão
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should display login form and validate inputs', () => {
    // Screenshot inicial da página de login
    cy.screenshotStep('login-page-inicial');

    // Verificar elementos principais
    cy.contains('Entrar no Medical Vide').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');

    // Testar validação - submeter vazio
    cy.get('button[type="submit"]').click();
    cy.screenshotStep('login-validacao-vazio');

    // Testar email inválido
    cy.get('input[type="email"]').type('email-invalido');
    cy.get('button[type="submit"]').click();
    cy.screenshotStep('login-validacao-email-invalido');
  });

  it('should test login with valid credentials for each role', () => {
    // Admin login
    cy.get('input[type="email"]').type('admin@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.screenshotStep('login-admin-credenciais');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin', { timeout: 10000 });
    cy.screenshotStep('login-admin-sucesso');

    // Voltar para página de login
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');

    // Médico login
    cy.get('input[type="email"]').type('medico@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.screenshotStep('login-medico-credenciais');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/medico', { timeout: 10000 });
    cy.screenshotStep('login-medico-sucesso');

    // Voltar para página de login
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');

    // Paciente login
    cy.get('input[type="email"]').type('paciente@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.screenshotStep('login-paciente-credenciais');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/paciente', { timeout: 10000 });
    cy.screenshotStep('login-paciente-sucesso');
  });

  it('should navigate to forgot password and register pages', () => {
    // Navegar para recuperação de senha
    cy.contains('Esqueceu sua senha?').click();
    cy.url().should('include', '/forgot-password');
    cy.screenshotStep('navegacao-esqueceu-senha');

    // Voltar para login e navegar para registro
    cy.visit('/');
    cy.contains('Cadastre-se').click();
    cy.url().should('include', '/register');
    cy.screenshotStep('navegacao-cadastro');
  });
});
