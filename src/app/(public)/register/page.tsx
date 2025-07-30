'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { checkEmailExists, registerUser } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import Loading from '@/components/loading/loading';

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
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = { name, email, password, confirmPassword };
      registerSchema.parse(formData);

      if (checkEmailExists(email)) {
        setError('Email já cadastrado');
        return;
      }

      const newUser = registerUser(email, password, name, 'paciente');

      if (newUser) {
        // Login automático após register
        login(newUser);
        router.push(`/dashboard/${newUser.role}`);
      } else {
        setError('Email já cadastrado');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError('Erro interno do sistema');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Criar conta
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Cadastre-se como paciente para acessar o sistema
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nome completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:opacity-50 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:opacity-50 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Digite seu email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:opacity-50 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Digite sua senha (mín. 6 caracteres)"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:opacity-50 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Confirme sua senha"
              />
            </div>
          </div>

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
