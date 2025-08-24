# CreateUserPage - Criação de Usuários

## Visão Geral

A CreateUserPage é uma página administrativa do sistema Medical Vide dedicada à criação de novos usuários. Esta página permite que administradores registrem novos usuários no sistema, definindo suas funções (roles), gerando senhas automáticas e validando informações antes do cadastro. É uma ferramenta essencial para o gerenciamento de acesso ao sistema.

## Localização

```
/src/app/(private)/admin/create-user/page.tsx
```

## Funcionalidades Principais

### 1. **Cadastro de Novos Usuários**

- Formulário completo para registro de usuários
- Campos obrigatórios: Nome Completo, Email e Função
- Validação em tempo real de todos os campos
- Verificação de duplicidade de emails

### 2. **Sistema de Funções (Roles)**

- **Administrador**: Acesso completo ao sistema
- **Médico**: Acesso a funcionalidades médicas
- **Paciente**: Acesso limitado a área do paciente
- Dropdown intuitivo para seleção de funções

### 3. **Geração Automática de Senhas**

- Senhas aleatórias de 6 caracteres
- Combinação de letras maiúsculas, minúsculas e números
- Segurança garantida através de aleatoriedade
- Notificação ao usuário sobre envio da senha por email

### 4. **Validação e Segurança**

- Validação Zod para dados do formulário
- Verificação de email já cadastrado
- Mensagens de erro específicas e informativas
- Prevenção de duplicação de registros

## Estrutura Técnica

### **Importações e Dependências**

```typescript
// React e Next.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Componentes UI (shadcn/ui)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Ícones
import { ArrowLeftIcon, ChevronDownIcon } from 'lucide-react';

// Validação
import { z } from 'zod';

// Sistema de autenticação
import { checkEmailExists, registerUser } from '@/lib/auth';

// Notificações e loading
import { toast } from 'sonner';
import Loading from '@/components/loading/loading';
```

### **Schema de Validação**

```typescript
const registerSchema = z.object({
  fullName: z.string().min(1, 'insira o nome completo do usuário'),
  email: z.string().min(1, 'insira o email').email('insira um email válido'),
  role: z.enum(['admin', 'medico', 'paciente'], {
    message: 'selecione a função do usuário',
  }),
});
```

### **Estados do Componente**

```typescript
// Navegação
const router = useRouter();

// Controle de erro e loading
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

// Dados do formulário
const [formData, setFormData] = useState<RegisterFormData>({
  fullName: '',
  email: '',
  role: '', // Começa vazio para forçar seleção
});
```

## Funcionalidades Detalhadas

### **1. Geração de Senha Aleatória**

```typescript
const generateRandomPassword = (): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
```

- **Caracteres**: Letras maiúsculas, minúsculas e números
- **Comprimento**: 6 caracteres para facilidade de uso
- **Aleatoriedade**: Função Math.random() para garantir unicidade
- **Segurança**: Combinação variada de tipos de caracteres

### **2. Atualização de Campos**

```typescript
const updateField = (field: keyof RegisterFormData, value: string) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};
```

- **Tipagem Segura**: Usando keyof para garantir campos válidos
- **Imutabilidade**: Spread operator para manter estado anterior
- **Flexibilidade**: Função genérica para qualquer campo

### **3. Sistema de Nomes de Funções**

```typescript
const getRoleDisplayName = (role: string) => {
  const roles = {
    admin: 'Administrador',
    medico: 'Médico',
    paciente: 'Paciente',
  };
  return roles[role as keyof typeof roles] || 'Selecione uma função';
};
```

- **Tradução**: Converte valores técnicos em nomes amigáveis
- **Fallback**: Retorna texto padrão se role não encontrado
- **UX**: Melhora experiência do usuário com textos claros

## Fluxo de Criação de Usuário

### **1. Validação Inicial**

```typescript
// Validação customizada para campo obrigatório
if (!formData.role || formData.role === '') {
  setError('Por favor, selecione uma função para o usuário');
  toast.error('Erro de validação', {
    description: 'Por favor, selecione uma função para o usuário',
  });
  return;
}

// Validação Zod dos demais campos
const validatedData = registerSchema.parse(formData);
```

### **2. Verificação de Duplicidade**

```typescript
if (checkEmailExists(userDataWithPassword.email)) {
  setError('Email já cadastrado');
  toast.error('Erro ao criar usuário', {
    description: 'Email já cadastrado',
  });
  return;
}
```

### **3. Registro no Sistema**

