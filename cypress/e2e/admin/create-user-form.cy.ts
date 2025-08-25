describe('Admin - Formulário de Criação de Usuário', () => {
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

    it('should display form elements and select role', () => {
        // Screenshot inicial
        cy.screenshotStep('formulario-inicial');

        // Verificar elementos principais
        cy.contains(/Criar Novo Usuário/i).should('be.visible');
        cy.contains(/Função/i).should('be.visible');
        cy.contains(/Nome Completo/i).should('be.visible');
        cy.contains(/Email/i).should('be.visible');

        // Testar dropdown de função
        cy.contains(/Selecione uma função/i).click();
        cy.contains(/Administrador|Médico|Paciente/i).first().click();

        // Screenshot com função selecionada
        cy.screenshotStep('funcao-selecionada');
    });

    it('should fill form with valid data and submit', () => {
        // Screenshot inicial
        cy.screenshotStep('antes-preenchimento');

        // Preencher formulário
        cy.contains(/Selecione uma função/i).click();
        cy.contains('Paciente').click();
        cy.get('input[name="fullName"]').type('Paciente Teste');
        cy.get('input[name="email"]').type('paciente.teste@example.com');

        // Screenshot com formulário preenchido
        cy.screenshotStep('formulario-preenchido');

        // Submeter formulário
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        // Screenshot após submissão
        cy.screenshotStep('apos-submissao');
    });
});
