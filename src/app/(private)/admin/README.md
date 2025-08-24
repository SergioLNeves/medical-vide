# AdminPage - Painel Administrativo

## Visão Geral

A AdminPage é o painel de controle administrativo do sistema Medical Vide, responsável por gerenciar todos os usuários cadastrados na plataforma. Esta página oferece funcionalidades completas de CRUD (Create, Read, Update, Delete) para administradores, permitindo visualizar, filtrar, editar e remover usuários do sistema.

## Localização

```
/src/app/(private)/admin/page.tsx
```

## Funcionalidades Principais

### 1. **Listagem de Usuários**

- Exibição completa de todos os usuários cadastrados
- Visualização de informações: nome, email, função (role) e status
- Interface responsiva com tabela adaptável para diferentes tamanhos de tela

### 2. **Sistema de Busca e Filtro**

- Campo de busca em tempo real
- Filtro por nome ou email do usuário
- Resultados instantâneos conforme digitação
- Interface limpa com placeholder explicativo

### 3. **Gerenciamento de Usuários**

- **Criar**: Botão para adicionar novos usuários (redireciona para `/admin/create-user`)
- **Editar**: Modal de edição com formulário completo
- **Excluir**: Modal de confirmação para remoção segura
- **Atualizar**: Refresh automático da lista após modificações

### 4. **Modais Interativos**

- **EditUserModal**: Interface para editar dados do usuário
- **DeleteUserModal**: Confirmação de exclusão com medidas de segurança
- Estados de abertura/fechamento controlados

## Estrutura Técnica

### **Importações e Dependências**

```typescript
// React Hooks para estado e efeitos
import { useEffect, useState } from 'react';

// Next.js para navegação
import { useRouter } from 'next/navigation';

// Componentes de UI (shadcn/ui)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Ícones do Lucide React
import { UserSearchIcon } from 'lucide-react';

// Componentes específicos da funcionalidade
import { ListUsers } from './components/list-users';
import { EditUserModal } from './components/edit-user-modal';
import { DeleteUserModal } from './components/delete-user-modal';

// Sistema de dados mockados e tipos
import { MockDatabase } from '@/mocks';
import { User } from '@/mocks/types';
```

### **Estados do Componente**

```typescript
// Lista completa de usuários carregada do MockDatabase
const [users, setUsers] = useState<User[]>([]);

// Termo de busca para filtrar usuários
const [searchTerm, setSearchTerm] = useState('');

// Estados para controle dos modais
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

// Usuários selecionados para edição/exclusão
const [userToEdit, setUserToEdit] = useState<User | null>(null);
const [userToDelete, setUserToDelete] = useState<User | null>(null);
```

### **Lógica de Filtro**

```typescript
// Filtro em tempo real baseado no termo de busca
const filteredUsers = users.filter(
  (user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
);
```

## Funcionalidades Detalhadas

### **1. Carregamento de Dados**

```typescript
const loadUsers = () => {
  const allUsers = MockDatabase.getAllUsers();
  setUsers(allUsers);
};

useEffect(() => {
  loadUsers();
}, []);
```

- Carrega todos os usuários na inicialização do componente
- Utiliza MockDatabase como fonte de dados
- Atualiza estado local com lista completa

### **2. Gerenciamento de Modais**

```typescript
// Edição de usuário
const handleUserUpdated = (user: User) => {
  setUserToEdit(user);
  setIsEditModalOpen(true);
};

// Exclusão de usuário
const handleDeleteUser = (user: User) => {
  setUserToDelete(user);
  setIsDeleteModalOpen(true);
};

// Fechamento dos modais
const handleCloseEditModal = () => {
  setIsEditModalOpen(false);
  setUserToEdit(null);
};

const handleCloseDeleteModal = () => {
  setIsDeleteModalOpen(false);
  setUserToDelete(null);
};
```

### **3. Atualização de Dados**

```typescript
// Refresh completo após modificações
const handleRefreshData = () => {
  loadUsers();
};

// Callback após exclusão bem-sucedida
const handleUserDeleted = () => {
  handleRefreshData();
  handleCloseDeleteModal();
};
```

## Interface do Usuário

### **Layout Principal**

```jsx
<main className="container mx-auto flex flex-col items-center justify-center p-4">
  {/* Cabeçalho */}
  <div className="w-full space-y-6 md:max-w-4xl">
    <div className="space-y-2 text-center">
      <h1>Painel Administrativo</h1>
      <p>Gerencie usuários e configurações do sistema</p>
    </div>

    {/* Controles e Lista */}
    <section>
      {/* Barra de busca e botão adicionar */}
      {/* Lista de usuários */}
    </section>
  </div>

  {/* Modais */}
</main>
```

### **Barra de Controles**

- **Campo de Busca**: Input responsivo com placeholder explicativo
- **Botão Adicionar**: Navegação para página de criação de usuário
- **Layout Responsivo**: Flexível entre mobile e desktop

### **Lista de Usuários**

