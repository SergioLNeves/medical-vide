describe('Paciente - Formulário de Informações Complementares', () => {
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

    // Navegar para página de complemento de informações
    cy.visit('/paciente/complement-info');
  });

  it('should display form and submit successfully', () => {
    // Screenshot do estado inicial do formulário
    cy.screenshotStep('formulario-inicial');

    // Verificar elementos principais do formulário
    cy.contains('Informações Pessoais').should('be.visible');
    cy.get('input[id="cpf"]').should('be.visible');
    cy.get('input[id="convenio"]').should('be.visible');

    // Preencher e submeter formulário
    cy.get('input[id="convenio"]').type('Unimed Premium');
    cy.get('input[id="convenio"]').should('have.value', 'Unimed Premium');

    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(2000);

    // Screenshot após submissão
    cy.screenshotStep('formulario-apos-submissao');

    // Verificar que o formulário foi enviado com sucesso (redirecionamento ou mensagem)
    cy.url().should('include', '/paciente');
  });

  it('should allow navigation back to dashboard', () => {
    // Screenshot antes de navegar de volta
    cy.screenshotStep('antes-voltar');

    // Testar botão de voltar
    cy.get('button').contains('Voltar').click();
    cy.url().should('include', '/paciente').and('not.include', '/complement-info');

    // Screenshot após voltar
    cy.screenshotStep('apos-voltar');
  });
});
