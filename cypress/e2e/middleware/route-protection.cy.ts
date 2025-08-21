describe('Private Route Protection', () => {
  beforeEach(() => {
    // Clear cookies and localStorage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should redirect unauthenticated users from admin routes', () => {
    // Screenshot inicial
    cy.screenshotStep('admin-protection-initial');

    // Tentar acessar admin sem autenticação
    cy.visit('/admin', { failOnStatusCode: false });

    // Verificar redirecionamento para login
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Screenshot após redirecionamento
    cy.screenshotStep('admin-protection-redirected');

    // Verificar elementos da página de login
    cy.contains('Entrar no Medical Vide').should('be.visible');

    // Tentar acessar create-user sem autenticação
    cy.visit('/admin/create-user', { failOnStatusCode: false });

    // Verificar redirecionamento para login
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Screenshot após tentativa de acesso create-user
    cy.screenshotStep('admin-create-user-protection-redirected');
  });

  it('should redirect unauthenticated users from medico routes', () => {
    // Screenshot inicial
    cy.screenshotStep('medico-protection-initial');

    // Tentar acessar medico sem autenticação
    cy.visit('/medico', { failOnStatusCode: false });

    // Verificar redirecionamento para login
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Screenshot após redirecionamento
    cy.screenshotStep('medico-protection-redirected');

    // Verificar elementos da página de login
    cy.contains('Entrar no Medical Vide').should('be.visible');
  });

  it('should redirect unauthenticated users from paciente routes', () => {
    // Screenshot inicial
    cy.screenshotStep('paciente-protection-initial');

    // Tentar acessar paciente sem autenticação
    cy.visit('/paciente', { failOnStatusCode: false });

    // Verificar redirecionamento para login
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Screenshot após redirecionamento
    cy.screenshotStep('paciente-protection-redirected');

    // Verificar elementos da página de login
    cy.contains('Entrar no Medical Vide').should('be.visible');
  });

  it('should redirect users to correct role-based routes', () => {
    // Testar redirecionamento baseado em role - Admin
    cy.visit('/');
    cy.get('input[type="email"]').type('admin@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/admin', { timeout: 10000 });
    cy.screenshotStep('admin-role-redirect');

    // Fazer logout
    cy.clearCookies();
    cy.visit('/');

    // Testar redirecionamento baseado em role - Médico
    cy.get('input[type="email"]').type('medico@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/medico', { timeout: 10000 });
    cy.screenshotStep('medico-role-redirect');

    // Fazer logout
    cy.clearCookies();
    cy.visit('/');

    // Testar redirecionamento baseado em role - Paciente
    cy.get('input[type="email"]').type('paciente@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/paciente', { timeout: 10000 });
    cy.screenshotStep('paciente-role-redirect');
  });

  it('should prevent cross-role access', () => {
    // Login como admin
    cy.visit('/');
    cy.get('input[type="email"]').type('admin@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin', { timeout: 10000 });

    // Screenshot do admin logado
    cy.screenshotStep('admin-logged-in');

    // Tentar acessar rota do médico
    cy.visit('/medico', { failOnStatusCode: false });

    // Deve redirecionar de volta para admin
    cy.url().should('include', '/admin', { timeout: 10000 });

    // Screenshot após redirecionamento
    cy.screenshotStep('admin-blocked-from-medico');

    // Tentar acessar rota do paciente
    cy.visit('/paciente', { failOnStatusCode: false });

    // Deve redirecionar de volta para admin
    cy.url().should('include', '/admin', { timeout: 10000 });

    // Screenshot após segundo redirecionamento
    cy.screenshotStep('admin-blocked-from-paciente');
  });

  it('should show loading state during authentication check', () => {
    // Screenshot inicial
    cy.screenshotStep('loading-state-initial');

    // Visitar uma rota protegida
    cy.visit('/admin', { failOnStatusCode: false });

    // Durante o carregamento, pode aparecer componente de loading
    // (se for muito rápido, pode não capturar, mas vale a tentativa)
    cy.screenshotStep('loading-state-checking');

    // Aguardar redirecionamento final
    cy.wait(1000);
    cy.screenshotStep('loading-state-final');
  });
});
