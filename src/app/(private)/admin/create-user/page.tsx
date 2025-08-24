'use client';

// Importações dos componentes de UI do shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Ícones do Lucide React para navegação e interação
import { ArrowLeftIcon, ChevronDownIcon } from 'lucide-react';

// Next.js hooks para navegação
import { useRouter } from 'next/navigation';

// React hooks para estado e eventos
import React, { useState } from 'react';

// Zod para validação de formulário
import { z } from 'zod';

// Funções de autenticação e verificação de usuários
import { checkEmailExists, registerUser } from '@/lib/auth';

// Toast para notificações do usuário
import { toast } from 'sonner';

// Componente de loading
import Loading from '@/components/loading/loading';

// Schema de validação Zod para os dados do novo usuário
const registerSchema = z.object({
  fullName: z.string().min(1, 'insira o nome completo do usuário'),
  email: z.string().min(1, 'insira o email').email('insira um email válido'),
  role: z.enum(['admin', 'medico', 'paciente'], {
    message: 'selecione a função do usuário',
  }),
});

// Tipo TypeScript para os dados do formulário de registro
type RegisterFormData = {
  fullName: string;
  email: string;
  role: string; // Permite qualquer string para permitir validação customizada
};

// Função utilitária para gerar senha aleatória de 6 caracteres
const generateRandomPassword = (): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export default function CreateUserPage() {
  // Hook de navegação do Next.js
  const router = useRouter();

  // Estado para controle de mensagens de erro do formulário
  const [error, setError] = useState('');

  // Estado para controle de loading durante operações assíncronas
  const [loading, setLoading] = useState(false);

  // Estado para armazenar os dados do formulário de criação de usuário
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    role: '', // Começa vazio para forçar seleção
  });

  // Função utilitária para atualizar campos específicos do formulário
  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Função para converter roles técnicos em nomes amigáveis para exibição
  const getRoleDisplayName = (role: string) => {
    const roles = {
      admin: 'Administrador',
      medico: 'Médico',
      paciente: 'Paciente',
    };
    return roles[role as keyof typeof roles] || 'Selecione uma função';
  };

  // Função principal para processar a criação de novos usuários
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validação customizada para campo role obrigatório
      if (!formData.role || formData.role === '') {
        setError('Por favor, selecione uma função para o usuário');
        toast.error('Erro de validação', {
          description: 'Por favor, selecione uma função para o usuário',
        });
        return;
      }

      // Aplica validação Zod nos dados do formulário
      const validatedData = registerSchema.parse(formData);

      // Gera senha aleatória automaticamente para o novo usuário
      const password = generateRandomPassword();
      const userDataWithPassword = {
        ...validatedData,
        password,
      };

      // Verifica se o email já existe no sistema antes de criar
      if (checkEmailExists(userDataWithPassword.email)) {
        setError('Email já cadastrado');
        toast.error('Erro ao criar usuário', {
          description: 'Email já cadastrado',
        });
        return;
      }

      // Registra o novo usuário no sistema usando a função registerUser
      const newUser = registerUser(
        userDataWithPassword.email,
        userDataWithPassword.password,
        userDataWithPassword.fullName,
        userDataWithPassword.role
      );

      // Processa resultado da criação do usuário
      if (newUser) {
        console.log('Senha:', userDataWithPassword.password);

        // Reseta o formulário após criação bem-sucedida
        setFormData({
          fullName: '',
          email: '',
          role: '', // Reseta para vazio
        });

        // Exibe notificação de sucesso com informações da senha
        toast.success('Usuário criado com sucesso!', {
          description: `Senha enviada para: ${userDataWithPassword.email}`,
        });

        // Redireciona de volta para o painel administrativo
        router.push('/admin');
      } else {
        setError('Erro ao criar usuário');
        toast.error('Erro ao criar usuário');
      }
    } catch (error) {
      // Tratamento específico para erros de validação Zod
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        setError(firstError.message);
        toast.error('Erro de validação', {
          description: firstError.message,
        });
        console.error('Validation error:', error.errors);
      } else {
        setError('Erro interno do sistema');
        toast.error('Erro interno do sistema');
        console.error('Unexpected error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Renderiza componente de loading durante operações assíncronas
  if (loading) {
    return <Loading />;
  }

  return (
    <main className="bg-background min-h-screen">
      {/* Barra de navegação superior com botão de voltar */}
      <nav className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Button variant={'outline'} onClick={() => router.push('/admin')}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </nav>

      {/* Container principal da página */}
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 px-4 py-6 sm:px-0">
          {/* Seção do cabeçalho da página */}
          <section className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold md:text-4xl">
              Criar Novo Usuário
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
              Crie novos usuários para o sistema, definindo suas funções e
              permissões de acesso as senhas serão enviadas por email
              cadastrado. Certifique-se de que as informações estão corretas
              antes de criar o usuário.
            </p>
          </section>

          {/* Formulário de criação de usuário */}
          <form onSubmit={handleCreateUser} className="max-w-5xl space-y-6">
            {/* Campo de seleção de função/role do usuário */}
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="text-accent-foreground block text-sm font-medium"
              >
                Função*
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between text-left font-normal"
                    disabled={loading}
                  >
                    {getRoleDisplayName(formData.role)}
                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)]">
                  <DropdownMenuItem
                    onClick={() => updateField('role', 'admin')}
                  >
                    Administrador
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateField('role', 'medico')}
                  >
                    Médico
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateField('role', 'paciente')}
                  >
                    Paciente
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Campo de nome completo do usuário */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-accent-foreground block text-sm font-medium"
              >
                Nome Completo*
              </label>
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
            </div>

            {/* Campo de email do usuário */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-accent-foreground block text-sm font-medium"
              >
                Email*
              </label>
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
            </div>

            {/* Exibição de mensagens de erro */}
            {error && (
              <div className="text-center text-sm text-red-600">{error}</div>
            )}

            {/* Botões de ação do formulário */}
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
          </form>
        </div>
      </div>
    </main>
  );
}
