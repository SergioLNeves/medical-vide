describe('Authentication - Forgot Password', () => {
  beforeEach(() => {
    cy.visit('/forgot-password');
  });

  it('should display forgot password page correctly', () => {
    // Screenshot inicial da página
    cy.screenshotStep('forgot-password-initial');

    // Verificar elementos principais
    cy.contains('Esqueceu sua senha?').should('be.visible');
    cy.contains(
      'Digite seu email e enviaremos um link para redefinir sua senha'
    ).should('be.visible');

    // Verificar campo de email
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="email"]').should(
      'have.attr',
      'placeholder',
      'seu@email.com'
    );

    // Screenshot dos elementos principais
    cy.screenshotStep('forgot-password-elements');

    // Verificar botões
    cy.get('button').contains('Voltar ao login').should('be.visible');
    cy.get('button')
      .contains('Enviar Link de Recuperação')
      .should('be.visible');

    // Screenshot dos botões
    cy.screenshotStep('forgot-password-buttons');

    // Verificar link para fazer login
    cy.contains('Lembrou da senha?').should('be.visible');
    cy.contains('Fazer login').should('be.visible');

    // Screenshot da seção de navegação
    cy.screenshotStep('forgot-password-navigation');
  });

  it('should test email validation', () => {
    // Screenshot inicial
    cy.screenshotStep('validation-initial');

    // Tentar submeter sem email
    cy.get('button[type="submit"]').click();

    // Screenshot após submissão vazia
    cy.screenshotStep('validation-empty-email');

    // Preencher email inválido
    cy.get('input[type="email"]').type('email-invalido');
    cy.get('button[type="submit"]').click();

    // Screenshot com email inválido
    cy.screenshotStep('validation-invalid-email');

    // Limpar e verificar se erro desaparece
    cy.get('input[type="email"]').clear();
    cy.screenshotStep('validation-cleared-email');
  });

  it('should test successful email submission', () => {
    // Screenshot inicial
    cy.screenshotStep('success-initial');

    // Preencher email válido
    cy.get('input[type="email"]').type('usuario@teste.com');

    // Screenshot com email preenchido
    cy.screenshotStep('success-email-filled');

    // Submeter formulário
    cy.get('button[type="submit"]').click();

    // Aguardar processamento
    cy.wait(2000);

    // Screenshot após submissão
    cy.screenshotStep('success-submitted');

    // Verificar se mudou para página de confirmação
    cy.contains('Email Enviado!').should('be.visible');
    cy.contains('Enviamos um link de recuperação para seu email').should(
      'be.visible'
    );

    // Screenshot da página de sucesso
    cy.screenshotStep('success-confirmation-page');

    // Verificar se o email aparece na confirmação
    cy.contains('usuario@teste.com').should('be.visible');

    // Screenshot com email confirmado
    cy.screenshotStep('success-email-confirmed');
  });

  it('should test success page functionality', () => {
    // Primeiro, enviar email para chegar na página de sucesso
    cy.get('input[type="email"]').type('teste@exemplo.com');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    // Screenshot da página de sucesso
    cy.screenshotStep('success-page-initial');

    // Verificar elementos da página de sucesso
    cy.contains('Email Enviado!').should('be.visible');
    cy.contains('Verifique sua caixa de entrada').should('be.visible');
    cy.contains('teste@exemplo.com').should('be.visible');

    // Screenshot dos elementos principais
    cy.screenshotStep('success-page-elements');

    // Verificar botões disponíveis
    cy.get('button').contains('Reenviar Email').should('be.visible');
    cy.get('button').contains('Voltar ao Login').should('be.visible');

    // Screenshot dos botões
    cy.screenshotStep('success-page-buttons');
  });

  it('should test resend email functionality', () => {
    // Enviar email primeiro
    cy.get('input[type="email"]').type('reenvio@teste.com');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    // Screenshot na página de sucesso
    cy.screenshotStep('resend-success-page');

    // Clicar em reenviar
    cy.get('button').contains('Reenviar Email').click();

    // Verificar se voltou para o formulário
    cy.contains('Esqueceu sua senha?').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');

    // Screenshot após reenviar
    cy.screenshotStep('resend-back-to-form');

    // Verificar se o campo de email está limpo
    cy.get('input[type="email"]').should('have.value', '');

    // Screenshot com campo limpo
    cy.screenshotStep('resend-form-cleared');
  });

  it('should test navigation back to login from form', () => {
    // Screenshot inicial
    cy.screenshotStep('nav-form-initial');

    // Preencher alguns dados
    cy.get('input[type="email"]').type('navegacao@teste.com');

    // Screenshot com dados preenchidos
    cy.screenshotStep('nav-form-filled');

    // Clicar em "Voltar ao login"
    cy.get('button').contains('Voltar ao login').click();

    // Verificar redirecionamento
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Screenshot da página de login
    cy.screenshotStep('nav-form-login-page');

    // Verificar elementos da página de login
    cy.contains('Entrar no Medical Vide').should('be.visible');
  });

  it('should test navigation back to login from success page', () => {
    // Enviar email primeiro
    cy.get('input[type="email"]').type('navegacao2@teste.com');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    // Screenshot da página de sucesso
    cy.screenshotStep('nav-success-initial');

    // Clicar em "Voltar ao Login"
    cy.get('button').contains('Voltar ao Login').click();

    // Verificar redirecionamento
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Screenshot da página de login
    cy.screenshotStep('nav-success-login-page');
  });

  it('should test "Fazer login" link', () => {
    // Screenshot inicial
    cy.screenshotStep('login-link-initial');

    // Clicar no link "Fazer login"
    cy.contains('Fazer login').click();

    // Verificar redirecionamento
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Screenshot da página de login
    cy.screenshotStep('login-link-redirected');

    // Verificar elementos da página de login
    cy.contains('Entrar no Medical Vide').should('be.visible');
  });
});