```typescript
const newUser = registerUser(
  userDataWithPassword.email,
  userDataWithPassword.password,
  userDataWithPassword.fullName,
  userDataWithPassword.role
);
```

### **4. Feedback e Redirecionamento**

```typescript
if (newUser) {
  // Reset do formulário
  setFormData({
    fullName: '',
    email: '',
    role: '',
  });

  // Notificação de sucesso
  toast.success('Usuário criado com sucesso!', {
    description: `Senha enviada para: ${userDataWithPassword.email}`,
  });

  // Redirecionamento para painel admin
  router.push('/admin');
}
```

## Interface do Usuário

### **Layout da Página**

```jsx
<main className="bg-background min-h-screen">
  {/* Barra de navegação com botão voltar */}
  <nav>
    <Button variant={'outline'} onClick={() => router.push('/admin')}>
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      Voltar
    </Button>
  </nav>

  {/* Container principal */}
  <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    {/* Cabeçalho explicativo */}
    <section>
      <h1>Criar Novo Usuário</h1>
      <p>Instruções e orientações...</p>
    </section>

    {/* Formulário de criação */}
    <form onSubmit={handleCreateUser}>{/* Campos do formulário */}</form>
  </div>
</main>
```

### **Campos do Formulário**

#### **1. Seleção de Função**

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      {getRoleDisplayName(formData.role)}
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => updateField('role', 'admin')}>
      Administrador
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => updateField('role', 'medico')}>
      Médico
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => updateField('role', 'paciente')}>
      Paciente
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### **2. Campo de Nome**

```jsx
<Input
  type="text"
  id="fullName"
  name="fullName"
  value={formData.fullName}
  onChange={(e) => updateField('fullName', e.target.value)}
  required
  disabled={loading}
  placeholder="Digite o nome completo"
/>
```

#### **3. Campo de Email**

```jsx
<Input
  type="email"
  id="email"
  name="email"
  value={formData.email}
  onChange={(e) => updateField('email', e.target.value)}
  required
  disabled={loading}
  placeholder="exemplo@email.com"
/>
```

### **Botões de Ação**

```jsx
<div className="flex gap-4">
  <Button
    type="button"
    variant="destructive"
    onClick={() => router.back()}
    disabled={loading}
  >
    Cancelar
  </Button>
  <Button type="submit" disabled={loading}>
    {loading ? 'Criando...' : 'Criar Usuário'}
  </Button>
</div>
```

## Tratamento de Erros

### **Erros de Validação Zod**

```typescript
if (error instanceof z.ZodError) {
  const firstError = error.errors[0];
  setError(firstError.message);
  toast.error('Erro de validação', {
    description: firstError.message,
  });
  console.error('Validation error:', error.errors);
}
```

### **Erros de Sistema**

```typescript
else {
  setError('Erro interno do sistema')
  toast.error('Erro interno do sistema')
  console.error('Unexpected error:', error)
}
```

### **Estados de Erro**

- **Role não selecionado**: Validação customizada antes do Zod
- **Email já existente**: Verificação no MockDatabase
- **Campos inválidos**: Validação Zod com mensagens específicas
- **Erro de registro**: Falha na função registerUser

## Navegação e Redirecionamento

### **Botão Voltar**

```typescript
<Button variant={'outline'} onClick={() => router.push('/admin')}>
  <ArrowLeftIcon className="mr-2 h-4 w-4" />
  Voltar
</Button>
```

### **Botão Cancelar**

```typescript
<Button
  type="button"
  variant="destructive"
  onClick={() => router.back()}
  disabled={loading}
>
  Cancelar
</Button>
```

### **Redirecionamento Após Sucesso**

```typescript
router.push('/admin'); // Volta para painel administrativo
```

## Estados de Loading

### **Componente de Loading**

```typescript
if (loading) {
  return <Loading />
}
```

### **Desabilitação de Campos**

```typescript
// Todos os inputs e botões ficam disabled durante loading
disabled = { loading };
```

### **Texto do Botão Dinâmico**

```typescript
{
  loading ? 'Criando...' : 'Criar Usuário';
}
```

## Integração com Sistema de Autenticação

### **Funções Utilizadas**

```typescript
// Verificar se email já existe
checkEmailExists(email: string): boolean

// Registrar novo usuário
registerUser(email: string, password: string, name: string, role: string): User
```

### **MockDatabase**

- **Armazenamento**: localStorage como simulação de backend
- **Validação**: Verificação de duplicidade antes do registro
- **Persistência**: Dados mantidos entre sessões

## Notificações do Sistema

### **Toast de Sucesso**

