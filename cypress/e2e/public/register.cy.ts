describe('Autenticação - Registro', () => {
  beforeEach(() => {
    // Limpar dados de sessão
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/register');
    cy.wait(1000); // Tempo para inicialização
  });

  it('should display form and validate inputs', () => {
    // Screenshot da página inicial
    cy.screenshotStep('registro-pagina-inicial');

    // Verificar elementos principais
    cy.contains('Criar conta').should('be.visible');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="confirmPassword"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');

    // Testar validação - formulário vazio
    cy.get('button[type="submit"]').click();
    cy.screenshotStep('registro-validacao-vazio');

    // Testar validação - email inválido
    cy.get('input[name="name"]').type('João Silva');
    cy.get('input[name="email"]').type('email-invalido');
    cy.get('button[type="submit"]').click();
    cy.screenshotStep('registro-validacao-email-invalido');

    // Testar validação - senhas diferentes
    cy.get('input[name="email"]').clear().type('joao@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="confirmPassword"]').type('654321');
    cy.get('button[type="submit"]').click();
    cy.screenshotStep('registro-validacao-senhas-diferentes');
  });

  it('should register new user successfully', () => {
    // Screenshot antes do preenchimento
    cy.screenshotStep('registro-antes-preenchimento');

    // Preencher formulário com dados válidos
    const randomEmail = `usuario${Date.now()}@teste.com`;

    cy.get('input[name="name"]').type('Novo Usuário');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="confirmPassword"]').type('123456');

    cy.screenshotStep('registro-formulario-preenchido');

    // Submeter formulário
    cy.get('button[type="submit"]').click();

    // Verificar redirecionamento para dashboard do paciente
    cy.url().should('include', '/paciente', { timeout: 10000 });
    cy.screenshotStep('registro-sucesso-redirecionamento');
  });

  it('should show error for existing email', () => {
    // Screenshot inicial
    cy.screenshotStep('registro-email-existente-inicial');

    // Tentar registrar com email que já existe
    cy.get('input[name="name"]').type('Admin Teste');
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="confirmPassword"]').type('123456');

    // Submeter formulário
    cy.get('button[type="submit"]').click();
    cy.wait(2000);

    // Verificar mensagem de erro
    cy.url().should('include', '/register');
    cy.screenshotStep('registro-email-existente-erro');
  });

  it('should navigate back to login page', () => {
    // Screenshot antes de voltar
    cy.screenshotStep('registro-antes-voltar');

    // Clicar no botão voltar
    cy.get('button').contains('Voltar').click();

    // Verificar redirecionamento para login
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Entrar no Medical Vide').should('be.visible');

    cy.screenshotStep('registro-apos-voltar');
  });
});
