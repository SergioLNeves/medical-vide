# Makefile para Medical Vide
# Comandos essenciais para desenvolvimento

# Variáveis
PACKAGE_MANAGER := pnpm

# Comandos principais
.PHONY: dev
dev:
	$(PACKAGE_MANAGER) run dev

.PHONY: build
build:
	$(PACKAGE_MANAGER) run build

.PHONY: start
start:
	$(PACKAGE_MANAGER) run start

.PHONY: install
install:
	$(PACKAGE_MANAGER) install

.PHONY: lint
lint:
	$(PACKAGE_MANAGER) run lint

.PHONY: format
format:
	npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"

# Cypress
.PHONY: cypress
cypress:
	$(PACKAGE_MANAGER) run cypress:open

.PHONY: cypress-run
cypress-run:
	$(PACKAGE_MANAGER) run cypress:run

.PHONY: cypress-failed
cypress-failed:
	$(PACKAGE_MANAGER) run cypress:run --spec "cypress/e2e/public/forgot-password.cy.ts,cypress/e2e/public/register.cy.ts,cypress/e2e/paciente/dashboard.cy.ts,cypress/e2e/paciente/schedule-appointment.cy.ts"

.PHONY: cypress-essential
cypress-essential:
	$(PACKAGE_MANAGER) run cypress:run --spec "cypress/e2e/public/login.cy.ts,cypress/e2e/public/forgot-password.cy.ts,cypress/e2e/public/register.cy.ts,cypress/e2e/paciente/dashboard.cy.ts,cypress/e2e/paciente/complement-info-form.cy.ts,cypress/e2e/paciente/schedule-appointment.cy.ts,cypress/e2e/medico/dashboard.cy.ts,cypress/e2e/medico/complement-info-form.cy.ts,cypress/e2e/admin/dashboard.cy.ts,cypress/e2e/admin/create-user.cy.ts,cypress/e2e/admin/create-user-form.cy.ts"

.PHONY: test
test:
	$(PACKAGE_MANAGER) run test

# Help
.PHONY: help
help:
	@echo "Comandos disponíveis:"
	@echo "  make dev             - Inicia servidor de desenvolvimento"
	@echo "  make build           - Faz build da aplicação"
	@echo "  make start           - Inicia aplicação em produção"
	@echo "  make install         - Instala dependências"
	@echo "  make lint            - Executa ESLint"
	@echo "  make format          - Formata código com Prettier"
	@echo "  make cypress         - Abre interface do Cypress para testes"
	@echo "  make cypress-run     - Executa testes Cypress em modo headless"
	@echo "  make cypress-failed  - Executa apenas os testes que estavam falhando"
	@echo "  make cypress-essential - Executa apenas os testes essenciais simplificados"
	@echo "  make test            - Executa testes completos (inicia servidor + cypress)"

.DEFAULT_GOAL := help
