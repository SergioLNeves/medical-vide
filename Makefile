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

# Help
.PHONY: help
help:
	@echo "Comandos disponíveis:"
	@echo "  make dev     - Inicia servidor de desenvolvimento"
	@echo "  make build   - Faz build da aplicação"
	@echo "  make start   - Inicia aplicação em produção"
	@echo "  make install - Instala dependências"
	@echo "  make lint    - Executa ESLint"
	@echo "  make format  - Formata código com Prettier"

.DEFAULT_GOAL := help
