describe('Authentication - Register', () => {
  beforeEach(() => {
    // Clear cookies but keep localStorage with mock data
    cy.clearCookies();
    cy.visit('/register');

    // Ensure mock data is initialized by visiting once
    // This will trigger initializeUsers() in the useEffect
    cy.wait(1000); // Give time for initialization
  });

  it('should display register page correctly', () => {
    // Screenshot inicial da página de registro
    cy.screenshotStep('register-page-initial');

    // Verificar elementos principais
    cy.contains('Criar conta').should('be.visible');
    cy.contains('Cadastre-se como paciente para acessar o sistema').should(
      'be.visible'
    );

    // Verificar campos do formulário
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="confirmPassword"]').should('be.visible');

    // Screenshot dos elementos do formulário
    cy.screenshotStep('register-form-elements');

    // Verificar botões
    cy.get('button').contains('Voltar').should('be.visible');
    cy.get('button').contains('Cadastrar').should('be.visible');

    // Screenshot dos botões
    cy.screenshotStep('register-form-buttons');
  });

  it('should test form validation', () => {
    // Screenshot inicial
    cy.screenshotStep('register-validation-initial');

    // Tentar submeter formulário vazio
    cy.get('button[type="submit"]').click();

    // Screenshot após submissão vazia
    cy.screenshotStep('register-validation-empty');

    // Preencher apenas nome
    cy.get('input[name="name"]').type('João Silva');
    cy.get('button[type="submit"]').click();

    // Screenshot com apenas nome
    cy.screenshotStep('register-validation-name-only');

    // Adicionar email inválido
    cy.get('input[name="email"]').type('email-invalido');
    cy.get('button[type="submit"]').click();

    // Screenshot com email inválido
    cy.screenshotStep('register-validation-invalid-email');

    // Corrigir email e adicionar senha muito curta
    cy.get('input[name="email"]').clear().type('joao@teste.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    // Screenshot com senha muito curta
    cy.screenshotStep('register-validation-short-password');

    // Adicionar senha válida mas confirmação diferente
    cy.get('input[name="password"]').clear().type('123456');
    cy.get('input[name="confirmPassword"]').type('654321');
    cy.get('button[type="submit"]').click();

    // Screenshot com senhas não coincidentes
    cy.screenshotStep('register-validation-password-mismatch');
  });

  it('should test successful registration', () => {
    // Screenshot inicial
    cy.screenshotStep('register-success-initial');

    // Preencher formulário corretamente
    cy.get('input[name="name"]').type('Maria Santos');
    cy.get('input[name="email"]').type('maria.santos@teste.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('input[name="confirmPassword"]').type('senha123');

    // Screenshot com formulário preenchido
    cy.screenshotStep('register-form-filled');

    // Submeter formulário
    cy.get('button[type="submit"]').click();

    // Verificar se foi redirecionado para dashboard do paciente
    cy.url().should('include', '/paciente', { timeout: 10000 });

    // Screenshot da página após registro
    cy.screenshotStep('register-success-redirect');
  });

  it('should test registration with existing email', () => {
    // Screenshot inicial
    cy.screenshotStep('register-existing-email-initial');

    // First, let's create a user by registering successfully
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test.user@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="confirmPassword"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Wait for redirect to complete the registration
    cy.url().should('include', '/paciente', { timeout: 10000 });

    // Now go back to register page
    cy.visit('/register');

    // Try to register with the same email again
    cy.get('input[name="name"]').clear().type('Another User');
    cy.get('input[name="email"]').clear().type('test.user@teste.com');
    cy.get('input[name="password"]').clear().type('123456');
    cy.get('input[name="confirmPassword"]').clear().type('123456');

    // Screenshot com dados preenchidos
    cy.screenshotStep('register-existing-email-filled');

    // Submeter formulário
    cy.get('button[type="submit"]').click();

    // Wait a bit for processing
    cy.wait(1000);

    // Screenshot após tentativa
    cy.screenshotStep('register-existing-email-result');

    // Verificar se permaneceu na página de registro
    cy.url().should('include', '/register');

    // Verificar se mensagem de erro apareceu
    cy.get('[data-testid="error-message"]', { timeout: 10000 }).should(
      'be.visible'
    );
    cy.get('[data-testid="error-message"]').should(
      'contain.text',
      'Email já cadastrado'
    );

    // Screenshot da mensagem de erro
    cy.screenshotStep('register-existing-email-error');
  });

  it('should test registration with pre-existing mock user email', () => {
    // Screenshot inicial
    cy.screenshotStep('register-mock-user-initial');

    // Try to register with admin@test.com which should exist in mock data
    cy.get('input[name="name"]').type('Admin Teste');
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="confirmPassword"]').type('123456');

    // Screenshot com dados preenchidos
    cy.screenshotStep('register-mock-user-filled');

    // Submeter formulário
    cy.get('button[type="submit"]').click();

    // Wait a bit for processing
    cy.wait(2000);

    // Screenshot após tentativa
    cy.screenshotStep('register-mock-user-result');

    // Should either show error or redirect - let's check both possibilities
    cy.url().then((url) => {
      if (url.includes('/register')) {
        // If stayed on register, should show error
        cy.get('[data-testid="error-message"]').should('be.visible');
        cy.screenshotStep('register-mock-user-error-shown');
      } else if (url.includes('/paciente')) {
        // If redirected, the email check might have failed - this is the bug we're investigating
        cy.screenshotStep('register-mock-user-unexpected-success');
        // Force fail this case since it shouldn't happen
        expect(url).to.include('/register');
      }
    });
  });

  it('should test navigation back to login', () => {
    // Screenshot inicial
    cy.screenshotStep('register-back-initial');

    // Preencher alguns dados primeiro
    cy.get('input[name="name"]').type('Usuário Teste');
    cy.get('input[name="email"]').type('usuario@teste.com');

    // Screenshot com dados parcialmente preenchidos
    cy.screenshotStep('register-back-partial-fill');

    // Clicar em voltar
    cy.get('button').contains('Voltar').click();

    // Verificar redirecionamento para login
    cy.url().should('not.include', '/register');
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Screenshot da página de login
    cy.screenshotStep('register-back-to-login');

    // Verificar elementos da página de login
    cy.contains('Entrar no Medical Vide').should('be.visible');
  });

  it('should test form field interactions', () => {
    // Screenshot inicial
    cy.screenshotStep('register-interactions-initial');

    // Testar focus nos campos
    cy.get('input[name="name"]').focus();
    cy.screenshotStep('register-name-focused');

    cy.get('input[name="email"]').focus();
    cy.screenshotStep('register-email-focused');

    cy.get('input[name="password"]').focus();
    cy.screenshotStep('register-password-focused');

    cy.get('input[name="confirmPassword"]').focus();
    cy.screenshotStep('register-confirm-password-focused');

    // Preencher campos gradualmente
    cy.get('input[name="name"]').type('Ana Costa');
    cy.screenshotStep('register-name-filled');

    cy.get('input[name="email"]').type('ana.costa@teste.com');
    cy.screenshotStep('register-email-filled');

    cy.get('input[name="password"]').type('minhasenha123');
    cy.screenshotStep('register-password-filled');

    cy.get('input[name="confirmPassword"]').type('minhasenha123');
    cy.screenshotStep('register-all-filled');
  });
});
