describe('Admin Create User', () => {
    beforeEach(() => {
        // Clear cookies and localStorage before each test
        cy.clearCookies();
        cy.clearLocalStorage();

        // Login como admin antes de cada teste
        cy.visit('/');
        cy.get('input[type="email"]').type('admin@test.com');
        cy.get('input[type="password"]').type('123456');
        cy.get('button[type="submit"]').click();

        // Wait for redirect to admin dashboard
        cy.url().should('include', '/admin', { timeout: 10000 });

        // Navegar para página de criar usuário
        cy.visit('/admin/create-user');
        cy.url().should('include', '/admin/create-user');
    });

    it('should display create user form correctly', () => {
        // Screenshot inicial da página
        cy.screenshotStep('create-user-initial');

        // Wait for page to load completely
        cy.contains('Criar Novo Usuário', { timeout: 10000 }).should('be.visible');

        // Verificar título e descrição
        cy.contains('Crie novos usuários para o sistema').should('be.visible');

        // Verificar botão voltar
        cy.contains('button', 'Voltar').should('be.visible');

        // Screenshot dos elementos principais
        cy.screenshotStep('create-user-main-elements');
    });

    it('should test form fields and validation', () => {
        // Screenshot inicial do formulário
        cy.screenshotStep('form-initial-state');

        // Wait for form to be fully loaded
        cy.contains('Função*', { timeout: 5000 }).should('be.visible');

        // Verificar campos obrigatórios
        cy.contains('label', 'Função*').should('be.visible');
        cy.contains('label', 'Nome Completo*').should('be.visible');
        cy.contains('label', 'Email*').should('be.visible');

        // Screenshot dos labels
        cy.screenshotStep('form-labels');

        // Testar dropdown de função
        cy.contains('button', 'Selecione uma função').click();

        // Screenshot com dropdown aberto
        cy.screenshotStep('dropdown-opened');

        // Verificar opções do dropdown
        cy.contains('Administrador').should('be.visible');
        cy.contains('Médico').should('be.visible');
        cy.contains('Paciente').should('be.visible');

        // Selecionar uma função
        cy.contains('Médico').click();

        // Screenshot com função selecionada
        cy.screenshotStep('role-selected');

        // Verificar se o texto mudou
        cy.contains('button', 'Médico').should('be.visible');
    });

    it('should fill form and test submission', () => {
        // Screenshot inicial
        cy.screenshotStep('submission-test-initial');

        // Selecionar função
        cy.get('button').contains('Selecione uma função').click();
        cy.contains('Paciente').click();

        // Preencher nome
        cy.get('input[name="fullName"]').type('João da Silva');

        // Preencher email
        cy.get('input[name="email"]').type('joao.silva@teste.com');

        // Screenshot com formulário preenchido
        cy.screenshotStep('form-filled');

        // Submeter formulário
        cy.get('button[type="submit"]').click();

        // Screenshot após submissão
        cy.screenshotStep('form-submitted');

        // Verificar se houve redirecionamento ou mensagem de sucesso
        // (aguardar um pouco para ver o resultado)
        cy.wait(2000);

        // Screenshot final
        cy.screenshotStep('submission-result');
    });

    it('should test form validation errors', () => {
        // Screenshot inicial
        cy.screenshotStep('validation-initial');

        // Tentar submeter sem preencher nada
        cy.get('button[type="submit"]').click();

        // Screenshot após tentativa de submissão vazia
        cy.screenshotStep('validation-empty-form');

        // Verificar se há mensagens de erro
        cy.get('body').then(($body) => {
            if ($body.text().includes('selecione a função') || $body.text().includes('insira o nome') || $body.text().includes('insira o email')) {
                // Screenshot das mensagens de erro
                cy.screenshotStep('validation-error-messages');
            }
        });

        // Preencher apenas email sem função e nome
        cy.get('input[name="email"]').type('teste@email.com');
        cy.get('button[type="submit"]').click();

        // Screenshot com validação parcial
        cy.screenshotStep('validation-partial');
    });

    it('should test navigation back to admin dashboard', () => {
        // Screenshot inicial
        cy.screenshotStep('navigation-initial');

        // Clicar em voltar
        cy.get('button').contains('Voltar').click();

        // Verificar redirecionamento
        cy.url().should('include', '/admin');
        cy.url().should('not.include', '/create-user');

        // Screenshot após navegação
        cy.screenshotStep('navigation-back-to-admin');

        // Verificar elementos da página admin
        cy.contains('Gerenciar Usuários').should('be.visible');
    });

    it('should test cancel button functionality', () => {
        // Screenshot inicial
        cy.screenshotStep('cancel-test-initial');

        // Preencher alguns dados
        cy.get('input[name="fullName"]').type('Usuário Teste');
        cy.get('input[name="email"]').type('usuario@teste.com');

        // Screenshot com dados preenchidos
        cy.screenshotStep('cancel-form-filled');

        // Clicar em cancelar
        cy.get('button').contains('Cancelar').click();

        // Screenshot após cancelar
        cy.screenshotStep('cancel-executed');

        // Verificar se houve navegação de volta
        cy.wait(1000);
        cy.screenshotStep('cancel-result');
    });
});
