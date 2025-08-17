describe('User Flows', () => {
    it('should successfully register a new user', () => {
        cy.visit('/register');

        // Criar um email único usando timestamp
        const timestamp = new Date().getTime();
        const uniqueEmail = `test${timestamp}@example.com`;

        // Preencher formulário de registro
        cy.get('input[name="name"]').type('Test Patient');
        cy.get('input[name="email"]').type(uniqueEmail);
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
        cy.contains('button', 'Cadastrar').click();

        // Verificar se houve redirecionamento (pode ser para login ou área do paciente)
        cy.url().should('not.include', '/register');
    });
});