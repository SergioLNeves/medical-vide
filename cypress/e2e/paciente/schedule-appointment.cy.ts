describe('Paciente - Agendamento de Consulta', () => {
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

        // Navegar para página de agendamento ou ficar na dashboard
        cy.contains('Agendar').should('be.visible');
    });

    it('should interact with scheduling form', () => {
        // Screenshot do formulário de agendamento
        cy.screenshotStep('agendamento-formulario');

        // Interagir com o formulário ou elementos disponíveis
        cy.get('body').then(($body) => {
            // Verificar se existem campos de formulário
            if ($body.find('input[type="date"]').length > 0) {
                cy.get('input[type="date"]').first().type('2025-12-20', { force: true });
            }

            // Verificar se existem selects
            if ($body.find('select').length > 0) {
                cy.get('select').first().select(1, { force: true });
            }

            // Verificar se existe botão de agendamento e clicar nele
            const agendarButtons = $body.find('button').filter((i, btn) => {
                const text = btn.textContent?.toLowerCase() || '';
                return text.includes('agendar') || text.includes('confirmar') || text.includes('marcar');
            });

            if (agendarButtons.length > 0) {
                cy.wrap(agendarButtons.first()).click({ force: true });
                cy.wait(2000);
            }
        });

        cy.screenshotStep('agendamento-apos-interacao');
    });

    it('should allow basic navigation', () => {
        // Verificar elementos de navegação
        cy.get('body').then(($body) => {
            // Se encontrar qualquer botão relacionado a voltar, clicar nele
            const voltarButton = $body.find('button').filter((i, btn) => {
                const text = btn.textContent?.toLowerCase() || '';
                return text.includes('voltar') || text.includes('cancelar');
            });

            if (voltarButton.length > 0) {
                cy.wrap(voltarButton.first()).click({ force: true });
            } else {
                // Se não encontrar botão específico, apenas verificar que estamos em alguma página válida
                cy.url().should('include', '/paciente');
            }
        });

        cy.screenshotStep('apos-navegacao');
    });
});
