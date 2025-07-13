# Medical Vide

## Descrição
Medical Vide é uma aplicação web desenvolvida para facilitar o gerenciamento de pacientes e agendamentos médicos. A plataforma oferece funcionalidades como autenticação de usuários, navegação entre diferentes dashboards e componentes reutilizáveis para interface.

## Arquitetura
A aplicação utiliza a seguinte arquitetura:

- **Next.js**: Framework para renderização do lado do cliente e servidor.
- **Componentes Reutilizáveis**: Localizados na pasta `src/components/ui`, como botões, cards e separadores.
- **Middleware**: Implementado para gerenciar autenticação e redirecionamento de usuários com base em suas permissões.
- **Hooks**: Custom hooks como `useAuth` e `useIsMobile` para lógica reutilizável.
- **Estrutura de Pastas**:
  - `src/app`: Contém as páginas organizadas em rotas públicas e privadas.
  - `src/components`: Componentes reutilizáveis para interface.
  - `src/hooks`: Hooks personalizados.
  - `src/lib`: Funções utilitárias e lógica de autenticação.
  - `src/mocks`: Dados fictícios para testes e desenvolvimento.

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/SergioLNeves/medical-vide.git
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```

## Comandos Principais
- **Iniciar o servidor de desenvolvimento**:
  ```bash
  pnpm dev
  ```
- **Build para produção**:
  ```bash
  pnpm build
  ```
- **Rodar testes**:
  ```bash
  pnpm test
  ```

## Estrutura Básica
A aplicação segue uma estrutura modular, com componentes e páginas organizados de forma clara para facilitar a manutenção e escalabilidade.

- **Rotas Públicas**: Localizadas em `src/app/(public)`.
- **Rotas Privadas**: Localizadas em `src/app/(private)`.
- **Middleware**: Gerencia autenticação e redirecionamento.

## Tecnologias Utilizadas
- Next.js
- TypeScript
- PNPM
- ESLint
- Jest

Este README fornece uma visão geral básica do projeto. Para mais detalhes, consulte a documentação ou entre em contato com o desenvolvedor.
