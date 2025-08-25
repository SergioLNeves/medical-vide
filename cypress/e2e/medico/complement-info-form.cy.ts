describe('Medico - Formulário de Informações Complementares', () => {
    beforeEach(() => {
        // Limpar dados de sessão
        cy.clearCookies();
        cy.clearLocalStorage();

        // Login como médico
        cy.visit('/');
        cy.get('input[type="email"]').type('medico@test.com');
        cy.get('input[type="password"]').type('123456');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/medico');

        // Navegar para o formulário
        cy.visit('/medico/complement-info');
    });

    it('should display form and submit successfully', () => {
        // Screenshot do formulário
        cy.screenshotStep('formulario-inicial');

        // Verificar elementos principais
        cy.contains(/Informações Profissionais/i).should('be.visible');
        cy.contains(/Informações Pessoais/i).should('be.visible');

        // Preencher campos principais
        cy.get('input[id="cpf"]').clear().type('12345678900');
        cy.get('input[id="crm"]').clear().type('123456/SP');

        // Selecionar especialidade
        cy.get('button[role="combobox"]').click();
        cy.contains(/Cardiologia|Dermatologia|Pediatria/).first().click({ force: true });

        // Enviar formulário
        cy.get('button[type="submit"]').click({ force: true });
        cy.wait(2000);

        // Screenshot após submissão
        cy.screenshotStep('formulario-apos-submissao');
    });

    it('should allow navigation back to dashboard', () => {
        // Screenshot antes de voltar
        cy.screenshotStep('antes-voltar');

        // Clicar no botão voltar
        cy.get('button').contains(/Voltar|Cancelar/).click();

        // Verificar redirecionamento
        cy.url().should('include', '/medico').and('not.include', '/complement-info');

        // Screenshot após voltar
        cy.screenshotStep('apos-voltar');
    });
});
