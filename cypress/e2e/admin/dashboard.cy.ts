describe('Admin Dashboard', () => {
    beforeEach(() => {
        // Clear cookies and localStorage before each test
        cy.clearCookies();
        cy.clearLocalStorage();

        // Login como admin antes de cada teste
        cy.visit('/');
        cy.get('input[type="email"]').type('admin@test.com');
        cy.get('input[type="password"]').type('123456');
        cy.get('button[type="submit"]').click();

        // Aguardar redirecionamento para admin
        cy.url().should('include', '/admin', { timeout: 10000 });
    });

    it('should display admin dashboard with user management interface', () => {
        // Screenshot inicial do dashboard
        cy.screenshotStep('admin-dashboard-initial');

        // Wait for page to load and verify main elements
        cy.contains('Gerenciar Usuários', { timeout: 10000 }).should('be.visible');
        cy.contains('Gerencie todos os usuários do sistema').should('be.visible');

        // Verificar campo de busca
        cy.get('input').should('contain.attr', 'placeholder').and('include', 'Filtrar');

        // Verificar botão de adicionar usuário
        cy.contains('button', 'Adicionar Usuário').should('be.visible');

        // Screenshot dos elementos principais
        cy.screenshotStep('admin-dashboard-elements');

        // Verificar tabela de usuários (usar um seletor mais genérico)
        cy.get('[class*="border"]').should('be.visible');

        // Screenshot da tabela de usuários
        cy.screenshotStep('admin-users-table');
    });

    it('should filter users by name and email', () => {
        // Screenshot inicial
        cy.screenshotStep('filter-initial');

        // Testar filtro por nome
        cy.get('input[placeholder*="Filtrar por nome ou email"]').type('Admin');
        cy.wait(500); // Aguardar filtro

        // Screenshot após filtro
        cy.screenshotStep('filter-by-name');

        // Limpar filtro
        cy.get('input[placeholder*="Filtrar por nome ou email"]').clear();

        // Testar filtro por email
        cy.get('input[placeholder*="Filtrar por nome ou email"]').type('admin@test.com');
        cy.wait(500);

        // Screenshot após filtro por email
        cy.screenshotStep('filter-by-email');
    });

    it('should navigate to create user page', () => {
        // Screenshot antes de navegar
        cy.screenshotStep('before-navigation');

        // Clicar no botão de adicionar usuário
        cy.get('button').contains('Adicionar Usuário').click();

        // Verificar redirecionamento
        cy.url().should('include', '/admin/create-user');

        // Screenshot da página de criar usuário
        cy.screenshotStep('create-user-page');

        // Verificar elementos da página
        cy.contains('Criar Novo Usuário').should('be.visible');
        cy.contains('Crie novos usuários para o sistema').should('be.visible');
    });

    it('should test user interaction modals', () => {
        // Screenshot inicial
        cy.screenshotStep('modals-initial');

        // Verificar se há usuários na tabela para testar ações
        cy.get('table tbody tr').should('have.length.at.least', 1);

        // Verificar botões de ação (se existirem)
        // Isso dependerá da implementação dos botões na tabela
        cy.get('table tbody tr').first().within(() => {
            // Procurar por botões de editar ou excluir
            cy.get('button').should('exist');
        });

        // Screenshot com ações disponíveis
        cy.screenshotStep('user-actions-available');
    });
});
