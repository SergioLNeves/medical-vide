describe('Authentication - Login', () => {
    beforeEach(() => {
        // Clear cookies and localStorage before each test
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
    });

    it('should display login page correctly', () => {
        // Screenshot inicial da página de login
        cy.screenshotStep('login-page-initial');

        // Verificar elementos principais
        cy.contains('Entrar no Medical Vide').should('be.visible');
        cy.contains('Digite seu email e senha para acessar sua conta').should('be.visible');

        // Verificar campos do formulário
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

        // Screenshot dos elementos principais
        cy.screenshotStep('login-form-elements');

        // Verificar links de navegação
        cy.contains('Esqueceu sua senha?').should('be.visible');
        cy.contains('Cadastre-se').should('be.visible');

        // Screenshot dos links de navegação
        cy.screenshotStep('login-navigation-links');
    });

    it('should test login form validation', () => {
        // Screenshot inicial
        cy.screenshotStep('validation-initial');

        // Tentar submeter formulário vazio
        cy.get('button[type="submit"]').click();

        // Screenshot após submissão vazia
        cy.screenshotStep('validation-empty-submit');

        // Preencher apenas email
        cy.get('input[type="email"]').type('teste@email.com');
        cy.get('button[type="submit"]').click();

        // Screenshot com apenas email preenchido
        cy.screenshotStep('validation-email-only');

        // Limpar email e preencher apenas senha
        cy.get('input[type="email"]').clear();
        cy.get('input[type="password"]').type('123456');
        cy.get('button[type="submit"]').click();

        // Screenshot com apenas senha preenchida
        cy.screenshotStep('validation-password-only');

        // Preencher email inválido
        cy.get('input[type="email"]').type('email-invalido');
        cy.get('button[type="submit"]').click();

        // Screenshot com email inválido
        cy.screenshotStep('validation-invalid-email');
    });

    it('should test login with invalid credentials', () => {
        // Screenshot inicial
        cy.screenshotStep('invalid-login-initial');

        // Tentar login com email não existente
        cy.get('input[type="email"]').type('naoexiste@email.com');
        cy.get('input[type="password"]').type('123456');

        // Screenshot com credenciais inválidas
        cy.screenshotStep('invalid-credentials-filled');

        cy.get('button[type="submit"]').click();

        // Screenshot após tentativa de login inválido
        cy.screenshotStep('invalid-login-result');

        // Verificar se há mensagem de erro
        cy.wait(1000);
        cy.screenshotStep('invalid-login-error-check');
    });

    it('should test successful admin login', () => {
        // Screenshot inicial
        cy.screenshotStep('admin-login-initial');

        // Fazer login como admin
        cy.get('input[type="email"]').type('admin@test.com');
        cy.get('input[type="password"]').type('123456');

        // Screenshot com credenciais de admin
        cy.screenshotStep('admin-credentials-filled');

        cy.get('button[type="submit"]').click();

        // Aguardar redirecionamento
        cy.url().should('include', '/admin', { timeout: 10000 });

        // Screenshot após login
        cy.screenshotStep('admin-login-success');

        // Screenshot da página admin
        cy.screenshotStep('admin-dashboard-redirected');
    });

    it('should test successful medico login', () => {
        // Screenshot inicial
        cy.screenshotStep('medico-login-initial');

        // Fazer login como médico
        cy.get('input[type="email"]').type('medico@test.com');
        cy.get('input[type="password"]').type('123456');

        // Screenshot com credenciais de médico
        cy.screenshotStep('medico-credentials-filled');

        cy.get('button[type="submit"]').click();

        // Aguardar redirecionamento
        cy.url().should('include', '/medico', { timeout: 10000 });

        // Screenshot após login
        cy.screenshotStep('medico-login-success');

        // Screenshot da página médico
        cy.screenshotStep('medico-dashboard-redirected');
    });

    it('should test successful paciente login', () => {
        // Screenshot inicial
        cy.screenshotStep('paciente-login-initial');

        // Fazer login como paciente
        cy.get('input[type="email"]').type('paciente@test.com');
        cy.get('input[type="password"]').type('123456');

        // Screenshot com credenciais de paciente
        cy.screenshotStep('paciente-credentials-filled');

        cy.get('button[type="submit"]').click();

        // Aguardar redirecionamento
        cy.url().should('include', '/paciente', { timeout: 10000 });

        // Screenshot após login
        cy.screenshotStep('paciente-login-success');

        // Screenshot da página paciente
        cy.screenshotStep('paciente-dashboard-redirected');
    });

    it('should test navigation to forgot password', () => {
        // Screenshot inicial
        cy.screenshotStep('forgot-password-nav-initial');

        // Clicar no link "Esqueceu sua senha?"
        cy.contains('Esqueceu sua senha?').click();

        // Verificar redirecionamento
        cy.url().should('include', '/forgot-password');

        // Screenshot da página esqueceu senha
        cy.screenshotStep('forgot-password-page');
    });

    it('should test navigation to register', () => {
        // Screenshot inicial
        cy.screenshotStep('register-nav-initial');

        // Clicar no link "Cadastre-se"
        cy.contains('Cadastre-se').click();

        // Verificar redirecionamento
        cy.url().should('include', '/register');

        // Screenshot da página de registro
        cy.screenshotStep('register-page');
    });
});
