# Medical Vide

[![Último commit](https://img.shields.io/github/last-commit/SergioLNeves/medical-vide?style=flat-square)](https://github.com/SergioLNeves/medical-vide/commits)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38b2ac?style=flat-square&logo=tailwindcss&logoColor=fff)
![PNPM](https://img.shields.io/badge/PNPM-%F0%9F%93%A6-ffbf00?style=flat-square&logo=pnpm&logoColor=000)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)

Aplicação web para gerenciamento de pacientes e agendamentos médicos. Inclui autenticação, dashboards por perfil (admin, médico, paciente) e uma biblioteca de componentes reutilizáveis.

> Status: em desenvolvimento (WIP)

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack e Principais Dependências](#stack-e-principais-dependências)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Qualidade de Código](#qualidade-de-código)
- [Testes](#testes)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

O Medical Vide facilita o fluxo de marcações e gestão de pacientes. A arquitetura utiliza o App Router do Next.js, com rotas públicas e privadas protegidas por middleware, e componentes UI consistentes baseados em Tailwind e Radix.

## Funcionalidades

- Autenticação simulada via middleware e mocks (users, schedules).
- Dashboards por perfil: admin, médico e paciente.
- Agendamento de consultas e visualização de disponibilidade.
- Biblioteca de componentes reutilizáveis (botões, cards, tabelas, dialogs, inputs, dropdowns etc.).
- Tema claro/escuro com `next-themes`.
- Tabelas reativas com `@tanstack/react-table`.
- Validação com Zod e feedback com Sonner (toasts).

## Stack e Principais Dependências

- Framework e runtime
  - Next.js (App Router) 15, React 19, TypeScript 5
- Estilo e tema
  - Tailwind CSS 4, @tailwindcss/postcss, tailwind-merge, next-themes, tw-animate-css
- UI e acessibilidade
  - Radix UI, Lucide React
- Tabelas e listas
  - @tanstack/react-table
- Validação e utilitários
  - Zod, date-fns
- Estado e hooks
  - Jotai, hooks customizados (`useAuth`, `useIsMobile`)
- Notificações
  - Sonner
- Qualidade de código
  - ESLint, Prettier (+ plugin Tailwind)
- Testes
  - Jest, Testing Library

## Requisitos

- Node.js 18+ (recomendado 20+)
- PNPM

## Instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/SergioLNeves/medical-vide.git
   cd medical-vide
   ```
2. Instale as dependências
   ```bash
   pnpm install
   ```

## Uso

- Desenvolvimento (Turbopack)
  ```bash
  pnpm dev
  ```
- Build de produção
  ```bash
  pnpm build
  ```
- Iniciar servidor após o build
  ```bash
  pnpm start
  ```
- Lint
  ```bash
  pnpm lint
  ```
- Formatar com Prettier
  ```bash
  pnpm format
  ```

### Variáveis de Ambiente (opcional)

No momento, o projeto utiliza dados mockados. Se futuramente integrar APIs/serviços, recomenda-se um arquivo `.env.local` com chaves como:

```
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_APP_NAME=Medical Vide
```

## Estrutura de Pastas

```
src/
  app/
    (public)/
    (private)/
    layout.tsx
    globals.css
  components/
  hooks/
  lib/
  mocks/
middleware.ts
```

- app: Rotas via App Router. (public) sem autenticação; (private) áreas Admin/Médico/Paciente; `layout.tsx` define o shell/metadata; `globals.css` configura tema e tokens de estilo.
- components: Biblioteca de UI e blocos reutilizáveis (prioriza acessibilidade com Radix e consistência com Tailwind).
- hooks: Hooks compartilhados (ex.: `useAuth`, `useIsMobile`, provider de tema).
- lib: Utilitários e lógica de domínio (auth helpers, formatadores, funções comuns).
- mocks: Dados fictícios para dev/testes (users, schedules, tipos).
- middleware.ts: Protege rotas privadas e redireciona conforme o perfil do usuário.

## Qualidade de Código

- ESLint e Prettier configurados.
- Tailwind plugin do Prettier para ordenação de classes.
- Sugestão: adotar Conventional Commits para mensagens de commit.

## Testes

- Ambiente de testes com Jest + Testing Library.
- Comandos sugeridos:
  ```bash
  pnpm jest
  pnpm jest --watch
  ```

## Contato

- Autor: Sergio L. Neves
- GitHub: https://github.com/SergioLNeves
