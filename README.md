# Medical Vide

[![Último commit](https://img.shields.io/github/last-commit/SergioLNeves/medical-vide?style=flat-square)](https://github.com/SergioLNeves/medical-vide/commits)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38b2ac?style=flat-square&logo=tailwindcss&logoColor=fff)
![PNPM](https://img.shields.io/badge/PNPM-%F0%9F%93%A6-ffbf00?style=flat-square&logo=pnpm&logoColor=000)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)

Sistema médico completo com autenticação baseada em roles, agendamento de consultas e interface administrativa. Desenvolvido com Next.js 15, React 19 e TypeScript, oferecendo experiência moderna e acessível para médicos, pacientes e administradores.

> Status: ✅ **Projeto Finalizado** - Todas as funcionalidades implementadas e testadas

---

## 📑 Sumário

- [🎯 Visão Geral](#-visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠 Stack Tecnológica](#-stack-tecnológica)
- [🔧 Instalação e Configuração](#-instalação-e-configuração)
- [🚀 Como Usar](#-como-usar)
- [👥 Perfis de Usuário](#-perfis-de-usuário)
- [🏗 Arquitetura](#-arquitetura)
- [🧪 Testes](#-testes)
- [📱 Interface e UX](#-interface-e-ux)
- [🔒 Segurança](#-segurança)
- [🎨 Sistema de Design](#-sistema-de-design)
- [📋 Comandos Utilitários](#-comandos-utilitários)
- [🤝 Contribuição](#-contribuição)
- [📞 Contato](#-contato)

## 🎯 Visão Geral

O **Medical Vide** é uma plataforma completa de gestão médica que conecta pacientes, médicos e administradores em um ambiente integrado e seguro. O sistema oferece funcionalidades robustas de agendamento, gerenciamento de usuários e interface administrativa, tudo construído com tecnologias modernas e práticas de desenvolvimento de ponta.

### Principais Diferenciais

- **Autenticação Baseada em Roles**: Sistema de permissões com 3 níveis (Admin, Médico, Paciente)
- **Agendamento Inteligente**: Interface intuitiva para marcação de consultas com filtros por especialidade
- **Dashboard Personalizado**: Cada perfil possui interface específica otimizada para suas necessidades
- **Design System Consistente**: Biblioteca de componentes reutilizáveis baseada em Radix UI
- **Experiência Mobile-First**: Interface responsiva e acessível em todos os dispositivos

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- **Login/Registro**: Formulários validados com Zod e feedback em tempo real
- **Recuperação de Senha**: Fluxo completo de reset de credenciais
- **Proteção de Rotas**: Middleware personalizado protege rotas baseado no perfil do usuário
- **Persistência de Sessão**: Cookies seguros para manter usuários logados

### 👤 Área do Paciente
- **Dashboard Pessoal**: Visão geral dos agendamentos e informações pessoais
- **Agendamento de Consultas**: 
  - Busca por especialidades médicas (15 especialidades disponíveis)
  - Filtro por nome do médico
  - Seleção de horários disponíveis
  - Confirmação e cancelamento de consultas
- **Perfil Complementar**: Formulário para informações pessoais completas
- **Histórico de Consultas**: Lista detalhada com status e informações do médico

### 👨‍⚕️ Área do Médico
- **Calendário Interativo**: Visualização de agendamentos com calendário customizado
- **Gerenciamento de Horários**: Controle de disponibilidade e consultas
- **Perfil Profissional**: CRM, especialidades, formação acadêmica
- **Dashboard de Consultas**: Status dos agendamentos e informações dos pacientes

### 👑 Área Administrativa
- **Gerenciamento de Usuários**: CRUD completo (Criar, Visualizar, Editar, Excluir)
- **Sistema de Busca Avançada**: Filtros em tempo real por nome e email
- **Modais Interativos**: Interfaces dedicadas para edição e exclusão segura
- **Criação de Usuários**: Formulário administrativo para novos cadastros
- **Controle de Permissões**: Atribuição de roles e gerenciamento de acessos

### 📊 Funcionalidades Transversais
- **Tema Claro/Escuro**: Alternância automática com preferências do sistema
- **Notificações Toast**: Feedback visual para todas as ações do usuário
- **Validação de Formulários**: Zod Schema para validação robusta client-side
- **Sincronização em Tempo Real**: Eventos customizados para atualizações automáticas

## 🛠 Stack Tecnológica

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca de interface de usuário
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework de CSS utilitário
- **[Radix UI](https://www.radix-ui.com/)** - Componentes primitivos acessíveis
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones moderna
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Sistema de temas
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de interface pré-construídos

### State Management & Data
- **[Jotai](https://jotai.org/)** - Gerenciamento de estado atômico
- **[@tanstack/react-table](https://tanstack.com/table)** - Tabelas poderosas e flexíveis
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript-first
- **[date-fns](https://date-fns.org/)** - Biblioteca de manipulação de datas

### Development Tools
- **[ESLint](https://eslint.org/)** - Linting de código JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatação automática de código
- **[Cypress](https://www.cypress.io/)** - Framework de testes end-to-end
- **[PNPM](https://pnpm.io/)** - Gerenciador de pacotes performático

### UI Enhancements
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast elegantes
- **[class-variance-authority](https://cva.style/)** - Utilitário para variantes CSS
- **[clsx](https://github.com/lukeed/clsx)** - Utilitário para classes condicionais
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge inteligente de classes Tailwind

## 🔧 Instalação e Configuração

### Pré-requisitos
- **Node.js** 18+ (recomendado 20+)
- **PNPM** (gerenciador de pacotes)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/SergioLNeves/medical-vide.git
   cd medical-vide
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   pnpm dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

## 🚀 Como Usar

### Comandos Principais

```bash
# Desenvolvimento com Turbopack
pnpm dev

# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Análise de código
pnpm lint

# Formatação de código
pnpm format
```

### Usuários de Teste

O sistema vem com usuários pré-configurados para teste:

```typescript
// Administrador
Email: admin@test.com
Senha: 123456

// Médico
Email: medico@test.com
Senha: 123456

// Paciente
Email: paciente@test.com
Senha: 123456
```

## 👥 Perfis de Usuário

### 👑 Administrador
- **Acesso Total**: Gerenciamento completo do sistema
- **Usuários**: Criar, editar, visualizar e excluir usuários
- **Relatórios**: Visão geral de todas as operações do sistema
- **Configurações**: Controle de parâmetros globais

### 👨‍⚕️ Médico
- **Agenda Pessoal**: Calendário interativo com consultas agendadas
- **Perfil Profissional**: CRM, especialidades, formação
- **Gerenciamento de Consultas**: Confirmar, reagendar ou cancelar
- **Histórico de Pacientes**: Informações e histórico de consultas

### 👤 Paciente
- **Agendamento**: Interface intuitiva para marcar consultas
- **Histórico Médico**: Visualização de consultas passadas e futuras
- **Perfil Pessoal**: Informações pessoais e dados complementares
- **Notificações**: Lembretes e atualizações sobre consultas

## 🏗 Arquitetura

### Estrutura de Diretórios

```
medical-vide/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── (public)/          # Rotas públicas (login, registro)
│   │   ├── (private)/         # Rotas protegidas
│   │   │   ├── admin/         # Dashboard administrativo
│   │   │   ├── medico/        # Dashboard médico
│   │   │   └── paciente/      # Dashboard paciente
│   │   ├── layout.tsx         # Layout raiz
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/               # Componentes base (shadcn/ui)
│   │   ├── navbar/           # Navegação
│   │   ├── card-function/    # Cards de ação
│   │   └── loading/          # Estados de carregamento
│   ├── hooks/                # Hooks customizados
│   │   ├── useAuth.ts        # Autenticação
│   │   ├── useAgendamento.ts # Agendamentos
│   │   └── theme-provider.tsx # Gerenciamento de tema
│   ├── lib/                  # Utilitários e configurações
│   │   ├── auth.ts          # Helpers de autenticação
│   │   └── utils.ts         # Funções utilitárias
│   ├── mocks/               # Dados de teste
│   │   ├── database.ts      # Simulação de banco
│   │   ├── users.ts         # Usuários fictícios
│   │   └── types.ts         # Definições TypeScript
│   ├── types/               # Tipos globais
│   ├── constants/           # Constantes do sistema
│   └── middleware.ts        # Middleware de autenticação
├── cypress/                 # Testes E2E
│   ├── e2e/                # Specs de teste
│   ├── fixtures/           # Dados de teste
│   └── support/            # Configurações
├── public/                 # Assets estáticos
└── package.json           # Dependências e scripts
```

### Fluxo de Autenticação

```mermaid
graph TD
    A[Usuário acessa aplicação] --> B{Está autenticado?}
    B -->|Não| C[Redireciona para /login]
    B -->|Sim| D{Qual o perfil?}
    D -->|Admin| E[/admin]
    D -->|Médico| F[/medico]
    D -->|Paciente| G[/paciente]
    C --> H[Login realizado]
    H --> I[Cookie de sessão criado]
    I --> D
```

### Sistema de Rotas

O sistema utiliza o **App Router** do Next.js 15 com grupos de rotas:

- **`(public)`**: Rotas acessíveis sem autenticação
  - `/` - Página de login
  - `/register` - Cadastro de usuários
  - `/forgot-password` - Recuperação de senha

- **`(private)`**: Rotas protegidas por middleware
  - `/admin` - Dashboard administrativo
  - `/medico` - Dashboard médico
  - `/paciente` - Dashboard paciente

## 🧪 Testes

### Framework de Testes
O projeto utiliza **Cypress** para testes end-to-end, garantindo que todas as funcionalidades críticas funcionem corretamente.

### Cobertura de Testes

#### 🔐 Autenticação
- Validação de formulário de login
- Fluxo de registro de usuários
- Recuperação de senha
- Proteção de rotas por middleware

#### 👤 Área do Paciente
- Dashboard e elementos principais
- Formulário de informações complementares
- Processo de agendamento de consultas
- Cancelamento de agendamentos

#### 👨‍⚕️ Área do Médico
- Dashboard com calendário
- Formulário de informações profissionais
- Visualização de consultas

#### 👑 Área Administrativa
- Dashboard com listagem de usuários
- Criação de novos usuários
- Edição e exclusão de usuários

### Executando os Testes

```bash
# Interface gráfica do Cypress
pnpm cypress:open

# Testes em modo headless
pnpm cypress:run

# Testes essenciais (mais rápido)
make cypress-essential

# Servidor + testes automaticamente
pnpm test
```

### Configuração do Cypress

```typescript
// cypress.config.ts
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    testIsolation: false,
    defaultCommandTimeout: 10000,
    experimentalRunAllSpecs: true,
    video: false,
    screenshotOnRunFailure: true,
  }
});
```

## 📱 Interface e UX

### Design System
O projeto implementa um **design system** consistente baseado em:

- **Componentes Atômicos**: Botões, inputs, cards, modais
- **Tokens de Design**: Cores, tipografia, espaçamentos, raios de borda
- **Variantes Contextuais**: Estados hover, focus, disabled, loading
- **Acessibilidade**: ARIA labels, navegação por teclado, contraste adequado

### Responsividade
- **Mobile-First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação fluida para tablet e desktop
- **Componentes Flexíveis**: Layout que se adapta ao conteúdo

### Estados da Aplicação
- **Loading States**: Spinners e skeletons durante carregamentos
- **Empty States**: Interfaces para estados vazios com ações sugeridas
- **Error States**: Tratamento elegante de erros com opções de recuperação

## 🔒 Segurança

### Autenticação e Autorização
- **Middleware de Proteção**: Intercepta todas as rotas e valida permissões
- **Baseado em Roles**: Sistema de 3 níveis com permissões específicas
- **Cookies Seguros**: Armazenamento seguro de tokens de sessão
- **Validação Client-Side**: Schemas Zod para validação robusta

### Proteções Implementadas
- **Cross-Role Access Prevention**: Usuários não podem acessar áreas de outros perfis
- **Form Validation**: Sanitização de inputs e validação antes do envio
- **Route Guards**: Redirecionamento automático para área apropriada
- **Session Management**: Controle de expiração e renovação de sessões

## 🎨 Sistema de Design

### Paleta de Cores
```css
/* Tema Claro */
--background: oklch(1 0 0);
--foreground: oklch(0.141 0.005 285.823);
--primary: oklch(0.696 0.17 162.48);
--secondary: oklch(0.914 0.014 213.334);

/* Tema Escuro - automático via CSS custom properties */
```

### Tipografia
- **Fonte Principal**: Geist Sans (moderna e legível)
- **Fonte Mono**: Geist Mono (código e dados técnicos)
- **Hierarchy**: H1-H6 com proporções harmônicas

### Componentes Base
- **Button**: 6 variantes (default, destructive, outline, secondary, ghost, link)
- **Input**: Estados focus, error, disabled
- **Card**: Container flexível com header, content, footer
- **Modal**: Overlay acessível com backdrop dismiss
- **Table**: Responsiva com ordenação e filtros

## 📋 Comandos Utilitários

O projeto inclui um **Makefile** com comandos utilitários:

```bash
# Desenvolvimento
make dev              # Inicia servidor de desenvolvimento
make build            # Build de produção
make install          # Instala dependências

# Qualidade de código
make lint             # ESLint
make format           # Prettier

# Testes
make cypress          # Abre Cypress GUI
make cypress-run      # Executa todos os testes
make cypress-essential # Testes essenciais apenas
make test             # Servidor + testes

# Ajuda
make help             # Lista todos os comandos
```

### Scripts NPM Disponíveis
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "cypress:open": "cypress open",
  "cypress:run": "cypress run",
  "test": "start-server-and-test dev http://localhost:3000 cypress:run"
}
```

## 🤝 Contribuição

### Como Contribuir
1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### Padrões de Desenvolvimento
- **Conventional Commits**: Mensagens padronizadas
- **TypeScript**: Tipagem obrigatória
- **ESLint + Prettier**: Código formatado automaticamente
- **Testes**: Cobertura de funcionalidades críticas

### Estrutura de Commits
```
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
style: mudanças de estilo/formatação
refactor: refatoração de código
test: adição ou modificação de testes
```

## 📞 Contato

- **Autor**: Sergio L. Neves
- **GitHub**: [SergioLNeves](https://github.com/SergioLNeves)
- **LinkedIn**: [sergio-neves-dev](https://linkedin.com/in/sergio-neves-dev)
- **Email**: sergiolneves.dev@gmail.com

---

<div align="center">
  <p>⭐ Se este projeto foi útil para você, considere dar uma estrela!</p>
  <p>Feito com ❤️ por <a href="https://github.com/SergioLNeves">Sergio L. Neves</a></p>
</div>