- **Componente ListUsers**: Renderiza tabela com todos os usuários
- **Ações por Usuário**: Botões de editar e excluir
- **Filtro Dinâmico**: Aplica busca em tempo real

## Componentes Relacionados

### **1. ListUsers**

- **Propósito**: Renderização da tabela de usuários
- **Props**: `users`, `onEditUser`, `onDeleteUser`
- **Funcionalidade**: Exibição formatada com ações por linha

### **2. EditUserModal**

- **Propósito**: Interface de edição de usuário
- **Props**: `isOpen`, `user`, `onClose`, `onRefreshData`
- **Funcionalidade**: Formulário modal para edição

### **3. DeleteUserModal**

- **Propósito**: Confirmação de exclusão
- **Props**: `isOpen`, `user`, `onClose`, `onUserDeleted`
- **Funcionalidade**: Modal de confirmação com segurança

## Fluxo de Usuário

### **1. Visualização Inicial**

```
Usuário Admin acessa /admin
↓
Página carrega todos os usuários
↓
Lista é exibida com controles de busca
```

### **2. Busca e Filtro**

```
Usuário digita no campo de busca
↓
Filtro aplica em tempo real
↓
Lista atualiza mostrando apenas resultados relevantes
```

### **3. Edição de Usuário**

```
Usuário clica em "Editar" na linha do usuário
↓
Modal de edição abre com dados preenchidos
↓
Usuário modifica informações
↓
Salva alterações
↓
Modal fecha e lista é atualizada
```

### **4. Exclusão de Usuário**

```
Usuário clica em "Excluir" na linha do usuário
↓
Modal de confirmação abre
↓
Usuário confirma exclusão
↓
Usuário é removido do sistema
↓
Modal fecha e lista é atualizada
```

### **5. Adição de Usuário**

```
Usuário clica em "Adicionar Usuário"
↓
Navega para /admin/create-user
↓
Preenche formulário de criação
↓
Retorna ao painel com novo usuário na lista
```

## Integração com MockDatabase

### **Operações Utilizadas**

```typescript
// Buscar todos os usuários
MockDatabase.getAllUsers();

// Atualizar usuário (via EditUserModal)
MockDatabase.updateUser(userId, userData);

// Remover usuário (via DeleteUserModal)
MockDatabase.deleteUser(userId);
```

### **Fluxo de Dados**

1. **Carregamento**: `loadUsers()` busca dados do MockDatabase
2. **Filtro**: Estado local filtra lista sem chamar API
3. **Modificação**: Modais fazem operações no MockDatabase
4. **Atualização**: `handleRefreshData()` recarrega lista atualizada

## Proteção de Rota

### **Middleware de Autenticação**

- Página protegida pelo middleware em `/src/middleware.ts`
- Apenas usuários autenticados como 'admin' podem acessar
- Redirecionamento automático se não autorizado

### **Verificação de Role**

- Sistema verifica se usuário logado tem role 'admin'
- Proteção dupla: middleware + verificação de componente
- Acesso negado para roles 'medico' e 'paciente'

## Responsividade

### **Design Mobile-First**

- Layout adaptável para diferentes tamanhos de tela
- Controles reorganizam-se em mobile (stack vertical)
- Tabela com scroll horizontal em telas pequenas
- Botões com largura completa em mobile

### **Breakpoints Utilizados**

- **Mobile**: Layout em coluna, botões full-width
- **Tablet (md)**: Layout em linha, controles lado a lado
- **Desktop**: Layout otimizado com espaçamento adequado

## Considerações de UX

### **Estados de Loading**

- Carregamento inicial dos dados
- Feedback visual durante operações
- Estados de vazio (sem usuários/resultados)

### **Feedback do Sistema**

- Confirmações visuais após ações
- Mensagens de erro em operações falhidas
- Estados de loading durante processamento

### **Acessibilidade**

- Labels adequados para campos de formulário
- Navegação por teclado nos modais
- Contraste adequado entre cores
- Textos alternativos para ícones

## Melhorias Futuras

### **Performance**

- Implementar paginação para grandes volumes de usuários
- Cache local de resultados de busca
- Lazy loading de componentes de modal

### **Funcionalidades**

- Filtros avançados (por role, status, data de criação)
- Ações em lote (seleção múltipla)
- Exportação de dados para CSV/Excel
- Histórico de ações administrativas

### **Segurança**

- Logs de auditoria para ações administrativas
- Confirmação dupla para ações críticas
- Rate limiting para operações sensíveis
- Backup automático antes de exclusões

## Estrutura de Arquivos Relacionados

```
/src/app/(private)/admin/
├── page.tsx                 # Página principal (este arquivo)
├── README.md               # Documentação (este arquivo)
├── create-user/
│   └── page.tsx           # Página de criação de usuário
└── components/
    ├── list-users.tsx     # Tabela de usuários
    ├── edit-user-modal.tsx # Modal de edição
    └── delete-user-modal.tsx # Modal de exclusão
```

Este painel administrativo serve como centro de controle para gestão de usuários, oferecendo interface intuitiva e funcionalidades robustas para administradores do sistema Medical Vide.