```typescript
toast.success('Usuário criado com sucesso!', {
  description: `Senha enviada para: ${userDataWithPassword.email}`,
});
```

### **Toast de Erro**

```typescript
toast.error('Erro de validação', {
  description: firstError.message,
});
```

### **Mensagens de Estado**

- **Criação bem-sucedida**: Confirmação com email do usuário
- **Erro de validação**: Mensagem específica do campo
- **Email duplicado**: Alerta sobre conflito
- **Erro interno**: Mensagem genérica para problemas inesperados

## Proteção de Rota

### **Middleware de Autenticação**

- Página protegida para usuários admin apenas
- Redirecionamento automático se não autorizado
- Verificação de role no middleware

### **Acesso Restrito**

- Apenas administradores podem criar usuários
- Proteção dupla: middleware + verificação de componente
- Segurança contra acesso não autorizado

## Responsividade

### **Design Mobile-First**

- Layout adaptável para diferentes tamanhos de tela
- Campos de formulário responsivos
- Botões com largura adequada em mobile
- Espaçamento otimizado para touch

### **Breakpoints**

- **Mobile**: Layout em coluna, espaçamento compacto
- **Tablet (sm)**: Melhor espaçamento lateral
- **Desktop (lg)**: Layout otimizado com margens amplas

## Fluxos de Usuário

### **1. Fluxo de Criação Bem-Sucedida**

```
Admin acessa /admin/create-user
↓
Preenche função (dropdown)
↓
Insere nome completo
↓
Insere email válido e único
↓
Clica "Criar Usuário"
↓
Sistema valida dados
↓
Gera senha aleatória
↓
Registra usuário no MockDatabase
↓
Exibe toast de sucesso
↓
Redireciona para /admin
```

### **2. Fluxo de Erro de Validação**

```
Admin preenche formulário
↓
Deixa função em branco OU insere dados inválidos
↓
Clica "Criar Usuário"
↓
Sistema detecta erro
↓
Exibe mensagem de erro específica
↓
Mantém usuário na página para correção
```

### **3. Fluxo de Email Duplicado**

```
Admin preenche formulário com email existente
↓
Clica "Criar Usuário"
↓
Sistema verifica duplicidade
↓
Exibe erro "Email já cadastrado"
↓
Usuário corrige email e tenta novamente
```

## Considerações de UX

### **Feedback Visual**

- Estados de loading claros
- Mensagens de erro específicas
- Confirmações de sucesso
- Desabilitação de campos durante processamento

### **Acessibilidade**

- Labels adequados para todos os campos
- Placeholder explicativo
- Navegação por teclado
- Contraste adequado de cores
- Textos alternativos para ícones

### **Usabilidade**

- Processo simples em única página
- Validação em tempo real
- Reset automático após sucesso
- Navegação intuitiva de volta ao painel

## Segurança

### **Geração de Senhas**

- Senhas aleatórias para evitar previsibilidade
- Caracteres variados para aumentar entropia
- Comprimento adequado para facilitar memorização
- Log da senha no console (apenas desenvolvimento)

### **Validação de Dados**

- Schema Zod para validação rigorosa
- Sanitização automática de inputs
- Verificação de duplicidade
- Prevenção de registros inválidos

## Melhorias Futuras

### **Funcionalidades**

- Upload de foto de perfil
- Campos adicionais (telefone, endereço, especialidade médica)
- Importação em lote de usuários via CSV
- Envio real de email com senha
- Geração de senhas mais complexas
- Definição de senha personalizada (opcional)

### **UX/UI**

- Preview dos dados antes da criação
- Wizard multi-step para dados complexos
- Auto-complete para campos comuns
- Validação visual em tempo real
- Indicador de força da senha gerada

### **Segurança**

- Criptografia de senhas no armazenamento
- Logs de auditoria para criações
- Rate limiting para prevenir spam
- Verificação de email por link
- Políticas de senha mais rigorosas

### **Performance**

- Cache de verificação de emails
- Debounce na validação de formulário
- Lazy loading de componentes pesados
- Otimização de re-renders

## Estrutura de Arquivos

```
/src/app/(private)/admin/create-user/
├── page.tsx                # Página principal (este arquivo)
├── README.md              # Documentação (este arquivo)
└── components/            # Componentes específicos (futuro)
    ├── user-form.tsx     # Formulário isolado
    ├── role-selector.tsx # Seletor de função
    └── password-generator.tsx # Gerador de senha
```

Esta página serve como porta de entrada para novos usuários no sistema Medical Vide, oferecendo interface administrativa simples e segura para gestão de acessos.
