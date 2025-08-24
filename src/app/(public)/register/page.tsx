'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { checkEmailExists, registerUser, initializeUsers } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import Loading from '@/components/loading/loading';

// Schema de validação do formulário de registro usando Zod
const registerSchema = z
  .object({
    name: z.string().min(1, 'Por favor, insira seu nome'),
    email: z
      .string()
      .min(1, 'Por favor, insira seu email')
      .email('Por favor, insira um email válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Por favor, confirme sua senha'),
  })
  // Validação customizada para confirmar se as senhas coincidem
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  // Estados dos campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados de controle da interface
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  // Inicializa usuários mock no localStorage quando o componente é montado
  useEffect(() => {
    initializeUsers(); // Ensure mock data is initialized
  }, []);

  // Função que processa o envio do formulário de registro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = { name, email, password, confirmPassword };
      // Valida todos os campos usando o schema Zod
      registerSchema.parse(formData);

      console.log('Attempting to register with email:', email);
      console.log('Email exists check:', checkEmailExists(email));

      // Tenta criar um novo usuário com role 'paciente'
      const newUser = registerUser(email, password, name, 'paciente');
      console.log('Register result:', newUser);

      if (newUser) {
        // Login automático após registro bem-sucedido
        login(newUser);
        router.push(`/${newUser.role}`); // Redireciona para a página do role do usuário
      } else {
        console.log('Setting error: Email já cadastrado');
        setError('Email já cadastrado');
        return;
      }
    } catch (error) {
      // Tratamento de erros de validação Zod
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError('Erro interno do sistema');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para voltar à página de login
  const handleBackToLogin = () => {
    router.push('/');
  };

  // Mostra componente de loading enquanto processa o registro
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-foreground mt-6 text-3xl font-extrabold">
            Criar conta
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Cadastre-se como paciente para acessar o sistema
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Campo de nome completo */}
            <div>
              <label
                htmlFor="name"
                className="text-foreground block text-sm font-medium"
              >
                Nome completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(''); // Clear error when user starts typing
                }}
                disabled={loading}
                className="border-input bg-background text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none disabled:opacity-50 sm:text-sm"
                placeholder="Digite seu nome completo"
              />
            </div>

            {/* Campo de email com validação */}
            <div>
              <label
                htmlFor="email"
                className="text-foreground block text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(''); // Clear error when user starts typing
                }}
                disabled={loading}
                className="border-input bg-background text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none disabled:opacity-50 sm:text-sm"
                placeholder="Digite seu email"
              />
            </div>

            {/* Campo de senha com requisitos mínimos */}
            <div>
              <label
                htmlFor="password"
                className="text-foreground block text-sm font-medium"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="border-input bg-background text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none disabled:opacity-50 sm:text-sm"
                placeholder="Digite sua senha (mín. 6 caracteres)"
              />
            </div>

            {/* Campo de confirmação de senha */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-foreground block text-sm font-medium"
              >
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="border-input bg-background text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none disabled:opacity-50 sm:text-sm"
                placeholder="Confirme sua senha"
              />
            </div>
          </div>

          {/* Exibição de mensagens de erro */}
          {error && (
            <div
              className="bg-destructive/10 border-destructive/20 rounded-md border p-4"
              data-testid="error-message"
            >
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-destructive text-sm font-medium">
                    {error}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Botões de ação: Voltar e Cadastrar */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBackToLogin}
              className="flex-1"
              disabled={loading}
            >
              Voltar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
